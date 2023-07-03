package config

import (
	"github.com/spf13/viper"
	"log"
)

var config *viper.Viper

func Init(env string) {
	config = viper.New()
	config.SetConfigName(env)
	config.AddConfigPath("../config/")
	config.AddConfigPath("./config/")
	config.SetConfigType("yaml")
	err := config.ReadInConfig()
	if err != nil {
		log.Fatal("Error reading config file: ", env)
		panic(err)
	}
}

func GetConfig() *viper.Viper {
	return config
}
