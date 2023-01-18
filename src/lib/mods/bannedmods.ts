import fs from "fs";
import path from "path";
import archiver from "archiver";
import { Mods } from "@lib/types/mods";

export function createBatFile(): void {
  const fileName = "ModsChecker.bat";
  const fileContent = `
@echo off
setlocal EnableDelayedExpansion
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('${process.env.NEXT_PUBLIC_URL}/api/mods/', 'BannedMods.txt')"
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
endlocal`;

  if (!fs.existsSync("public/assets/mods/ModsChecker")) {
    fs.mkdirSync("public/assets/mods/ModsChecker");
  }

  fs.writeFileSync(
    path.join("public/assets/mods/ModsChecker", fileName),
    fileContent,
    "utf8"
  );

  const output = fs.createWriteStream(
    path.join("public/assets/mods/", "ModsChecker.zip")
  );
  const archive = archiver("zip", {
    zlib: { level: 9 }, // set the compression level
  });

  output.on("close", function () {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);
  archive.directory("public/assets/mods/ModsChecker/", "ModsChecker");
  archive.finalize();
}

export function createModsFile(mods: Mods[]): void {
  let fileContent = "";

  for (const mod of mods) {
    fileContent += mod.modname + "\n";
  }
  const fileName = "BannedMods.txt";

  fs.writeFileSync(
    path.join("public/assets/mods/ModsChecker/BannedMods", fileName),
    fileContent,
    "utf8"
  );
}

//Create async function

export async function bannedModsFunc(): Promise<void> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/mods/`)
    .then((res) => res.json())
    .then((data) => data);
  if (data.mods) {
    createBatFile();
    createModsFile(data.mods);
  } else {
    return Promise.reject("No mods found");
  }
}
