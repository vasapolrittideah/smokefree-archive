package models

import (
	"github.com/google/uuid"
	"time"
)

type Smoker struct {
	ID            uuid.UUID      `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	FirstName     string         `json:"first_name" gorm:"type:varchar(50);not null"`
	LastName      string         `json:"last_name" gorm:"type:varchar(50);not null"`
	CompanyName   string         `json:"company_name" gorm:"type:varchar(100);not null"`
	PhoneNumber   string         `json:"phone_number" gorm:"type:varchar(11);not null"`
	DateOfBirth   time.Time      `json:"date_of_birth"`
	Age           int            `json:"age" gorm:"not null"`
	Gender        string         `json:"gender" gorm:"type:varchar(15);not null"`
	CreatedAt     time.Time      `json:"created_at" gorm:"autoCreateTime:milli;not null"`
	UpdatedAt     time.Time      `json:"updated_at" gorm:"autoUpdateTime:milli;not null"`
	SmokingRecord *SmokingRecord `json:"smoking_record,omitempty" gorm:"foreignKey:SmokerID"`
	AccountID     uuid.UUID      `json:"account_id"`
}

type SmokingRecord struct {
	ID                uuid.UUID          `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	StartingAge       int                `json:"starting_age" gorm:"not null"`
	CigaretteType     string             `json:"cigarette_type" gorm:"varchar(50);not null"`
	SmokingDuration   int                `json:"smoking_duration" gorm:"not null"`
	SmokingFrequency  string             `json:"smoking_frequency" gorm:"varchar(50);not null"`
	DurationSinceQuit int                `json:"duration_since_quit" gorm:"check:smoking_frequency <> 'quit'"`
	CigarettePerDay   int                `json:"cigarette_per_day" gorm:"check:smoking_frequency <> 'daily'"`
	CreatedAt         time.Time          `json:"created_at" gorm:"autoCreateTime:milli;not null"`
	UpdatedAt         time.Time          `json:"updated_at" gorm:"autoUpdateTime:milli;not null"`
	FamilySmokers     []FamilySmoker     `json:"family_smokers" gorm:"many2many:smoking_record_family_smokers"`
	ChronicConditions []ChronicCondition `json:"chronic_conditions" gorm:"many2many:smoking_record_chronic_conditions"`
	SmokerID          uuid.UUID          `json:"smoker_id"`
}

type FamilySmoker struct {
	ID                 uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	FirstName          string    `json:"first_name" gorm:"type:varchar(50)"`
	LastName           string    `json:"last_name" gorm:"type:varchar(50)"`
	FamilyRelationship string    `json:"family_relationship" gorm:"type:varchar(15);not null"`
}

type ChronicCondition struct {
	ID   uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name string    `json:"name" gorm:"type:varchar(50);not null"`
}
