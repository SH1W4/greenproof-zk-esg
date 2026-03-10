@echo off
TITLE GREENPROOF · CINEMATIC DIRECTOR v3.0
color 0a
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║       GREENPROOF · CINEMATIC DIRECTOR v3.0             ║
echo ║       Direct Browser Recording Mode (No OBS Needed)    ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo [PRE-CHECK]:
echo   1. Have your 'narration_eleven.mp3' in the video-tools folder.
echo   2. ffplay or Windows Media Player available for audio.
echo.
echo [INFO] This script will:
echo   - Record the browser engine DIRECTLY (No Black Screens).
echo   - Simulate a cinematic human cursor.
echo   - Sync automatically with your Eleven Labs audio.
echo.
echo Press any key to activate the DIRECTOR MODE...
pause > nul

echo.
echo [STARTING] Orchestrating choreography...
node orchestrator-v3.js

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║  ✅ DONE! Check the 'recordings' folder for your video.  ║
echo ╚══════════════════════════════════════════════════════════╝
pause
