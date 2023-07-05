package repository

import (
	"github.com/vasapolrittideah/smokefree/apps/api/models"
	"gorm.io/gorm"
)

type AccountRepository interface {
	CreateAccount(account models.Account) (models.Account, error)
	GetByEmail(email string) (account models.Account, err error)
}

type accountRepository struct {
	DB *gorm.DB
}

func NewAccountRepository(db *gorm.DB) AccountRepository {
	return accountRepository{db}
}

func (r accountRepository) CreateAccount(account models.Account) (models.Account, error) {
	return account, r.DB.Create(&account).Error
}

func (r accountRepository) GetByEmail(email string) (account models.Account, err error) {
	return account, r.DB.First(&account, "email=?", email).Error
}
