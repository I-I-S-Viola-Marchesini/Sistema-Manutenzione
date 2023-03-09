@echo off
composer update
start "sass" /min cmd.exe /c "sass --watch vendor/violamarchesini/custombootstrap:src/styles/css"