package controllers

import (
	"context"
	"net/http"
	"shopProject-backend/configs"
	"shopProject-backend/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := configs.GetCollection("users")
	var user models.User

	// JSON verisini parse et
	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	// Kullanıcı kontrolü
	count, _ := collection.CountDocuments(ctx, bson.M{
		"$or": []bson.M{
			{"username": user.Username},
			{"email": user.Email},
		},
	})
	if count > 0 {
		return c.Status(http.StatusConflict).JSON(fiber.Map{"error": "Username or email already exists"})
	}

	// Şifreyi hashle
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
	}
	user.Password = string(hashedPassword)

	// Kullanıcıyı ekle
	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{"message": "User created successfully"})
}
func Login(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var input struct {
		UsernameOrEmail string `json:"usernameOrEmail" validate:"required"`
		Password        string `json:"password" validate:"required"`
	}

	// JSON verisini parse et
	if err := c.BodyParser(&input); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	// Kullanıcı verilerini doğrula
	if input.UsernameOrEmail == "" || input.Password == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Username/Email and Password are required"})
	}

	// Kullanıcıyı bul
	collection := configs.GetCollection("users")
	var user models.User
	filter := bson.M{
		"$or": []bson.M{
			{"username": input.UsernameOrEmail},
			{"email": input.UsernameOrEmail},
		},
	}
	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid username or email"})
	}

	// Şifre doğrulama
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid password"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Login successful"})
}

