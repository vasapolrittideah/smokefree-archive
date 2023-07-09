package usecase

import (
	"github.com/bxcodec/faker/v4"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/repository"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/requests"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
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

func TestAuthUseCase_SignUp(t *testing.T) {
	asserts := assert.New(t)

	accountRepo := repository.NewMockAccountRepository(t)

	conf, err := config.New()
	asserts.NoError(err)

	mockUseCase := NewAuthUsecase(accountRepo, conf)

	fakeEmail := faker.Email()
	fakePassword := faker.Password()

	account := models.Account{
		ID:        uuid.New(),
		Email:     fakeEmail,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	accountRepo.EXPECT().CreateAccount(mock.AnythingOfType("Account")).Return(account, nil)

	t.Run("Success", func(t *testing.T) {
		signUpRequestBody := requests.SignUpRequestBody{
			Email:           fakeEmail,
			PasswordConfirm: fakePassword,
			Password:        fakePassword,
		}

		res, err := mockUseCase.SignUp(signUpRequestBody)
		asserts.NoError(err)
		asserts.Equal(&account, res)
	})

	t.Run("PasswordsNotMatch", func(t *testing.T) {
		signUpRequestBody := requests.SignUpRequestBody{
			Email:           fakeEmail,
			Password:        fakePassword,
			PasswordConfirm: "NotMatch",
		}

		_, err := mockUseCase.SignUp(signUpRequestBody)
		asserts.Error(err)
	})
}

//func TestAuthUseCase_SignIn(t *testing.T) {
//	asserts := assert.New(t)
//
//}

//func TestAuthFlow(t *testing.T) {
//	accountRepo := repository.NewMockAccountRepository(t)
//
//	conf, err := config.New()
//	if err != nil {
//		log.Fatalln(err)
//	}
//
//	mockUseCase := NewAuthUsecase(accountRepo, conf)
//
//	fakeEmail := faker.Email()
//	fakePassword := faker.Password()
//
//	account := models.Account{
//		ID:        uuid.New(),
//		Email:     fakeEmail,
//		CreatedAt: time.Now().UTC(),
//		UpdatedAt: time.Now().UTC(),
//	}
//
//	signUpRequestBody := requests.SignUpRequestBody{
//		Email:           fakeEmail,
//		Password:        fakePassword,
//		PasswordConfirm: fakePassword,
//	}
//
//	accountRepo.EXPECT().CreateAccount(mock.AnythingOfType("Account")).Return(account, nil).
//		Run(func(_account models.Account) {
//			account.Password = _account.Password
//		})
//	_, err = mockUseCase.SignUp(signUpRequestBody)
//	assert.NoError(t, err)
//
//	signInRequestBody := requests.SignInRequestBody{
//		Email:    fakeEmail,
//		Password: fakePassword,
//	}
//
//	accountRepo.EXPECT().GetByEmail(mock.AnythingOfType("string")).Return(account, nil)
//	_, err = mockUseCase.SignIn(signInRequestBody)
//	assert.NoError(t, err)
//}
