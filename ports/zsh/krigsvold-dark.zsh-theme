# Krigsvold Dark Zsh prompt · 1.0.0
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
typeset -g _krigsvold_color_accent='#9ED5E6'
typeset -g _krigsvold_color_secondary='#D9B876'
typeset -g _krigsvold_color_muted='#B3CCD5'
typeset -g _krigsvold_color_git='#C2E4EF'
typeset -g _krigsvold_color_danger='#F0A4AF'
typeset -g _krigsvold_color_success='#A6CFB5'
typeset -g _krigsvold_color_warning='#E0BF84'
# Native Terminal.app and other terminals without advertised truecolor use ANSI.
if [[ ${COLORTERM-} != (truecolor|24bit) && ${TERM-} != *-direct ]]; then
  _krigsvold_color_accent='6'
  _krigsvold_color_secondary='3'
  _krigsvold_color_muted='7'
  _krigsvold_color_git='12'
  _krigsvold_color_danger='1'
  _krigsvold_color_success='2'
  _krigsvold_color_warning='3'
fi

typeset -g _krigsvold_git='' _krigsvold_error='' _krigsvold_remote=''

_krigsvold_precmd() {
  local -i command_result=$?
  emulate -L zsh
  typeset -g _krigsvold_git='' _krigsvold_error='' _krigsvold_remote=''
  if (( command_result )); then
    _krigsvold_error="%F{${_krigsvold_color_danger}}exit ${command_result}%f "
  fi
  if [[ -n ${SSH_CONNECTION-}${SSH_TTY-} ]]; then
    _krigsvold_remote="%F{${_krigsvold_color_muted}} %n@%m%f"
  fi
  [[ ${KRIGSVOLD_GIT:-1} == 0 ]] && return 0
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
  (( staged )) && flags+=" %F{${_krigsvold_color_success}}+${staged}%f"
  (( changed )) && flags+=" %F{${_krigsvold_color_warning}}~${changed}%f"
  (( untracked )) && flags+=" %F{${_krigsvold_color_muted}}?${untracked}%f"
  (( conflicted )) && flags+=" %F{${_krigsvold_color_danger}}x${conflicted}%f"
  _krigsvold_git=" %F{${_krigsvold_color_muted}}[%f%F{${_krigsvold_color_git}}${escaped}%f${flags}%F{${_krigsvold_color_muted}}]%f"
  return 0
}

PROMPT='%F{${_krigsvold_color_accent}}%3~%f${_krigsvold_git}${_krigsvold_remote} ${_krigsvold_error}%F{${_krigsvold_color_secondary}}%(!.#.>)%f '
RPROMPT=''
add-zsh-hook precmd _krigsvold_precmd
_krigsvold_precmd
