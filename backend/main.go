package main

import (
	"shopProject-backend/configs"
	"shopProject-backend/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// MongoDB bağlantısını başlat
	configs.ConnectDB()

	// Fiber uygulaması oluştur
	app := fiber.New()

	// Rotaları ekle
	routes.UserRoutes(app)

	// Sunucuyu başlat
	app.Listen(":3000")
}
