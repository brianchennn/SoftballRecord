package models

import (
        "time"
)

type Record struct {
    Team string `json:"team"`
    Player HittingPlayer `json:"player"`
    Number int `json:"number"`
    Order int `json:"order"`
    Position int `json:"position"`
    Result string `json:"result"`
    Outs int `json:"outs"`
    RBI int `json:"rbi"`
    Runs int `json:"runs"`
}

type Game struct {
    HomeTeam string `json:"home_team"`
    AwayTeam string `json:"away_team"`
    HomeScore int `json:"home_score"`
    AwayScore int `json:"away_score"`
    Date time.Time `json:"date"`
    Location string `json:"location"`
    Records []Record `json:"records"`
}
