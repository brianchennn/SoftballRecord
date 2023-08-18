package models

import (
	"context"
    "go.mongodb.org/mongo-driver/mongo"
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

type GameMeta struct {
    HomeTeam string `json:"home_team"`
    AwayTeam string `json:"away_team"`
    Date time.Time `json:"date"`
    Location string `json:"location"`
}

type Game struct {
	HomeTeam  string    `json:"home_team"`
	AwayTeam  string    `json:"away_team"`
	HomeScore int       `json:"home_score"`
	AwayScore int       `json:"away_score"`
	Date      time.Time `json:"date"`
	Location  string    `json:"location"`
	Records   []Record  `json:"records"`
}

func CreateGame(home string, away string, date time.Time, location string) (string, error) {
	col := db.GetGameCollection()
	game := Game{home, away, 0, 0, date, location, []Record{}}
	res, err := col.InsertOne(context.Background(), game)
	if err != nil {
		return "", err
	}
	return res.InsertedID.(primitive.ObjectID).Hex(), nil
}

func GetGame(id string) (Game, error) {
	col := db.GetGameCollection()
	var game Game
	objID, _ := primitive.ObjectIDFromHex(id)
    err := col.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&game)
    if err != nil {
        return game, err
    }
    return game, nil
}

func GetAllGames() ([]Game, error) {
	col := db.GetGameCollection()
	var games []Game
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		return games, err
	}
	for cur.Next(context.Background()) {
		var game Game
		err := cur.Decode(&game)
		if err != nil {
            if err == mongo.ErrNoDocuments {
                return games, nil
            }
            return games, err
		}
		games = append(games, game)
	}
	return games, nil
}

func AddRecord(gameID string, record Record) error {
	col := db.GetGameCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"_id": gameID}, bson.M{
		"$push": bson.M{
			"records": record,
		},
	})
	if err != nil {
		return err
	}
	return nil
}

func UpdateRecords(gameID string, records []Record) error {
	col := db.GetGameCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"_id": gameID}, bson.M{
		"$set": bson.M{
			"records": records,
		},
	})
    if err != nil {
        return err
    }
    return nil
}
