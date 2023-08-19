package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"softball_record/models"
)

func CreateHittingPlayerRoutes(c *gin.Context) {
	player := models.PlayerMeta{}
	err := c.BindJSON(&player)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	res, err := models.CreateHittingPlayer(player.Name)
	if err != nil {
		c.JSON(500, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "id": res})
	}
}

func GetHittingPlayerRoutes(c *gin.Context) {
	name := c.Param("name")
	player, err := models.GetHittingPlayerByName(name)
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "player": player})
	}
}

func GetAllHittingPlayersRoutes(c *gin.Context) {
	players, err := models.GetAllHittingPlayers()
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "players": players})
	}
}

func UpdateHittingPlayerRoutes(c *gin.Context) {
	data := bson.M{}
	err := c.BindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	_, err = models.UpdateHittingPlayer(data)
	if err != nil {
		c.JSON(500, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success"})
	}
}

func CreatePitchingPlayerRoutes(c *gin.Context) {
	player := models.PlayerMeta{}
	err := c.BindJSON(&player)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	res, err := models.CreatePitchingPlayer(player.Name)
	if err != nil {
		c.JSON(500, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "id": res})
	}
}

func GetPitchingPlayerRoutes(c *gin.Context) {
	name := c.Param("name")
	player, err := models.GetPitchingPlayerByName(name)
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "player": player})
	}
}

func GetAllPitchingPlayersRoutes(c *gin.Context) {
	players, err := models.GetAllPitchingPlayers()
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "players": players})
	}
}

func UpdatePitchingPlayerRoutes(c *gin.Context) {
	data := bson.M{}
	err := c.BindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	_, err = models.UpdatePitchingPlayer(data)
	if err != nil {
		c.JSON(500, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success"})
	}
}

func InitPlayerRoutes(r *gin.RouterGroup) {
	r.POST("/hitting/player", CreateHittingPlayerRoutes)
	r.GET("/hitting/player/:name", GetHittingPlayerRoutes)
	r.GET("/hitting/players", GetAllHittingPlayersRoutes)
	r.PUT("/hitting/player", UpdateHittingPlayerRoutes)
	r.POST("/pitching/player", CreatePitchingPlayerRoutes)
	r.GET("/pitching/player/:name", GetPitchingPlayerRoutes)
	r.GET("/pitching/players", GetAllPitchingPlayersRoutes)
	r.PUT("/pitching/player", UpdatePitchingPlayerRoutes)
}
