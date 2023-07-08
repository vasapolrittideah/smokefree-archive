package testcontainer

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/stretchr/testify/suite"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/handler"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/repository"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/usecase"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http/httptest"
	"time"
)

type TestSuite struct {
	suite.Suite
	PostgreSQLContainer *PostgreSQLContainer
	Server              *httptest.Server
}

func (s *TestSuite) SetupSuite() {
	ctx, ctxCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer ctxCancel()

	postgreSQLContainer, err := NewPostgreSQLContainer(ctx)
	s.Require().NoError(err)

	s.PostgreSQLContainer = postgreSQLContainer

	constants, err := config.LoadEnvironmentVariables()
	s.Require().NoError(err)

	conf := new(config.Config)
	conf.Constants = *constants

	db, err := gorm.Open(postgres.Open(postgreSQLContainer.GetDSN()), &gorm.Config{})
	s.Require().NoError(err)

	conf.DB = db
	err = config.MigrateDatabase(conf)
	s.Require().NoError(err)

	app := fiber.New()
	router := app.Group("/api/v1")

	authService := usecase.NewAuthUsecase(repository.NewAccountRepository(conf.DB), conf)
	handler.RegisterHandlers(router, conf, authService)

	s.Server = httptest.NewServer(adaptor.FiberApp(app))
}

func (s *TestSuite) TearDownSuite() {
	ctx, ctxCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer ctxCancel()

	s.Require().NoError(s.PostgreSQLContainer.Terminate(ctx))

	s.Server.Close()
}
