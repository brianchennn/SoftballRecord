package main

import (
    "softball_record/routes"
)

func main() {
    router := routes.InitRouter()
    router.Run(":8080")
}
