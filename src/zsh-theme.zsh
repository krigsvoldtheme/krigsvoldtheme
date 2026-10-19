# __NAME__ Zsh prompt · __VERSION__
# Generated from src/palettes.mjs and src/zsh-theme.zsh. MIT licensed.
# Source this file at the end of ~/.zshrc, after any framework initialization.
# Match this variant to your terminal's Light or Dark background.
# No terminal background, font, key binding, or shell startup file is changed.

autoload -Uz add-zsh-hook
# Switching between these companion themes, or sourcing twice, keeps one hook.
add-zsh-hook -d precmd _martlet_precmd 2>/dev/null || true
add-zsh-hook -d precmd _krigsvold_precmd 2>/dev/null || true
setopt prompt_percent prompt_subst
unsetopt prompt_bang
__COLOR_SETUP__

typeset -g ___FAMILY___git='' ___FAMILY___error='' ___FAMILY___remote=''

___FAMILY___precmd() {
  local -i command_result=$?
  emulate -L zsh
  typeset -g ___FAMILY___git='' ___FAMILY___error='' ___FAMILY___remote=''
  if (( command_result )); then
    ___FAMILY___error="%F{__DANGER__}exit ${command_result}%f "
  fi
__SSH__
  [[ ${__UPPER___GIT:-1} == 0 ]] && return 0
  (( $+commands[git] )) || return 0
  local report line branch='' xy flags='' escaped
  local -i staged=0 changed=0 untracked=0 conflicted=0
  # One read-only local status operation per prompt; no fetch or optional locks.
  report=$(LC_ALL=C GIT_OPTIONAL_LOCKS=0 command git -c core.quotepath=true status --porcelain=v1 --branch --untracked-files=normal 2>/dev/null) || return 0
  for line in "${(@f)report}"; do
    case "$line" in
      '## '*)
        branch=${line#'## '}
        branch=${branch%%...*}
        branch=${branch#'No commits yet on '}
        branch=${branch#'Initial commit on '}
        [[ $branch == 'HEAD (no branch)'* ]] && branch='detached'
        ;;
      '?? '*) (( untracked++ )) ;;
      '!! '*) ;;
      *)
        xy=${line[1,2]}
        if [[ $xy == (DD|AU|UD|UA|DU|AA|UU) ]]; then
          (( conflicted++ ))
        else
          [[ ${line[1]} != ' ' ]] && (( staged++ ))
          [[ ${line[2]} != ' ' ]] && (( changed++ ))
        fi
        ;;
    esac
  done
  [[ -n $branch ]] || return 0
  (( ${#branch} > 36 )) && branch="${branch[1,33]}..."
  # Branch names are data: escape prompt codes, and never evaluate their content.
  # PROMPT references this variable once; substitution results are not re-evaluated.
  escaped=${branch//\%/%%}
  (( staged )) && flags+=" %F{__SUCCESS__}+${staged}%f"
  (( changed )) && flags+=" %F{__WARNING__}~${changed}%f"
  (( untracked )) && flags+=" %F{__MUTED__}?${untracked}%f"
  (( conflicted )) && flags+=" %F{__DANGER__}x${conflicted}%f"
  ___FAMILY___git=" %F{__MUTED__}[%f%F{__GIT__}${escaped}%f${flags}%F{__MUTED__}]%f"
  return 0
}

__PROMPT_LAYOUT__
RPROMPT=''
add-zsh-hook precmd ___FAMILY___precmd
___FAMILY___precmd
