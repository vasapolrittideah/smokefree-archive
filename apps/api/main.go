package main

import (
    "github.com/vasapolrittideah/smokefree/apps/api/server"
)

const VERSION = "1.0.0"

func main() {
    server.NewServer(VERSION).Run()
}
