package utils

import (
	"fmt"
	"os"
	"path/filepath"
)

func FindProjectRoot(currentDir string) (string, error) {
	for currentDir != "/" {
		if _, err := os.Stat(filepath.Join(currentDir, "go.mod")); err == nil {
			return currentDir, nil
		}
		currentDir = filepath.Dir(currentDir)
	}

	return "", fmt.Errorf("project root not found")
}
