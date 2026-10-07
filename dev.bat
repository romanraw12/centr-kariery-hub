@echo off
chcp 65001 >nul
cd /d "%~dp0"
setlocal EnableDelayedExpansion

rem ---- locate npm (same as build.bat) ----
set "NODE_DIR="
for /f "delims=" %%I in ('where npm 2^>nul') do if not defined NPM_PATH set "NPM_PATH=%%I"
if defined NPM_PATH for %%I in ("%NPM_PATH%") do set "NODE_DIR=%%~dpI"
if not defined NODE_DIR for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\Node.js" /v InstallPath 2^>nul') do set "NODE_DIR=%%B"
if not defined NODE_DIR for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\WOW6432Node\Node.js" /v InstallPath 2^>nul') do set "NODE_DIR=%%B"
if not defined NODE_DIR if exist "%ProgramFiles%\nodejs\npm.cmd" set "NODE_DIR=%ProgramFiles%\nodejs"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Programs\nodejs\npm.cmd" set "NODE_DIR=%LOCALAPPDATA%\Programs\nodejs"
if not defined NODE_DIR if exist "%NVM_SYMLINK%\npm.cmd" set "NODE_DIR=%NVM_SYMLINK%"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Volta\bin\npm.cmd" set "NODE_DIR=%LOCALAPPDATA%\Volta\bin"
rem ---- portable (zip) Node.js: NODE_HOME var or extracted node-* folders ----
rem Downloads folder may be localized (e.g. "Загрузки") - resolve it via registry
set "DL="
for /f "tokens=2*" %%A in ('reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v "{374DE290-123F-4565-9164-39C4925E4676}" 2^>nul') do set "DL=%%B"
if defined DL call set "DL=%%DL%%"
if not defined NODE_DIR if defined NODE_HOME if exist "%NODE_HOME%\npm.cmd" set "NODE_DIR=%NODE_HOME%"
rem zip extracts into a NESTED folder - check 1 and 2 levels next to dev.bat
if not defined NODE_DIR for /d %%D in ("%~dp0node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%~dp0node-*\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
rem folder placed in the parent directory of the project
if not defined NODE_DIR for /d %%D in ("%~dp0..\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%~dp0..\node-*\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if defined DL if not defined NODE_DIR for /d %%D in ("!DL!\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if defined DL if not defined NODE_DIR for /d %%D in ("!DL!\node-*\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%USERPROFILE%\Downloads\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%USERPROFILE%\Downloads\node-*\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%USERPROFILE%\Desktop\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%USERPROFILE%\Desktop\node-*\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
if not defined NODE_DIR for /d %%D in ("%USERPROFILE%\node-*") do if not defined NODE_DIR if exist "%%~fD\npm.cmd" set "NODE_DIR=%%~fD"
rem last resort: recursive search of the project folder for npm.cmd lying next to node.exe
if not defined NODE_DIR for /f "delims=" %%D in ('dir /b /s "%~dp0npm.cmd" 2^>nul') do if not defined NODE_DIR if exist "%%~dpDnode.exe" set "NODE_DIR=%%~dpD"
if defined NODE_DIR if "!NODE_DIR:~-1!"=="\" set "NODE_DIR=!NODE_DIR:~0,-1!"
if not defined NODE_DIR (
  echo [dev] Node.js / npm not found.
  echo If Node.js was unpacked from a zip - set NODE_HOME=C:\path\to\node-v24.21.0-win-x64
  echo or install Node.js LTS from https://nodejs.org
  pause
  exit /b 1
)
set "PATH=!NODE_DIR!;!PATH!"
echo [dev] npm found: !NODE_DIR!

if not exist node_modules (
  echo [dev] first run: npm install ...
  call npm install
  if errorlevel 1 (
    echo [dev] npm install FAILED
    pause
    exit /b 1
  )
)

echo [dev] starting dev server, open http://localhost:5173 in browser
call npm run dev
pause
