# Application ports

The generator emits native macOS Terminal.app profiles, standalone Zsh prompts, two VS Code theme JSON files, and two generic terminal 16-color JSON descriptors.

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

## Zsh prompt themes

Download `krigsvold-light.zsh-theme` or `krigsvold-dark.zsh-theme` from the website. Generated repository copies live in `ports/zsh/`. Choose the variant to match the terminal background; the prompt does not change that background or install a font. Use Zsh 5.9+. Truecolor is used when `COLORTERM` advertises `truecolor`/`24bit` or `TERM` ends in `-direct`; otherwise the prompt uses ANSI palette slots. The matching Terminal.app profile supplies those ANSI colors. No prompt framework, Node runtime, or patched font is needed to use the downloaded file; Git is optional.

```sh
mkdir -p ~/.config/zsh/themes
cp ~/Downloads/krigsvold-dark.zsh-theme ~/.config/zsh/themes/
```

Add the following at the end of `~/.zshrc`, after existing framework and prompt setup, and start a new shell:

```zsh
source "$HOME/.config/zsh/themes/krigsvold-dark.zsh-theme"
```

Replace `krigsvold-dark` with `krigsvold-light` for Light. Source one variant. To switch, change this line and start a new shell. Re-sourcing a variant is safe: one theme hook is registered, and switching to the companion Martlet/Krigsvold prompt removes the previous companion's hook while retaining unrelated hooks.

For Oh My Zsh, alternatively copy the file into `${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/` and set `ZSH_THEME="krigsvold-dark"` **before** sourcing `oh-my-zsh.sh`. Use this approach or the direct source line, not both. The theme owns `PROMPT`, clears `RPROMPT`, enables prompt percent/parameter expansion, and disables history-bang expansion. Other prompt engines may overwrite it if loaded later.

`+N` means staged entries, `~N` unstaged entries, `?N` untracked entries, and `xN` unresolved conflicts. These count porcelain status entries, not lines changed; an untracked directory may be one entry. Clean repositories show just the branch; detached HEAD shows `detached`. Long branch labels are shortened. Failed commands show `exit N`, and root sessions use `#` instead of `>`.

Git inspection runs one local `git status` per prompt, with optional locking disabled; it never fetches or contacts a remote. Set `KRIGSVOLD_GIT=0` before sourcing for very large repositories or to hide Git information. Branch labels are treated as data, with prompt escapes quoted and no recursive shell evaluation. The current directory uses Zsh's built-in `%3~` abbreviation.

The Zsh prompt is distinct from the Terminal.app profile. Use both for a matching shell prompt, terminal background, selection, and ANSI colors. Removing the source line or restoring the previous Oh My Zsh theme and starting a new shell restores the previous prompt setup.

The generator reads `src/zsh-theme.zsh`, renders it with `src/zsh-theme.mjs`, and takes every prompt color from the canonical theme roles. Shell tests exercise clean and dirty Git states, failures, missing Git, detached HEAD, hook replacement, and unusual branch names. These run with Zsh on Linux; macOS interactive verification remains pending.
