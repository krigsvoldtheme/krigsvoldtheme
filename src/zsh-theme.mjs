import {readFileSync} from 'node:fs';
const template=readFileSync(new URL('./zsh-theme.zsh',import.meta.url),'utf8');

/** Generate a standalone, Oh My Zsh-compatible prompt from canonical color roles. */
export function zshTheme(theme,version='1.0.0') {
  const family=theme.id.replace(/-(light|dark)$/,'');
  if(!['martlet','krigsvold'].includes(family)) throw new Error('Unsupported prompt family');
  const t=theme.tokens;
  const layouts={
    martlet: "PROMPT='%F{__MUTED__}%n@%m%f %F{__ACCENT__}%3~%f${_martlet_git}'$'\n''${_martlet_error}%F{__ACCENT__}%(!.#.>)%f '",
    krigsvold: "PROMPT='%F{__ACCENT__}%3~%f${_krigsvold_git}${_krigsvold_remote} ${_krigsvold_error}%F{__SECONDARY__}%(!.#.>)%f '"
  };
  const ssh=family==='krigsvold' ? "  if [[ -n ${SSH_CONNECTION-}${SSH_TTY-} ]]; then\n    _krigsvold_remote=\"%F{__MUTED__} %n@%m%f\"\n  fi" : '';
  const roles={accent:'accent',secondary:'accent2',muted:'muted',git:'syntax-function',danger:'danger',success:'success',warning:'warning'};
  const ansi={accent:theme.mode==='light'?4:family==='martlet'?3:6,secondary:3,muted:theme.mode==='light'?8:7,git:theme.mode==='light'?4:12,danger:1,success:2,warning:3};
  const colorSetup=Object.entries(roles).map(([key,role])=>`typeset -g _${family}_color_${key}='${t[role]}'`).join('\n')+
    "\n# Native Terminal.app and other terminals without advertised truecolor use ANSI.\n"+
    "if [[ ${COLORTERM-} != (truecolor|24bit) && ${TERM-} != *-direct ]]; then\n"+
    Object.entries(ansi).map(([key,index])=>`  _${family}_color_${key}='${index}'`).join('\n')+"\nfi";
  const replacements={COLOR_SETUP:colorSetup,PROMPT_LAYOUT:layouts[family],SSH:ssh,FAMILY:family,UPPER:family.toUpperCase(),NAME:theme.name,VERSION:version};
  for(const key of Object.keys(roles)) replacements[key.toUpperCase()]='${_'+family+'_color_'+key+'}';
  let result=template;
  for(const key of ['COLOR_SETUP','PROMPT_LAYOUT','SSH','FAMILY','UPPER','NAME','VERSION','ACCENT','SECONDARY','MUTED','GIT','DANGER','SUCCESS','WARNING']) result=result.replaceAll('__'+key+'__',()=>replacements[key]);
  return result;
}
