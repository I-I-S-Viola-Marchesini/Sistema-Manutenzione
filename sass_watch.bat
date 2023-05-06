@echo off
start "composer" cmd.exe /c "composer update"
start "sass" cmd.exe /c "sass --watch src/vendor/violamarchesini/violabootstrap/src:src/styles/bootstrap"