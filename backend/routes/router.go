package routes

import (
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	group := router.Group("/api")
	InitGameRoutes(group)
	InitTeamRoutes(group)
	InitPlayerRoutes(group)
	return router
}
