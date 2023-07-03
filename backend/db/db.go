package db

import (
	"context"
	//"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"softball_record/config"
)

var client *mongo.Client

func Init() {
	config := config.GetConfig()
	//log.Println("Connecting to DB...")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(config.GetString("db.host")).SetServerAPIOptions(serverAPI)
	var err error
	client, err = mongo.Connect(context.Background(), opts)
	if err != nil {
		panic(err)
	}
	//log.Println("Connected to DB.")
}

func GetDB() *mongo.Database {
	return client.Database(config.GetConfig().GetString("db.name"))
}

func GetHittingPlayerCollection() *mongo.Collection {
	return GetDB().Collection("hitting_players")
}

func GetPitchingPlayerCollection() *mongo.Collection {
	return GetDB().Collection("pitching_players")
}

func GetTeamCollection() *mongo.Collection {
	return GetDB().Collection("teams")
}

func GetGameCollection() *mongo.Collection {
	return GetDB().Collection("games")
}
