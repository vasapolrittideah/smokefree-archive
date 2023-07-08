package testcontainer

import (
	"context"
	"fmt"
	"github.com/docker/go-connections/nat"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
	"time"
)

type (
	PostgreSQLContainerConfig struct {
		ImageTag   string
		User       string
		Password   string
		MappedPort string
		Database   string
		Host       string
	}

	PostgreSQLContainer struct {
		testcontainers.Container
		Config PostgreSQLContainerConfig
	}

	PostgreSQLContainerOption func(c *PostgreSQLContainerConfig)
)

func (c PostgreSQLContainer) GetDSN() string {
	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok",
		c.Config.Host,
		c.Config.User,
		c.Config.Password,
		c.Config.Database,
		c.Config.MappedPort,
	)
}

func NewPostgreSQLContainer(ctx context.Context, options ...PostgreSQLContainerOption) (*PostgreSQLContainer, error) {
	const (
		PostgresImage = "postgres"
		PostgresPort  = "5432"
	)

	config := PostgreSQLContainerConfig{
		ImageTag:   "latest",
		User:       "postgres",
		Password:   "password",
		MappedPort: PostgresPort,
		Database:   "db_test",
	}
	for _, option := range options {
		option(&config)
	}

	containerPort := PostgresPort + "/tcp"

	req := testcontainers.GenericContainerRequest{
		ContainerRequest: testcontainers.ContainerRequest{
			Env: map[string]string{
				"POSTGRES_USER":     config.User,
				"POSTGRES_PASSWORD": config.Password,
				"POSTGRES_DB":       config.Database,
			},
			ExposedPorts: []string{containerPort},
			Image:        fmt.Sprintf("%s:%s", PostgresImage, config.ImageTag),
			WaitingFor: wait.ForExec([]string{"pg_isready", "-d", config.Database, "-U", config.User}).
				WithPollInterval(1 * time.Second).
				WithExitCodeMatcher(func(exitCode int) bool {
					return exitCode == 0
				}),
		},
		Started: true,
	}

	container, err := testcontainers.GenericContainer(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("getting request provider: %w", err)
	}

	host, err := container.Host(ctx)
	if err != nil {
		return nil, fmt.Errorf("getting host for: %w", err)
	}

	mappedPort, err := container.MappedPort(ctx, nat.Port(containerPort))
	if err != nil {
		return nil, fmt.Errorf("getting mapped port for (%s): %w", containerPort, err)
	}
	config.MappedPort = mappedPort.Port()
	config.Host = host

	fmt.Println("Host:", config.Host, config.MappedPort)

	return &PostgreSQLContainer{
		Container: container,
		Config:    config,
	}, nil
}
