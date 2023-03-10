@echo off
start "sass" cmd.exe /c "composer update && sass --watch vendor/violamarchesini/violabootstrap:src/styles/css"