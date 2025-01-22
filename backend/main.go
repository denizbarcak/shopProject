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
		AllowOrigins: "http://localhost:5173", // Frontend'in çalıştığı adres
		AllowMethods: "GET,POST,PUT,DELETE",  // İzin verilen HTTP yöntemleri
		AllowHeaders: "Content-Type",         // İzin verilen HTTP başlıkları
	}))

	// Rotaları ekle
	routes.UserRoutes(app)

	// Sunucuyu başlat
	app.Listen(":3000")
}
