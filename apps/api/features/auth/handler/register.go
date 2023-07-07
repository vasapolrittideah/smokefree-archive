package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vasapolrittideah/smokefree/apps/api/features/auth/usecase"
	"github.com/vasapolrittideah/smokefree/apps/api/internal/config"
)

func RegisterHandlers(r fiber.Router, conf *config.Config, service usecase.AuthUseCase) {
	authHandler := NewAuthHandler(service, conf)
	router := r.Group("/auth")

	router.Post("/signup", authHandler.SignUp)
	router.Post("/signin", authHandler.SignIn)
}
