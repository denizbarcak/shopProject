package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `bson:"username" validate:"required"`
	Email    string             `bson:"email" validate:"required,email"`
	Password string             `bson:"password" validate:"required"`
	Admin    bool               `bson:"admin"`
}
