package models

type Team struct {
    Name        string `json:"name"`
    Hitters     []HittingPlayer `json:"hitters"`
    Pitchers    []PitchingPlayer `json:"pitchers"`
}
