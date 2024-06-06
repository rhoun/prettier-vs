This version of prettier produces a more compact JSON that is still readable by using one-line objects when it is no longer than 'printWidth' in config (80 by default).

I probably broke a few core principles of prettier here, but whatever, the intended usage is limited to modding Vintage Story, so it's easier to work with JSON files there.

It does two runs for formatting:
1. Default prettier without any changes.
2. Custom check for current node length. If it's less than printWidth - we print the node using basic JSON.stringify with some spaces to keep it readable.

Add .prettierrc.json to the root of your project to configure the width:

{
  "printWidth": 120
}

Let me know if you have any ideas or if something doesn't work.

Enjoy!
# How to use
1. You need [NodeJS](https://nodejs.org/en/download/package-manager) installed on your machine.
2. Download the release version of ```prettier-vs``` and unpack somewhere, e.g. documents or any place.

## Visual Studio (or anything else, even notepad)
It's possible to use with Visual Studio, but it's not as straightforward as with Rider and VSCode.
Someone may do this as a VS extension, but that's a bit more effort for me, considering I use Rider.
You can use this approach with any editor, not only Visual Studio.

1. Install onchange package globally using command prompt/PowerShell  and this command: ```npm install -g onchange```
2. Open the command prompt (not PowerShell!) in the root of your mod project, e.g., ```F:/VSModding/PelagusLib/```. Alternatively, open the terminal in VS itself: View -> Terminal, then switch to the command prompt in the opened window. There's a button near the top with a plus sign. By default, it says "Developer PowerShell," but there's a drop-down to switch to the command prompt. You can set the command prompt to be the default using the gear icon nearby.
3. Start onchange as watch for JSON files. Replace path (```F:\prettier-vs```) to prettier-vs with yours: ```onchange "**/*.json" -- npx F:\prettier-vs -w {{file}}```.
4. Every time you save the file, it'll run prettier on it. Expect something like a second of delay.

You can change the maximum line width either with .prettierrc file like for Rider below or in the command itself:
```onchange "**/*.json" -- npx F:\prettier-vs --print-width 130 -w {{file}}```

## Rider
1. Open Settings and either type 'Prettier' in search or navigate 'Languages & Frameworks' -> 'JavaScript' -> 'Prettier'.
2. Select 'Manual Prettier configuration'.
3. Select the unpacked prettier-vs folder, and you should see '3.3.0-vintagestory' as the version after this.
4. Add 'json' to file types (Run for filer), so it looks like this: ```**/*.{js,ts,jsx,tsx,vue,astro,json}```
5. Check 'Run on save' or 'Run on code reformat'. It depends on your preference. I have both checked.
6. It's ready to use with your mod project.

You can add a config file to change the width of lines. Add a file named .prettierrc to the root of your project and treat it as a JSON file:
```
{
  "printWidth": 130
}
```

There are a bunch of other prettier settings. You can check the official prettier docs if you want to, but they're likely not that useful for our case.

## Visual Studio Code & VSCodium
1. Install [Prettier - Code formatter](https://open-vsx.org/extension/esbenp/prettier-vscode) extension.
2. Open Extensions -> Prettier - Code Formatter -> Extension Settings (in the menu that opens using the gear icon near this extension)
3. Find the setting 'Prettier: Prettier path' and set it to point to the extracted directory.
4. You can also edit 'Prettier: Print width' to change how long you want your lines to be. I have mine set to 130.
