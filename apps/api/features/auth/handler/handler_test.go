package handler

import (
	"github.com/bxcodec/faker/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/requests"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/usecase"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/errors"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/test"
	"github.com/vasapolrittideah/smokefree/apps/api/models"
	"log"
	"os"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	if err := os.Setenv("ENVIRONMENT", "test"); err != nil {
		log.Fatalln(err)
	}

	exitCode := m.Run()

	os.Exit(exitCode)
}

func TestAuthHandler_SignUp(t *testing.T) {
	app := fiber.New()
	mockUseCase := usecase.NewMockAuthUsecase(t)

	conf, err := config.New()
	if err != nil {
		log.Fatalln(err)
	}

	RegisterHandlers(app, conf, mockUseCase)

	fakeEmail := faker.Email()
	fakePassword := faker.Password()

	account := models.Account{
		ID:        uuid.New(),
		Email:     fakeEmail,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	mockUseCase.EXPECT().SignUp(mock.AnythingOfType("SignUpRequestBody")).Return(&account, nil)

	testCases := []test.HandlerTestCase{
		{
			Name:         "should return expected data",
			Method:       "POST",
			URL:          "/auth/signup",
			WantStatus:   fiber.StatusCreated,
			WantResponse: account,
			Body: requests.SignUpRequestBody{
				Email:           fakeEmail,
				Password:        fakePassword,
				PasswordConfirm: fakePassword,
			},
		},
		{
			Name:         "should return bad request when the body is invalid",
			Method:       "POST",
			URL:          "/auth/signup",
			WantStatus:   fiber.StatusBadRequest,
			WantResponse: nil,
			Body: requests.SignUpRequestBody{
				Email:    "InvalidEmail",
				Password: fakePassword,
				// missing PasswordConfirm
			},
		},
		{
			Name:       "should return bad request when the body is failed validation",
			Method:     "POST",
			URL:        "/auth/signup",
			WantStatus: fiber.StatusBadRequest,
			WantResponse: errors.ErrInvalidInput([]errors.InvalidField{
				{Field: "email", Error: "email must be a valid email address"},
			}),
			Body: requests.SignUpRequestBody{
				Email:           "InvalidEmail",
				Password:        fakePassword,
				PasswordConfirm: fakePassword,
			},
		},
	}

	for _, tc := range testCases {
		test.HTTPEndpoint(t, app, tc)
	}
}

func TestAuthHandler_SignIn(t *testing.T) {
	app := fiber.New()
	mockUseCase := usecase.NewMockAuthUsecase(t)

	conf, err := config.New()
	if err != nil {
		log.Fatalln(err)
	}

	RegisterHandlers(app, conf, mockUseCase)

	fakeEmail := faker.Email()
	fakePassword := faker.Password()
	fakeJwt := faker.Jwt()

	token := usecase.Token{
		AccessToken: fakeJwt,
	}

	mockUseCase.EXPECT().SignIn(mock.AnythingOfType("SignInRequestBody")).Return(&token, nil)

	testCases := []test.HandlerTestCase{
		{
			Name:         "should return expected data",
			Method:       "POST",
			URL:          "/auth/signin",
			WantStatus:   fiber.StatusOK,
			WantResponse: token,
			Body: requests.SignInRequestBody{
				Email:    fakeEmail,
				Password: fakePassword,
			},
		},
		{
			Name:         "should return bad request when the body is invalid",
			Method:       "POST",
			URL:          "/auth/signin",
			WantStatus:   fiber.StatusBadRequest,
			WantResponse: nil,
			Body: requests.SignInRequestBody{
				Email: fakeEmail,
				// missing Password
			},
		},
		{
			Name:       "should return bad request when the body is failed validation",
			Method:     "POST",
			URL:        "/auth/signin",
			WantStatus: fiber.StatusBadRequest,
			WantResponse: errors.ErrInvalidInput([]errors.InvalidField{
				{Field: "email", Error: "email must be a valid email address"},
			}),
			Body: requests.SignUpRequestBody{
				Email:    "InvalidEmail",
				Password: fakePassword,
			},
		},
	}

	for _, tc := range testCases {
		test.HTTPEndpoint(t, app, tc)
	}
}
