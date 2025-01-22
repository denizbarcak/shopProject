package main

import (
	"shopProject-backend/configs"
	"shopProject-backend/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	configs.ConnectDB()

	app := fiber.New()

	routes.UserRoutes(app)

	app.Listen(":3000")
}
