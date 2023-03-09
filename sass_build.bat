@echo off
composer update
start "sass" /min cmd.exe /c "sass vendor/violamarchesini/violabootstrap:src/styles/css"