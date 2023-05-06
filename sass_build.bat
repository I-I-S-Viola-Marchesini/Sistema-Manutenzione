@echo off
start "composer" /min cmd.exe /c "composer update"
start "sass" /min cmd.exe /c "sass src/vendor/violamarchesini/violabootstrap/src:src/styles/bootstrap"