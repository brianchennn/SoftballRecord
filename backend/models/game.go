package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"softball_record/db"
	"time"
)

type Record struct {
	Team     string `bson:"team" json:"team"`
    Player   string `bson:"player" json:"player"` // objectid
	Number   int    `bson:"number" json:"number"`
	Order    int    `bson:"order" json:"order"`
	Position int    `bson:"position" json:"position"`
	Result   string `bson:"result" json:"result"`
	Outs     int    `bson:"outs" json:"outs"`
	RBI      int    `bson:"rbi" json:"rbi"`
	Runs     int    `bson:"runs" json:"runs"`
}

type GameMeta struct {
	HomeTeam string    `bson:"home_team" json:"home_team"`
	AwayTeam string    `bson:"away_team" json:"away_team"`
	Date     time.Time `bson:"date" json:"date"`
	Location string    `bson:"location" json:"location"`
}

type Game struct {
	HomeTeam  string    `bson:"home_team" json:"home_team"`
	AwayTeam  string    `bson:"away_team" json:"away_team"`
	HomeScore int       `bson:"home_score" json:"home_score"`
	AwayScore int       `bson:"away_score" json:"away_score"`
	Date      time.Time `bson:"date" json:"date"`
	Location  string    `bson:"location" json:"location"`
	Records   []Record  `bson:"records" json:"records"`
}

type GameResponse struct {
    ID        string    `bson:"_id" json:"id"`
    HomeTeam  string    `bson:"home_team" json:"home_team"`
    AwayTeam  string    `bson:"away_team" json:"away_team"`
    HomeScore int       `bson:"home_score" json:"home_score"`
    AwayScore int       `bson:"away_score" json:"away_score"`
    Date      time.Time `bson:"date" json:"date"`
    Location  string    `bson:"location" json:"location"`
    Records   []Record  `bson:"records" json:"records"`
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

func GetGame(id string) (GameResponse, error) {
	col := db.GetGameCollection()
	var game GameResponse
	objID, _ := primitive.ObjectIDFromHex(id)
	err := col.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&game)
	if err != nil {
		return game, err
	}
	return game, nil
}

func GetAllGames() ([]GameResponse, error) {
	col := db.GetGameCollection()
	var games []GameResponse
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		return games, err
	}
	for cur.Next(context.Background()) {
		var game GameResponse
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
