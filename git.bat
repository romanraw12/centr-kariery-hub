@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem --- recursion guard: this file must never be invoked as "git" again ---
if defined GIT_BAT_GUARD exit /b 0
setlocal
set "GIT_BAT_GUARD=1"
set "LOG=git-check.log"
set "STAMP=== git %date% %time% ==="
rem --- if the log is locked by another process, fail politely instead of spamming ---
echo %STAMP%> "%LOG%"
findstr /c:"%STAMP%" "%LOG%" >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: cannot write %LOG% - the file is locked by another process.
  echo Close the program showing this file - VS Code tab, Notepad,
  echo a running watch command - or restart VS Code,
  echo then run git.bat again.
  echo.
  pause
  exit /b 1
)

rem --- locate the real git.exe explicitly: bare "git"/"where git" resolves to
rem --- THIS git.bat in the current folder first -> self-recursion -> crash ---
set "GIT_EXE="
if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
if not defined GIT_EXE if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" set "GIT_EXE=%ProgramFiles(x86)%\Git\cmd\git.exe"
if not defined GIT_EXE if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
if not defined GIT_EXE if exist "%ProgramData%\chocolatey\bin\git.exe" set "GIT_EXE=%ProgramData%\chocolatey\bin\git.exe"
if not defined GIT_EXE if exist "%USERPROFILE%\scoop\shims\git.exe" set "GIT_EXE=%USERPROFILE%\scoop\shims\git.exe"
if not defined GIT_EXE for /f "delims=" %%G in ('where git.exe 2^>nul') do if not defined GIT_EXE set "GIT_EXE=%%G"

if not defined GIT_EXE (
  echo git.exe not found - install Git for Windows >> "%LOG%"
  echo === RESULT: FAIL [git.exe not found] === >> "%LOG%"
  type "%LOG%"
  pause
  exit /b 1
)

if not exist .git (
  "%GIT_EXE%" init >> "%LOG%" 2>&1
  echo git init exit=%errorlevel% >> "%LOG%"
)

rem --- commit identity: reuse the same as the other project, only if missing ---
"%GIT_EXE%" config user.name >nul 2>&1
if errorlevel 1 "%GIT_EXE%" config --local user.name "romanraw12"
"%GIT_EXE%" config user.email >nul 2>&1
if errorlevel 1 "%GIT_EXE%" config --local user.email "romanraw12@users.noreply.github.com"

"%GIT_EXE%" add -A >> "%LOG%" 2>&1
if "%~1"=="" (
  "%GIT_EXE%" commit -m "update: build %date% %time%" >> "%LOG%" 2>&1
) else (
  "%GIT_EXE%" commit -m "%*" >> "%LOG%" 2>&1
)
echo commit exit=%errorlevel% >> "%LOG%"

"%GIT_EXE%" log --oneline -5 >> "%LOG%" 2>&1

rem --- push only when a remote exists; fail loudly if push fails ---
"%GIT_EXE%" remote get-url origin >nul 2>&1
if errorlevel 1 goto skip_push
"%GIT_EXE%" push -u origin HEAD >> "%LOG%" 2>&1
if errorlevel 1 goto push_failed
echo push exit=0 >> "%LOG%"

:skip_push
echo === RESULT: OK, see git-check.log === >> "%LOG%"
type "%LOG%"
pause
exit /b 0

:push_failed
echo === RESULT: FAIL [push] - see git-check.log === >> "%LOG%"
type "%LOG%"
pause
exit /b 1
