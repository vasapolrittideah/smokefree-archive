package utils

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func FindProjectRoot() (string, error) {
	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	for currentDir != "/" {
		if _, err := os.Stat(filepath.Join(currentDir, "go.mod")); err == nil {
			return currentDir, nil
		}
		currentDir = filepath.Dir(currentDir)
	}

	return "", fmt.Errorf("project root not found")
}
