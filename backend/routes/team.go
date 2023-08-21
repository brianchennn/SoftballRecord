package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"softball_record/models"
)

func CreateTeamRoutes(c *gin.Context) {
	team := models.TeamMeta{}
	err := c.BindJSON(&team)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	res, err := models.CreateTeam(team.Name)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "message": "Team created", "team": res})
	}
}

func GetTeamRoutes(c *gin.Context) {
	teamname := c.Param("teamname")
	team, err := models.GetTeamByName(teamname)
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "team": team})
	}
}

func GetAllTeamRoutes(c *gin.Context) {
	teams, err := models.GetAllTeams()
	if err != nil {
		c.JSON(404, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "teams": teams})
	}
}

func UpdateTeamRoutes(c *gin.Context) {
	teamname := c.Param("teamname")
	data := bson.M{}
	err := c.BindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
		return
	}
	err = models.UpdateTeam(teamname, data)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "message": "Team updated"})
	}
}

func DeleteTeamRoutes(c *gin.Context) {
	teamname := c.Param("teamname")
	err := models.DeleteTeam(teamname)
	if err != nil {
		c.JSON(400, gin.H{"result": "error", "message": err.Error()})
	} else {
		c.JSON(200, gin.H{"result": "success", "message": "Team deleted"})
	}
}

func InitTeamRoutes(router *gin.RouterGroup) {
	router.POST("/team", CreateTeamRoutes)
	router.GET("/team/:teamname", GetTeamRoutes)
	router.GET("/teams", GetAllTeamRoutes)
	router.PUT("/team/:teamname", UpdateTeamRoutes)
	router.DELETE("/team/:teamname", DeleteTeamRoutes)
}
