
@echo off
setlocal EnableDelayedExpansion
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('http://localhost:3000/api/mods/', 'BannedMods.txt')"
set "BannedMods=BannedMods.txt"
set "Plugins=../Plugins"
set "DisabledModsFolder=../Plugins/Disabled Mods"
set "Output=ModsFound.txt"

if not exist "%BannedMods%" (
    echo BannedMods file not found!
    pause
)

if not exist "%Plugins%" (
    echo Plugins folder not found!
    pause
)

if not exist "%DisabledModsFolder%" (
    mkdir "%DisabledModsFolder%"
)

if exist "%Output%" (
    del "%Output%"
)

echo Result: >> "%Output%"
echo. >> "%Output%"
echo. >> "%Output%"

echo Remember, not all plugins may be listed, so ask the coordinator if you are unsure about a plugin.
echo.
echo Checking for banned mods...

for /f "delims=" %%a in ('findstr /v /c:"#" "%BannedMods%"') do (
    if exist "%Plugins%/%%a.dll" (
        echo # Banned Mod: %%a.dll >> "%Output%"
        echo. >> "%Output%"
        move "%Plugins%/%%a.dll" "%DisabledModsFolder%"
    )
)

echo The mods have been moved to the "%DisabledModsFolder%"-folder. If a mod broke, because it relied on the plugin, contact the tournament-organizer to talk about the usage. >> "%Output%"

echo.
echo The mods have been moved to the "%DisabledModsFolder%"-folder.
echo A list have been saved to "%Output%" in the same folder as this script.
echo.

pause
endlocal