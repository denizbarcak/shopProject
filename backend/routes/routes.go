package routes

import (
	"shopProject-backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Post("/register", controllers.Register)
}
