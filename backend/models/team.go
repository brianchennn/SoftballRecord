import (
    "softball_records/models"
)

type Team struct {
    ID          int64  `json:"id"`
    Name        string `json:"name"`
    Players     []models.Player `json:"players"`
}
