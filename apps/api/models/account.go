package models

import (
	"github.com/google/uuid"
	"time"
)

type Account struct {
	ID        uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Email     string    `json:"email" gorm:"uniqueIndex;not null"`
	Password  string    `json:"-" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime:milli;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime:milli;not null"`
	Smoker    *Smoker   `json:"smoker,omitempty" gorm:"foreignKey:AccountID"`
}
