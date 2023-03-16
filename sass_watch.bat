@echo off
start "sass" cmd.exe /c "composer update && sass --watch src/vendor/violamarchesini/violabootstrap/src:src/styles/bootstrap"