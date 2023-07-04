package tests

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"softball_record/config"
	"softball_record/db"
	"softball_record/models"
	"testing"
)

type TeamTestSuite struct {
	suite.Suite
	col *mongo.Collection
}

func (suite *TeamTestSuite) SetupSuite() {
	config.Init("testing")
	db.Init()
	suite.col = db.GetTeamCollection()
}

func (suite *TeamTestSuite) SetupTest() {
	t1 := models.Team{Name: "Team1"}
	t2 := models.Team{Name: "Team2"}
	suite.col.InsertOne(context.Background(), t1)
	suite.col.InsertOne(context.Background(), t2)
}

func (suite *TeamTestSuite) TearDownTest() {
	suite.col.DeleteMany(context.Background(), bson.M{})
}

func (suite *TeamTestSuite) TestCreateTeam() {
	id := models.CreateTeam("Team3")
	assert.NotEqual(suite.T(), "", id)
}

func (suite *TeamTestSuite) TestGetAllTeams() {
	teams := models.GetAllTeams()
	assert.Equal(suite.T(), 2, len(teams))
}

func (suite *TeamTestSuite) TestGetTeamByName() {
	team := models.GetTeamByName("Team1")
	assert.Equal(suite.T(), "Team1", team.Name)
}

func (suite *TeamTestSuite) TestUpdateTeam() {
	var team models.Team
	models.UpdateTeam("Team1", bson.M{"name": "TeamOne"})
	suite.col.FindOne(context.Background(), bson.M{"name": "TeamOne"}).Decode(&team)
	assert.Equal(suite.T(), "TeamOne", team.Name)
}

func (suite *TeamTestSuite) TestDeleteTeam() {
	models.DeleteTeam("Team2")
	var team models.Team
	suite.col.FindOne(context.Background(), bson.M{"name": "Team2"}).Decode(&team)
	assert.Equal(suite.T(), "", team.Name)
}

func TestTeamTestSuite(t *testing.T) {
	suite.Run(t, new(TeamTestSuite))
}
