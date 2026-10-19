# Application ports

The generator emits native macOS Terminal.app profiles, two VS Code theme JSON files, and two generic terminal 16-color JSON descriptors.

## Terminal.app on macOS

Download `krigsvold-light.terminal` or `krigsvold-dark.terminal` from the website. Repository copies are in `ports/terminal-app/`; the generator also includes them in the website downloads and build artifacts.

In Terminal, choose **Terminal → Settings → Profiles**, open the action menu beneath the profiles list, choose **Import**, and select the downloaded file. Dragging a profile file into the profiles list also imports it. Select the imported Krigsvold profile and choose **Default** to use it for new windows. See [Apple's import and export guide](https://support.apple.com/guide/terminal/import-and-export-terminal-profiles-trml4299c696/mac).

The profiles set background, text, bold text, cursor, selection, and all sixteen ANSI colors. They contain no startup command, font requirement, shell setting, keyboard mapping, or automatic default-profile change. Existing terminal sessions do not change merely because the files are downloaded.

`src/terminal-app.mjs` creates the XML profile and its nested binary `NSKeyedArchiver`/`NSColor` records. Tests decode all 21 color records and check the reconstructed RGB values independently; Python `plistlib` is also used during development to validate the outer and nested plists. Import and visual rendering in Terminal.app have **not** been exercised on macOS in this development environment.

For Light, the ANSI white slots use readable gray/navy rather than disappearing into a warm paper background. All sixteen Light foregrounds meet 4.5:1 against the profile background. Dark retains its existing ANSI black slots, so that statement does not extend to every Dark ANSI color or to arbitrary terminal programs.

## Starter color definitions

The VS Code files are **color sources**, not a ready-to-install extension. A proper extension needs its own package manifest, icon, versioning, accessibility verification, Marketplace artwork and release pipeline. Generic terminal JSON is also a color source, separate from the installable Terminal.app profiles. Other emulators need their own formats and validation.

Future targets: VS Code extension, Kitty, iTerm2, Windows Terminal, Alacritty, Vim/Neovim, Obsidian, and CSS framework presets.

The first wave of ports should favor accuracy and testing over sheer count.
