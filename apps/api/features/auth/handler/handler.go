package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/requests"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/usecase"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/errors"
)

type AuthHandler struct {
	usecase usecase.AuthUseCase
	conf    *config.Config
}

func NewAuthHandler(usecase usecase.AuthUseCase, conf *config.Config) AuthHandler {
	return AuthHandler{usecase, conf}
}

func (h AuthHandler) SignUp(c *fiber.Ctx) error {
	payload := new(requests.SignUpRequestBody)
	if err := c.BodyParser(payload); err != nil {
		_err := errors.ErrBadRequest("The requests is in a invalid format")
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	if errs := errors.ValidateInput(payload, h.conf.Validator, h.conf.ValidationTranslator); len(errs) != 0 {
		_err := errors.ErrInvalidInput(errs)
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	account, err := h.usecase.SignUp(*payload)
	if err != nil {
		_err := errors.ErrInternalServer(err.Error())
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	return c.Status(fiber.StatusCreated).JSON(account)
}

func (h AuthHandler) SignIn(c *fiber.Ctx) error {
	payload := new(requests.SignInRequestBody)
	if err := c.BodyParser(payload); err != nil {
		_err := errors.ErrBadRequest("The requests is in a invalid format")
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	if errs := errors.ValidateInput(payload, h.conf.Validator, h.conf.ValidationTranslator); len(errs) != 0 {
		_err := errors.ErrInvalidInput(errs)
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	token, err := h.usecase.SignIn(*payload)
	if err != nil {
		_err := errors.ErrInternalServer(err.Error())
		return c.Status(_err.StatusCode()).JSON(_err)
	}

	return c.Status(fiber.StatusOK).JSON(token)
}
