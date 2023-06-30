package models

import (
        "context"
        "softball_record/db"
        "go.mongodb.org/mongo-driver/bson"
)

type HittingPlayer struct {
    Name string `json:"name"`
    Games int `json:"games"`
    AB int `json:"ab"`
    Runs int `json:"runs"`
    Hits int `json:"hits"`
    Doubles int `json:"doubles"`
    Triples int `json:"triples"`
    HR int `json:"hr"`
    SF int `json:"sf"`
    RBI int `json:"rbi"`
    BB int `json:"bb"`
    SO int `json:"so"`
    //AVG float64 `json:"avg"`
    //OBP float64 `json:"obp"`
    //SLG float64 `json:"slg"`
    //OPS float64 `json:"ops"`
}

type PitchingPlayer struct {
    Name string `json:"name"`
    Games int `json:"games"`
    Wins int `json:"wins"`
    Losses int `json:"losses"`
    IP float64 `json:"ip"`
    Hits int `json:"hits"`
    Runs int `json:"runs"`
    ER int `json:"er"`
    HR int `json:"hr"`
    BB int `json:"bb"`
    SO int `json:"so"`
    //WHIP float64 `json:"whip"`
    //ERA float64 `json:"era"`
    //AVG float64 `json:"avg"`
}

// hitting player methods
func (h HittingPlayer) GetAVG() float64 {
    return float64(h.Hits) / float64(h.AB)
}

func (h HittingPlayer) GetOBP() float64 {
    return float64(h.Hits + h.BB) / float64(h.AB + h.BB + h.SF)
}

func (h HittingPlayer) GetSLG() float64 {
    return float64(h.Hits + h.Doubles + 2 * h.Triples + 3 * h.HR) / float64(h.AB)
}

func (h HittingPlayer) GetOPS() float64 {
    return h.GetOBP() + h.GetSLG()
}

func GetAllHittingPlayers() []HittingPlayer {
    col := db.GetHittingPlayerCollection()
    var players []HittingPlayer
    cur, err := col.Find(context.TODO(), bson.M{})
    if err != nil {
        return players
    }
    for cur.Next(context.TODO()) {
        var player HittingPlayer
        err := cur.Decode(&player)
        if err != nil {
            return players
        }
        players = append(players, player)
    }
    return players
}

func GetHittingPlayerByName(name string) HittingPlayer {
    col := db.GetHittingPlayerCollection()
    var player HittingPlayer
    col.FindOne(context.TODO(), bson.M{"name": name}).Decode(&player)
    return player
}

func NewHittingPlayer(name string) HittingPlayer {
    h := HittingPlayer{
        Name: name,
        Games: 0,
        AB: 0,
        Runs: 0,
        Hits: 0,
        Doubles: 0,
        Triples: 0,
        HR: 0,
        SF: 0,
        RBI: 0,
        BB: 0,
        SO: 0,
    }
    col := db.GetHittingPlayerCollection()
    col.InsertOne(context.TODO(), h)
    return h
}

func UpdateHittingPlayer(player HittingPlayer) HittingPlayer {
    col := db.GetHittingPlayerCollection()
    col.UpdateOne(context.TODO(), bson.M{"name": player.Name}, bson.M{
        "$set": bson.M{
            "games": player.Games,
            "ab": player.AB,
            "runs": player.Runs,
            "hits": player.Hits,
            "doubles": player.Doubles,
            "triples": player.Triples,
            "hr": player.HR,
            "sf": player.SF,
            "rbi": player.RBI,
            "bb": player.BB,
            "so": player.SO,
        },
    })
    return player
}

// pitching player methods
func (p PitchingPlayer) GetWHIP() float64 {
    return float64(p.BB + p.Hits) / float64(p.IP)
}

func (p PitchingPlayer) GetERA() float64 {
    return float64(p.ER) / (float64(p.IP) * 9)
}

func (p PitchingPlayer) GetAVG() float64 {
    return float64(p.Hits) / float64(p.IP)
}

func GetAllPitchingPlayers() []PitchingPlayer {
    col := db.GetPitchingPlayerCollection()
    var players []PitchingPlayer
    cur, err := col.Find(context.TODO(), bson.M{})
    if err != nil {
        return players
    }
    for cur.Next(context.TODO()) {
        var player PitchingPlayer
        err := cur.Decode(&player)
        if err != nil {
            return players
        }
        players = append(players, player)
    }
    return players
}

func GetPitchingPlayerByName(name string) PitchingPlayer {
    col := db.GetPitchingPlayerCollection()
    var player PitchingPlayer
    col.FindOne(context.TODO(), bson.M{"name": name}).Decode(&player)
    return player
}

func NewPitchingPlayer(name string) PitchingPlayer {
    p := PitchingPlayer{
        Name: name,
        Games: 0,
        Wins: 0,
        Losses: 0,
        IP: 0,
        Hits: 0,
        Runs: 0,
        ER: 0,
        HR: 0,
        BB: 0,
        SO: 0,
    }
    col := db.GetPitchingPlayerCollection()
    col.InsertOne(context.TODO(), p)
    return p
}

func UpdatePitchingPlayer(player PitchingPlayer) PitchingPlayer {
    col := db.GetPitchingPlayerCollection()
    col.UpdateOne(context.TODO(), bson.M{"name": player.Name}, bson.M{
        "$set": bson.M{
            "games": player.Games,
            "wins": player.Wins,
            "losses": player.Losses,
            "ip": player.IP,
            "hits": player.Hits,
            "runs": player.Runs,
            "er": player.ER,
            "hr": player.HR,
            "bb": player.BB,
            "so": player.SO,
        },
    })
    return player
}

