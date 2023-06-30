type HittingPlayer struct {
    ID int `json:"id"`
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
}

type PitchingPlayer struct {
    ID int `json:"id"`
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

