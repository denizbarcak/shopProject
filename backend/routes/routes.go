package routes

import (
	"shopProject-backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	// Register endpoint
	app.Post("/api/register", controllers.Register)

	// Login endpoint
	app.Post("/api/login", controllers.Login)
}
