package main

import (
    "softball_record/routes"
    "softball_record/config"
    "softball_record/db"
)

func main() {
    config.Init()
    db.Init()
    router := routes.InitRouter()
    router.Run(":8080")
}
