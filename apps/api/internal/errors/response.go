package errors

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
	"github.com/gofiber/fiber/v2"
	"reflect"
	"strings"
)

type ErrorResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Details interface{} `json:"details,omitempty"`
}

func (e ErrorResponse) Error() string {
	return e.Message
}

func (e ErrorResponse) StatusCode() int {
	return e.Status
}

func ErrInternalServer(msg string) ErrorResponse {
	return ErrorResponse{
		Status:  fiber.StatusInternalServerError,
		Message: msg,
	}
}

func ErrBadRequest(msg string) ErrorResponse {
	return ErrorResponse{
		Status:  fiber.StatusBadRequest,
		Message: msg,
	}
}

func ErrUnauthorized(msg string) ErrorResponse {
	return ErrorResponse{
		Status:  fiber.StatusUnauthorized,
		Message: msg,
	}
}

type InvalidField struct {
	Field string `json:"field"`
	Error string `json:"error"`
}

func ErrInvalidInput(errs []InvalidField) ErrorResponse {
	return ErrorResponse{
		Status:  fiber.StatusBadRequest,
		Message: "the request body is failed validation",
		Details: errs,
	}
}

func ValidateInput(input interface{}, v *validator.Validate, trans ut.Translator) (errs []InvalidField) {
	if err := v.Struct(input); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errs = translateError(validationErrors, trans)
		}
	}

	return
}

func translateError(validationErrors validator.ValidationErrors, trans ut.Translator) (errs []InvalidField) {
	var invalidField InvalidField
	for _, err := range validationErrors {
		invalidField = InvalidField{
			Field: err.Field(),
			Error: err.Translate(trans),
		}
		errs = append(errs, invalidField)
	}

	return
}

func RegisterErrorTranslator(v *validator.Validate) ut.Translator {
	english := en.New()
	universalTranslator := ut.New(english, english)
	trans, _ := universalTranslator.GetTranslator("en")
	_ = enTranslations.RegisterDefaultTranslations(v, trans)

	v.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}

		return name
	})

	return trans
}
