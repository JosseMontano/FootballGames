@echo off

echo Save State
git add .

echo Committing...
git commit -m "%~1"