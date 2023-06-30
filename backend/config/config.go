package config

import (
    "github.com/spf13/viper"
)

var config *viper.Viper

func Init() {
    config = viper.New()
    config.SetConfigName("config")
    config.AddConfigPath(".")
    config.SetConfigType("yaml")
    config.ReadInConfig()
}

func GetConfig() *viper.Viper {
    return config
}
