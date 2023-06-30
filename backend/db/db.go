package db

import (
        "go.mongodb.org/mongo-driver/mongo"
        "go.mongodb.org/mongo-driver/mongo/options"
        "softball_record/config"
        "fmt"
        "context"
)

var client *mongo.Client

func Init() {
    config := config.GetConfig()
    fmt.Println("Connecting to DB: ", config.GetString("db.host"))
    serverAPI := options.ServerAPI(options.ServerAPIVersion1)
    opts := options.Client().ApplyURI(config.GetString("db.host")).SetServerAPIOptions(serverAPI)
    var err error
    client, err = mongo.Connect(context.TODO(), opts)
    if err != nil {
        panic(err)
    }
    fmt.Println("Connected to DB")
}

func GetClient() *mongo.Client {
    return client
}

