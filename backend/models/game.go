package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"softball_record/db"
	"time"
)

type Record struct {
	Team     string `json:"team"`
	Player   string `json:"player"` // objectid
	Number   int    `json:"number"`
	Order    int    `json:"order"`
	Position int    `json:"position"`
	Result   string `json:"result"`
	Outs     int    `json:"outs"`
	RBI      int    `json:"rbi"`
	Runs     int    `json:"runs"`
}

type Game struct {
	HomeTeam  string    `json:"home_team"` // objectid
	AwayTeam  string    `json:"away_team"` // objectid
	HomeScore int       `json:"home_score"`
	AwayScore int       `json:"away_score"`
	Date      time.Time `json:"date"`
	Location  string    `json:"location"`
	Records   []Record  `json:"records"`
}

func CreateGame(home string, guest string, date time.Time, location string) string {
	col := db.GetGameCollection()
	game := Game{home, guest, 0, 0, date, location, []Record{}}
	res, err := col.InsertOne(context.Background(), game)
	if err != nil {
		return ""
	}
	return res.InsertedID.(primitive.ObjectID).Hex()
}

func GetGame(id string) Game {
	col := db.GetGameCollection()
	var game Game
	objID, _ := primitive.ObjectIDFromHex(id)
	col.FindOne(context.Background(), primitive.M{"_id": objID}).Decode(&game)
	return game
}

func GetAllGames() []Game {
	col := db.GetGameCollection()
	var games []Game
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		return games
	}
	for cur.Next(context.Background()) {
		var game Game
		err := cur.Decode(&game)
		if err != nil {
			return games
		}
		games = append(games, game)
	}
	return games
}

func AddRecord(gameID string, record Record) bool {
	col := db.GetGameCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"_id": gameID}, bson.M{
		"$push": bson.M{
			"records": record,
		},
	})
	if err != nil {
		return false
	}
	return true
}

func UpdateRecords(gameID string, records []Record) bool {
	col := db.GetGameCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"_id": gameID}, bson.M{
		"$set": bson.M{
			"records": records,
		},
	})
	if err != nil {
		return false
	}
	return true
}
