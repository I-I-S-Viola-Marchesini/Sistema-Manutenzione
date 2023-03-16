@echo off
start "sass" /min cmd.exe /c "composer update && sass src/vendor/violamarchesini/violabootstrap/src:src/styles/bootstrap"