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

// HittingPlayerTestSuite
type HittingPlayerTestSuite struct {
	suite.Suite
	col *mongo.Collection
}

func (suite *HittingPlayerTestSuite) SetupSuite() {
	// setup
	config.Init("testing")
	db.Init()
	suite.col = db.GetHittingPlayerCollection()
}

func (suite *HittingPlayerTestSuite) SetupTest() {
	// setup
	h1 := models.HittingPlayer{Name: "test"}
	h2 := models.HittingPlayer{Name: "test2"}
	suite.col.InsertOne(context.Background(), h1)
	suite.col.InsertOne(context.Background(), h2)
}

func (suite *HittingPlayerTestSuite) TearDownTest() {
	// teardown
	suite.col.DeleteMany(context.Background(), bson.M{})
}

func (suite *HittingPlayerTestSuite) TestGetHittingPlayerByName() {
	assert := assert.New(suite.T())
	player, _ := models.GetHittingPlayerByName("test")
	assert.Equal(player.Name, "test")
}

func (suite *HittingPlayerTestSuite) TestGetAllHittingPlayers() {
	assert := assert.New(suite.T())
	players, _ := models.GetAllHittingPlayers()
	assert.Equal(len(players), 2)
}

func (suite *HittingPlayerTestSuite) TestCreateHittingPlayer() {
	assert := assert.New(suite.T())
	id, _ := models.CreateHittingPlayer("test3")
	assert.NotEqual(id, "")
}

func (suite *HittingPlayerTestSuite) TestUpdateHittingPlayer() {
	assert := assert.New(suite.T())
	var player models.HittingPlayer
	suite.col.FindOne(context.Background(), bson.M{"name": "test"}).Decode(&player)
	player.AB = 1
	models.UpdateHittingPlayer(player)
	player, _ = models.GetHittingPlayerByName("test")
	assert.Equal(player.AB, 1)
}

func TestHittingPlayerTestSuite(t *testing.T) {
	suite.Run(t, new(HittingPlayerTestSuite))
}

// PitchingPlayerTestSuite
type PitchingPlayerTestSuite struct {
	suite.Suite
	col *mongo.Collection
}

func (suite *PitchingPlayerTestSuite) SetupSuite() {
	// setup
	config.Init("testing")
	db.Init()
	suite.col = db.GetPitchingPlayerCollection()
}

func (suite *PitchingPlayerTestSuite) SetupTest() {
	// setup
	p1 := models.PitchingPlayer{Name: "test"}
	p2 := models.PitchingPlayer{Name: "test2"}
	suite.col.InsertOne(context.Background(), p1)
	suite.col.InsertOne(context.Background(), p2)
}

func (suite *PitchingPlayerTestSuite) TearDownTest() {
	// teardown
	suite.col.DeleteMany(context.Background(), bson.M{})
}

func (suite *PitchingPlayerTestSuite) TestGetPitchingPlayerByName() {
	assert := assert.New(suite.T())
	player, _ := models.GetPitchingPlayerByName("test")
	assert.Equal(player.Name, "test")
}

func (suite *PitchingPlayerTestSuite) TestGetAllPitchingPlayers() {
	assert := assert.New(suite.T())
	players, _ := models.GetAllPitchingPlayers()
	assert.Equal(len(players), 2)
}

func (suite *PitchingPlayerTestSuite) TestCreatePitchingPlayer() {
	assert := assert.New(suite.T())
	id, _ := models.CreatePitchingPlayer("test3")
	assert.NotEqual(id, "")
}

func (suite *PitchingPlayerTestSuite) TestUpdatePitchingPlayer() {
	assert := assert.New(suite.T())
	var player models.PitchingPlayer
	suite.col.FindOne(context.Background(), bson.M{"name": "test"}).Decode(&player)
	player.IP = 1.0
	models.UpdatePitchingPlayer(player)
	player, _ = models.GetPitchingPlayerByName("test")
	assert.Equal(player.IP, 1.0)
}

func TestPitchingPlayerTestSuite(t *testing.T) {
	suite.Run(t, new(PitchingPlayerTestSuite))
}
