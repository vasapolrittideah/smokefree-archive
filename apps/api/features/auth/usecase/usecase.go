package usecase

import (
	"errors"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/repository"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/requests"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/utils"
	"github.com/vasapolrittideah/smokefree/apps/api/models"
)

//go:generate mockery --name AuthUseCase --filename usecase_mock.go
type AuthUseCase interface {
	SignUp(payload requests.SignUpRequestBody) (*models.Account, error)
	SignIn(payload requests.SignInRequestBody) (*Token, error)
}

type authUseCase struct {
	accountRepo repository.AccountRepository
	conf        *config.Config
}

type Token struct {
	AccessToken string `json:"access_token"`
}

func NewAuthUsecase(repo repository.AccountRepository, conf *config.Config) AuthUseCase {
	return authUseCase{repo, conf}
}

func (u authUseCase) SignUp(payload requests.SignUpRequestBody) (*models.Account, error) {
	if payload.Password != payload.PasswordConfirm {
		return nil, errors.New("passwords are not match")
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		return nil, errors.New("unable to hash the given password")
	}

	newAccount := models.Account{
		Email:    payload.Email,
		Password: hashedPassword,
	}

	account, err := u.accountRepo.CreateAccount(newAccount)
	if err != nil {
		var duplicateEntryError = &pgconn.PgError{Code: "23505"}
		if errors.As(err, &duplicateEntryError) {
			return nil, errors.New("email does already exist")
		}

		return nil, errors.New("unable to create a new account")
	}

	return &account, nil
}

func (u authUseCase) SignIn(payload requests.SignInRequestBody) (*Token, error) {
	account, err := u.accountRepo.GetByEmail(payload.Email)
	if err != nil {
		return nil, errors.New("email does not exist")
	}

	if ok, err := utils.VerifyPassword(account.Password, payload.Password); err != nil || !ok {
		return nil, errors.New("password is not correct")
	}

	accessToken, err := utils.GenerateToken(
		u.conf.AccessTokenExpiresIn,
		u.conf.AccessTokenPrivateKey,
		account.ID,
	)
	if err != nil {
		return nil, errors.New("failed to generate jwt token: " + err.Error())
	}

	token := Token{AccessToken: accessToken}

	return &token, nil
}
