package config

import (
	"fmt"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/errors"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/utils"
	"github.com/vasapolrittideah/smokefree/apps/api/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"time"
)

type Constants struct {
	DBHost                string        `mapstructure:"POSTGRES_HOST"`
	DBPort                string        `mapstructure:"POSTGRES_PORT"`
	DBUserName            string        `mapstructure:"POSTGRES_USER"`
	DBUserPassword        string        `mapstructure:"POSTGRES_PASSWORD"`
	DBName                string        `mapstructure:"POSTGRES_DB"`
	ServerPort            string        `mapstructure:"SERVER_PORT"`
	ServerHost            string        `mapstructure:"SERVER_HOST"`
	AccessTokenPrivateKey string        `mapstructure:"ACCESS_TOKEN_PRIVATE_KEY"`
	AccessTokenPublicKey  string        `mapstructure:"ACCESS_TOKEN_PUBLIC_KEY"`
	AccessTokenExpiresIn  time.Duration `mapstructure:"ACCESS_TOKEN_EXPIRED_IN"`
	AccessTokenMaxAge     int           `mapstructure:"ACCESS_TOKEN_MAXAGE"`
	ValidationTranslator  ut.Translator
	Validator             *validator.Validate
}

type Config struct {
	Constants
	*gorm.DB
}

func New() (config *Config, err error) {
	constants, err := LoadEnvironmentVariables()
	if err != nil {
		return nil, err
	}

	config = new(Config)
	config.Constants = *constants

	if os.Getenv("ENVIRONMENT") != "test" {
		db, err := connectDatabase(constants)
		if err != nil {
			return nil, err
		}

		fmt.Println("🎉 Connected successfully to the database")

		config.DB = db
		if err := MigrateDatabase(config); err != nil {
			return nil, err
		}
	}

	return
}

func LoadEnvironmentVariables() (constants *Constants, err error) {
	rootDir, _ := utils.FindProjectRoot()

	viper.AddConfigPath(rootDir)
	viper.AddConfigPath(".")
	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	validate := validator.New()

	viper.SetDefault("ServerPort", "8080")
	viper.Set("ValidationTranslator", errors.RegisterErrorTranslator(validate))
	viper.Set("Validator", validate)

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	if err := viper.Unmarshal(&constants); err != nil {
		return nil, err
	}

	return
}

func connectDatabase(constants *Constants) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok",
		constants.DBHost,
		constants.DBUserName,
		constants.DBUserPassword,
		constants.DBName,
		constants.DBPort,
	)

	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}

func MigrateDatabase(config *Config) error {
	config.DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
	return config.DB.AutoMigrate(
		&models.Account{},
		&models.Smoker{},
		&models.SmokingRecord{},
		&models.FamilySmoker{},
		&models.ChronicCondition{},
	)
}
