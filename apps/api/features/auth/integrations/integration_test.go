package integrations

import (
	"bytes"
	"encoding/json"
	"github.com/bxcodec/faker/v4"
	"github.com/go-testfixtures/testfixtures/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/suite"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/requests"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/usecase"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/testcontainer"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/utils"
	"github.com/vasapolrittideah/smokefree/apps/api/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"io"
	"log"
	"os"
	"testing"
)

type AuthTestSuite struct {
	testcontainer.TestSuite
}

func TestMain(m *testing.M) {
	if err := os.Setenv("ENVIRONMENT", "test"); err != nil {
		log.Fatalln(err)
	}

	exitCode := m.Run()

	os.Exit(exitCode)
}

func TestSuite_Run(t *testing.T) {
	suite.Run(t, new(AuthTestSuite))
}

func (s *AuthTestSuite) TestIntegration_SignUp() {
	fakeEmail := faker.Email()
	fakePassword := faker.Password()

	signUpRequestBody := requests.SignUpRequestBody{
		Email:           fakeEmail,
		Password:        fakePassword,
		PasswordConfirm: fakePassword,
	}

	body, err := json.Marshal(signUpRequestBody)
	s.Require().NoError(err)

	res, err := s.Server.Client().Post(s.Server.URL+"/api/v1/auth/signup", "application/json", bytes.NewBuffer(body))
	s.Require().NoError(err)

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		s.Require().NoError(err)
	}(res.Body)

	response := models.Account{}
	err = json.NewDecoder(res.Body).Decode(&response)
	s.Require().NoError(err)

	s.Require().Equal(fiber.StatusCreated, res.StatusCode)
	s.Assert().Equal(fakeEmail, response.Email)
	s.Assert().Equal("", response.Password)
}

func (s *AuthTestSuite) TestIntegration_SignIn() {
	db, err := gorm.Open(postgres.Open(s.PostgreSQLContainer.GetDSN()), &gorm.Config{})
	s.Require().NoError(err)

	rootDir, err := utils.FindProjectRoot()
	s.Require().NoError(err)

	sqlDB, err := db.DB()
	s.Require().NoError(err)

	fixtures, err := testfixtures.New(
		testfixtures.Database(sqlDB),
		testfixtures.Dialect("postgres"),
		testfixtures.Directory(rootDir+"/apps/api/testdata"),
	)
	s.Require().NoError(err)
	s.Require().NoError(fixtures.Load())

	signInRequestBody := requests.SignInRequestBody{
		Email:    "test@example.com",
		Password: "testP@ssword",
	}

	body, err := json.Marshal(signInRequestBody)
	s.Require().NoError(err)

	res, err := s.Server.Client().Post(s.Server.URL+"/api/v1/auth/signin", "application/json", bytes.NewBuffer(body))
	s.Require().NoError(err)

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		s.Require().NoError(err)
	}(res.Body)

	response := usecase.Token{}
	err = json.NewDecoder(res.Body).Decode(&response)
	s.Require().NoError(err)

	s.Require().Equal(fiber.StatusOK, res.StatusCode)
	s.Require().NotNil(response.AccessToken)
}
