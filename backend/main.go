package main

import (
	"shopProject-backend/configs"
	"shopProject-backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// MongoDB bağlantısını başlat
	configs.ConnectDB()

	// Fiber uygulaması oluştur
	app := fiber.New()

	// CORS middleware ekle
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Content-Type",
	}))

	// Rotaları ekle
	routes.UserRoutes(app)

	// Sunucuyu başlat
	app.Listen(":3000")
}
