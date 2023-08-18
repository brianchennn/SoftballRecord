package models

import (
	"context"
    "go.mongodb.org/mongo-driver/mongo"
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
