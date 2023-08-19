package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"softball_record/db"
)

type Team struct {
	Name string `bson:"name" json:"name"`
	// using objectid
	Pitcher     string `bson:"pitcher" json:"pitcher"`
	Catcher     string `bson:"catcher" json:"catcher"`
	FirstBase   string `bson:"first_base" json:"first_base"`
	SecondBase  string `bson:"second_base" json:"second_base"`
	ThirdBase   string `bson:"third_base" json:"third_base"`
	ShortStop   string `bson:"short_stop" json:"short_stop"`
	LeftField   string `bson:"left_field" json:"left_field"`
	CenterField string `bson:"center_field" json:"center_field"`
	RightField  string `bson:"right_field" json:"right_field"`
	Free        string `bson:"free" json:"free"`
	EP          string `bson:"ep,omitempty" json:"ep,omitempty"`
}

func CreateTeam(name string) (string, error) {
	team := Team{Name: name}
	col := db.GetTeamCollection()
	res, err := col.InsertOne(context.Background(), team)
	if err != nil {
		return "", err
	}
	return res.InsertedID.(primitive.ObjectID).Hex(), nil
}

func GetAllTeams() ([]Team, error) {
	col := db.GetTeamCollection()
	var teams []Team
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		return teams, err
	}
	for cur.Next(context.Background()) {
		var team Team
		err := cur.Decode(&team)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return teams, nil
			}
			return teams, err
		}
		teams = append(teams, team)
	}
	return teams, nil
}

func GetTeamByName(name string) (Team, error) {
	col := db.GetTeamCollection()
	var team Team
	err := col.FindOne(context.Background(), bson.M{"name": name}).Decode(&team)
	if err != nil {
		return team, err
	}
	return team, nil
}

func UpdateTeam(name string, data bson.M) error {
	col := db.GetTeamCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"name": name}, bson.M{"$set": data})
	if err != nil {
		return err
	}
	return nil
}

func DeleteTeam(name string) error {
	col := db.GetTeamCollection()
	_, err := col.DeleteOne(context.Background(), bson.M{"name": name})
	if err != nil {
		return err
	}
	return nil
}
