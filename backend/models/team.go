package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"softball_record/db"
)

type Team struct {
	Name string `json:"name"`
	// using objectid
	Pitcher     string `json:"pitcher"`
	Catcher     string `json:"catcher"`
	FirstBase   string `json:"first_base"`
	SecondBase  string `json:"second_base"`
	ThirdBase   string `json:"third_base"`
	ShortStop   string `json:"short_stop"`
	LeftField   string `json:"left_field"`
	CenterField string `json:"center_field"`
	RightField  string `json:"right_field"`
	Free        string `json:"free"`
	EP          string `json:"ep,omitempty"`
}

func CreateTeam(name string) string {
	team := Team{Name: name}
	col := db.GetTeamCollection()
	res, err := col.InsertOne(context.Background(), team)
	if err != nil {
		return ""
	}
	return res.InsertedID.(primitive.ObjectID).Hex()
}

func GetAllTeams() []Team {
	col := db.GetTeamCollection()
	var teams []Team
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		return teams
	}
	for cur.Next(context.Background()) {
		var team Team
		err := cur.Decode(&team)
		if err != nil {
			return teams
		}
		teams = append(teams, team)
	}
	return teams
}

func GetTeamByName(name string) Team {
	col := db.GetTeamCollection()
	var team Team
	col.FindOne(context.Background(), bson.M{"name": name}).Decode(&team)
	return team
}

func UpdateTeam(name string, data bson.M) bool {
	col := db.GetTeamCollection()
	_, err := col.UpdateOne(context.Background(), bson.M{"name": name}, bson.M{"$set": data})
	if err != nil {
		return false
	}
	return true
}

func DeleteTeam(name string) bool {
	col := db.GetTeamCollection()
	_, err := col.DeleteOne(context.Background(), bson.M{"name": name})
	if err != nil {
		return false
	}
	return true
}
