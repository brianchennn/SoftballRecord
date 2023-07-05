package main

import (
	"softball_record/config"
	"softball_record/db"
	"softball_record/routes"
)

func main() {
	config.Init("production")
	db.Init()
	router := routes.InitRouter()
	router.Run(":8080")
}
