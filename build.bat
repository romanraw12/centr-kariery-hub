@echo off
chcp 65001 >nul
cd /d "%~dp0"
setlocal EnableDelayedExpansion
set LOG=build-check.log
echo === build started %date% %time% === > "%LOG%"
echo [build] started, log: %LOG%

rem ---- locate npm (PATH, registry, common install dirs) ----
set "NODE_DIR="
for /f "delims=" %%I in ('where npm 2^>nul') do if not defined NPM_PATH set "NPM_PATH=%%I"
if defined NPM_PATH for %%I in ("%NPM_PATH%") do set "NODE_DIR=%%~dpI"
if not defined NODE_DIR for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\Node.js" /v InstallPath 2^>nul') do set "NODE_DIR=%%B"
if not defined NODE_DIR for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\WOW6432Node\Node.js" /v InstallPath 2^>nul') do set "NODE_DIR=%%B"
if not defined NODE_DIR for /f "tokens=2*" %%A in ('reg query "HKCU\SOFTWARE\Node.js" /v InstallPath 2^>nul') do set "NODE_DIR=%%B"
if not defined NODE_DIR if exist "%ProgramFiles%\nodejs\npm.cmd" set "NODE_DIR=%ProgramFiles%\nodejs"
if not defined NODE_DIR if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" set "NODE_DIR=%ProgramFiles(x86)%\nodejs"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Programs\nodejs\npm.cmd" set "NODE_DIR=%LOCALAPPDATA%\Programs\nodejs"
if not defined NODE_DIR if exist "%NVM_SYMLINK%\npm.cmd" set "NODE_DIR=%NVM_SYMLINK%"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Volta\bin\npm.cmd" set "NODE_DIR=%LOCALAPPDATA%\Volta\bin"
if not defined NODE_DIR if exist "%ProgramData%\chocolatey\bin\npm.cmd" set "NODE_DIR=%ProgramData%\chocolatey\bin"
if not defined NODE_DIR if exist "%USERPROFILE%\scoop\shims\npm.cmd" set "NODE_DIR=%USERPROFILE%\scoop\shims"
rem ---- portable (zip) Node.js: NODE_HOME var or extracted node-* folders ----
rem Downloads folder may be localized (e.g. "Загрузки") - resolve it via registry
set "DL="
for /f "tokens=2*" %%A in ('reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v "{374DE290-123F-4565-9164-39C4925E4676}" 2^>nul') do set "DL=%%B"
if defined DL call set "DL=%%DL%%"
if not defined NODE_DIR if defined NODE_HOME if exist "%NODE_HOME%\npm.cmd" set "NODE_DIR=%NODE_HOME%"
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
if not defined NODE_DIR goto :no_npm

echo [build] npm found: !NODE_DIR!
echo npm found at: !NODE_DIR! >> "%LOG%"
set "PATH=!NODE_DIR!;!PATH!"
goto :npm_ready

:no_npm
  echo [build] npm NOT FOUND. Checked: PATH, registry, Program Files, NVM, Volta, Chocolatey, Scoop, portable zip folders.
  echo checked: PATH, registry Node.js, Program Files, NVM_SYMLINK, Volta, Chocolatey, Scoop, portable zip (Downloads/Desktop/script dir) >> "%LOG%"
  echo === RESULT: FAIL [npm not found] === >> "%LOG%"
  echo --- folders next to build.bat: >> "%LOG%"
  for /d %%D in ("%~dp0*") do echo   %%~fD >> "%LOG%"
  echo --- npm.cmd found under the project folder: >> "%LOG%"
  for /f "delims=" %%D in ('dir /b /s "%~dp0npm.cmd" 2^>nul') do echo   %%D >> "%LOG%"
  echo.
  echo The log %LOG% lists all folders next to build.bat
  echo and all npm.cmd files found under the project - open it to see
  echo what the Node folder is actually called.
  echo.
  echo Fix options:
  echo   1. Move the folder that CONTAINS npm.cmd and node.exe next to build.bat.
  echo      Inside the zip it is nested: node-v24.21.0-win-x64\node-v24.21.0-win-x64\
  echo      Move the INNER folder.
  echo   2. set NODE_HOME=C:\path\to\node-v24.21.0-win-x64   then run build.bat again
  echo   3. Install Node.js LTS from https://nodejs.org
  goto :finish

:npm_ready

rem ---- npm install (first run only) ----
if not exist node_modules (
  echo --- npm install --- >> "%LOG%"
  echo [build] installing dependencies, wait...
  call npm install >> "%LOG%" 2>&1
  set INST=!errorlevel!
  echo npm install exit=!INST! >> "%LOG%"
  if not "!INST!"=="0" (
    echo === RESULT: FAIL [npm install] === >> "%LOG%"
    echo [build] FAIL: npm install failed, see %LOG%
    goto :finish
  )
)

rem ---- typescript check ----
echo --- tsc --noEmit --- >> "%LOG%"
echo [build] typescript check...
call npx tsc --noEmit >> "%LOG%" 2>&1
set T=!errorlevel!
echo tsc exit=!T! >> "%LOG%"

rem ---- production build ----
echo --- vite build --- >> "%LOG%"
echo [build] vite build...
call npx vite build >> "%LOG%" 2>&1
set V=!errorlevel!
echo vite exit=!V! >> "%LOG%"

set RES=FAIL [tsc=!T! vite=!V!]
if "!T!"=="0" if "!V!"=="0" set RES=OK [tsc=0 vite=0]
echo === RESULT: !RES! === >> "%LOG%"
echo [build] RESULT: !RES!

:finish
echo.
echo Log file: %LOG%
pause

