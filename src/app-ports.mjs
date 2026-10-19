/** Generated ports use only the canonical theme roles; no network or runtime dependencies. */
export const rgb = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
export function xterm256(hex) {
  const c=rgb(hex), colors=[];
  const levels=[0,95,135,175,215,255];
  for(let r=0;r<6;r++) for(let g=0;g<6;g++) for(let b=0;b<6;b++) colors.push([16+36*r+6*g+b,[levels[r],levels[g],levels[b]]]);
  for(let i=0;i<24;i++) colors.push([232+i,[8+10*i,8+10*i,8+10*i]]);
  return colors.reduce((best,[index,v])=>{const d=v.reduce((sum,x,i)=>sum+(x-c[i])**2,0);return d<best[1]?[index,d]:best;},[0,Infinity])[0];
}
export function vimTheme(theme,version) {
  const t=theme.tokens;
  const groups={
    Normal:['text','bg'],NormalNC:['text','bg'],NormalFloat:['text','panel'],FloatBorder:['border-strong','panel'],
    Comment:['syntax-comment',null,'italic'],Constant:['syntax-constant'],String:['syntax-string'],Character:['syntax-string'],Number:['syntax-number'],Boolean:['syntax-constant'],Float:['syntax-number'],
    Identifier:['syntax-variable'],Function:['syntax-function'],Statement:['syntax-keyword'],Conditional:['syntax-keyword'],Repeat:['syntax-keyword'],Label:['syntax-keyword'],Operator:['syntax-operator'],Keyword:['syntax-keyword'],Exception:['syntax-keyword'],
    PreProc:['syntax-decorator'],Include:['syntax-keyword'],Define:['syntax-keyword'],Macro:['syntax-constant'],PreCondit:['syntax-keyword'],Type:['syntax-type'],StorageClass:['syntax-keyword'],Structure:['syntax-type'],Typedef:['syntax-type'],
    Special:['syntax-attribute'],SpecialChar:['syntax-regexp'],Tag:['syntax-tag'],Delimiter:['syntax-operator'],SpecialComment:['syntax-comment',null,'italic'],Debug:['syntax-invalid'],Underlined:['link',null,'underline'],Ignore:['text-disabled'],Error:['danger-text','danger-bg'],Todo:['warning-text','warning-bg','bold'],
    Cursor:['on-accent','accent'],CursorLine:[null,'panel'],CursorColumn:[null,'panel'],ColorColumn:[null,'panel'],LineNr:['text-disabled','bg'],CursorLineNr:['accent','panel','bold'],SignColumn:['muted','bg'],FoldColumn:['muted','bg'],Folded:['muted','panel'],NonText:['text-disabled'],SpecialKey:['text-disabled'],Whitespace:['border-subtle'],EndOfBuffer:['border-subtle'],
    Visual:['selection-text','selection'],VisualNOS:['selection-text','selection'],Search:['on-accent','accent'],IncSearch:['on-accent','accent-hover'],CurSearch:['on-accent','accent-hover'],MatchParen:['accent','panel2','bold'],
    StatusLine:['text','panel2','bold'],StatusLineNC:['muted','panel'],VertSplit:['border-subtle','bg'],WinSeparator:['border-subtle','bg'],WinBar:['text','panel'],WinBarNC:['muted','panel'],TabLine:['muted','panel'],TabLineFill:['muted','panel'],TabLineSel:['on-accent','accent','bold'],
    Pmenu:['text','panel'],PmenuSel:['on-accent','accent'],PmenuSbar:[null,'panel2'],PmenuThumb:[null,'scrollbar-thumb'],WildMenu:['on-accent','accent'],Directory:['accent'],Title:['accent',null,'bold'],Question:['success'],MoreMsg:['success'],ModeMsg:['text'],WarningMsg:['warning'],ErrorMsg:['danger'],
    DiffAdd:['success-text','success-bg'],DiffChange:['info-text','info-bg'],DiffDelete:['danger-text','danger-bg'],DiffText:['on-accent','accent','bold'],
    SpellBad:['danger',null,'underline'],SpellCap:['warning',null,'underline'],SpellRare:['syntax-constant',null,'underline'],SpellLocal:['info',null,'underline'],
    DiagnosticError:['danger'],DiagnosticWarn:['warning'],DiagnosticInfo:['info'],DiagnosticHint:['muted'],DiagnosticOk:['success'],
    DiagnosticVirtualTextError:['danger-text','danger-bg'],DiagnosticVirtualTextWarn:['warning-text','warning-bg'],DiagnosticVirtualTextInfo:['info-text','info-bg'],DiagnosticVirtualTextHint:['muted','panel'],
  };
  const lines=[`\" ${theme.name} ${version}. Generated from canonical color roles. MIT license.`,`set background=${theme.mode}`,'highlight clear','if exists("syntax_on")','  syntax reset','endif',`let g:colors_name = '${theme.id}'`];
  for(const [name,[fg,bg,style='NONE']] of Object.entries(groups)) lines.push(`highlight ${name} guifg=${fg?t[fg]:'NONE'} guibg=${bg?t[bg]:'NONE'} gui=${style} ctermfg=${fg?xterm256(t[fg]):'NONE'} ctermbg=${bg?xterm256(t[bg]):'NONE'} cterm=${style}`);
  const links={'@comment':'Comment','@string':'String','@string.regexp':'SpecialChar','@character':'Character','@number':'Number','@boolean':'Boolean','@constant':'Constant','@constant.builtin':'Constant','@variable':'Identifier','@variable.builtin':'Special','@variable.parameter':'Identifier','@variable.member':'Identifier','@function':'Function','@function.call':'Function','@function.builtin':'Function','@function.method':'Function','@constructor':'Type','@type':'Type','@type.builtin':'Type','@module':'Include','@keyword':'Keyword','@keyword.return':'Keyword','@operator':'Operator','@property':'Identifier','@attribute':'Special','@tag':'Tag','@tag.attribute':'Special','@punctuation':'Delimiter','@markup.heading':'Title','@markup.link':'Underlined','@markup.raw':'String','@lsp.type.class':'Type','@lsp.type.type':'Type','@lsp.type.function':'Function','@lsp.type.method':'Function','@lsp.type.parameter':'Identifier','@lsp.type.property':'Identifier','@lsp.type.variable':'Identifier','@lsp.type.enumMember':'Constant'};
  lines.push('if has("nvim")',...Object.entries(links).map(([a,b])=>`  highlight! link ${a} ${b}`),'endif','');
  return lines.join('\n');
}
export function vimDispatcher(family) {
  return `\" Choose the variant using Vim's background setting.\nif &background ==# 'light'\n  runtime colors/${family}-light.vim\nelse\n  runtime colors/${family}-dark.vim\nendif\n`;
}
export function emacsTheme(theme,version) {
 const t=theme.tokens;
 const faces={
  default:['text','bg'],cursor:[null,'accent'],fringe:['muted','bg'],region:['selection-text','selection'],highlight:['text','hover-bg'],'secondary-selection':['text','panel2'],shadow:['text-disabled'],'minibuffer-prompt':['accent',null,':weight bold'],link:['link',null,':underline t'],'link-visited':['link-visited',null,':underline t'],button:['link',null,':underline t'],
  'font-lock-builtin-face':['syntax-function'],'font-lock-comment-face':['syntax-comment',null,':slant italic'],'font-lock-comment-delimiter-face':['syntax-comment',null,':slant italic'],'font-lock-doc-face':['syntax-comment'],'font-lock-constant-face':['syntax-constant'],'font-lock-function-name-face':['syntax-function'],'font-lock-keyword-face':['syntax-keyword'],'font-lock-negation-char-face':['syntax-keyword'],'font-lock-preprocessor-face':['syntax-decorator'],'font-lock-regexp-grouping-backslash':['syntax-regexp'],'font-lock-regexp-grouping-construct':['syntax-regexp'],'font-lock-string-face':['syntax-string'],'font-lock-type-face':['syntax-type'],'font-lock-variable-name-face':['syntax-variable'],'font-lock-warning-face':['warning'],
  'line-number':['text-disabled','bg'],'line-number-current-line':['accent','panel',':weight bold'],'hl-line':[null,'panel'],'mode-line':['text','panel2',':box nil :weight bold'],'mode-line-inactive':['muted','panel',':box nil'],'header-line':['text','panel',':box nil'],'vertical-border':['border-subtle'],
  'isearch':['on-accent','accent'],'lazy-highlight':['info-text','info-bg'],'match':['on-accent','accent'],'show-paren-match':['accent','panel2',':weight bold'],'show-paren-mismatch':['danger-text','danger-bg'],
  error:['danger'],warning:['warning'],success:['success'],'trailing-whitespace':[null,'danger-bg'],'escape-glyph':['syntax-constant'],'homoglyph':['warning'],
  'completions-common-part':['accent',null,':weight bold'],'completions-first-difference':['syntax-function'],'icomplete-first-match':['accent',null,':weight bold'],
  'diff-added':['success-text','success-bg'],'diff-removed':['danger-text','danger-bg'],'diff-changed':['info-text','info-bg'],'diff-refine-added':['on-accent','success'],'diff-refine-removed':['on-accent','danger'],'diff-header':['text','panel2'],'diff-file-header':['accent','panel',':weight bold'],'diff-hunk-header':['syntax-function','panel'],
  'org-level-1':['accent',null,':weight bold'],'org-level-2':['syntax-function',null,':weight bold'],'org-level-3':['syntax-type',null,':weight bold'],'org-level-4':['syntax-constant'],'org-block':['text','panel'],'org-block-begin-line':['muted','panel'],'org-block-end-line':['muted','panel'],'org-code':['syntax-string'],'org-verbatim':['syntax-string'],'org-link':['link',null,':underline t'],'org-todo':['warning',null,':weight bold'],'org-done':['success',null,':weight bold'],'org-date':['syntax-constant'],
  'ansi-color-black':['bg','bg'],'ansi-color-red':['danger','danger'],'ansi-color-green':['success','success'],'ansi-color-yellow':['warning','warning'],'ansi-color-blue':['info','info'],'ansi-color-magenta':['syntax-constant','syntax-constant'],'ansi-color-cyan':['syntax-function','syntax-function'],'ansi-color-white':['text','text'],
 };
 const lines=[`;;; ${theme.id}-theme.el --- ${theme.name} color theme -*- lexical-binding: t; -*-`,';; Copyright (C) 2026 James P. Howard, II',`;; Version: ${version}`,';; SPDX-License-Identifier: MIT',';; Package-Requires: ((emacs "27.1"))',';;; Commentary:',`;; Generated from the ${theme.name} canonical color roles.`, ';;; Code:',`(deftheme ${theme.id} "${theme.name}.")`,`(custom-theme-set-faces '${theme.id}`];
 for(const [name,[fg,bg,extra='']] of Object.entries(faces)) lines.push(` '(${name} ((t (${fg?`:foreground "${t[fg]}" `:''}${bg?`:background "${t[bg]}" `:''}${extra}))))`);
 lines.push(')',`(provide-theme '${theme.id})`,`;;; ${theme.id}-theme.el ends here`,'');
 return lines.join('\n');
}
export function chromeTheme(theme,version) {
 const t=theme.tokens, colors={frame:t.panel2,frame_inactive:t.panel,toolbar:t.bg,toolbar_text:t.text,toolbar_button_icon:t.accent,tab_text:t.text,tab_background_text:t.muted,background_tab:t.panel2,bookmark_text:t.text,button_background:t.panel,ntp_background:t.bg,ntp_text:t.text,ntp_link:t.link,ntp_header:t.line,omnibox_background:t.panel,omnibox_text:t.text};
 return {manifest_version:3,name:theme.name,version,description:`${theme.name}: a quiet color theme for your browser.`,homepage_url:`https://${theme.id.split('-')[0]}theme.dev/`,theme:{colors:Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,rgb(v)])),properties:{ntp_logo_alternate:theme.mode==='dark'?1:0}}};
}
export function firefoxColors(theme) {
 const t=theme.tokens;
 return {colors:{frame:t.panel2,frame_inactive:t.panel,tab_background_text:t.muted,tab_text:t.text,tab_selected:t.bg,tab_line:t.accent,tab_loading:t.accent,toolbar:t.bg,toolbar_text:t.text,toolbar_bottom_separator:t.line,toolbar_top_separator:t.line,toolbar_vertical_separator:t.line,toolbar_field:t.panel,toolbar_field_text:t.text,toolbar_field_border:t['input-border'],toolbar_field_focus:t.bg,toolbar_field_text_focus:t.text,toolbar_field_border_focus:t.accent,toolbar_field_highlight:t.selection,toolbar_field_highlight_text:t['selection-text'],icons:t.accent,icons_attention:t.warning,button_background_hover:t['hover-bg'],button_background_active:t['active-bg'],popup:t.panel,popup_text:t.text,popup_border:t.line,popup_highlight:t.selection,popup_highlight_text:t['selection-text'],sidebar:t.panel,sidebar_text:t.text,sidebar_border:t.line,sidebar_highlight:t.selection,sidebar_highlight_text:t['selection-text'],ntp_background:t.bg,ntp_text:t.text},properties:{color_scheme:theme.mode,content_color_scheme:theme.mode}};
}
export function firefoxTheme(themes,family,version) {
 const label=themes.light.name.replace(/ Light$/,'');
 return {manifest_version:2,name:`${label} Light & Dark`,version,description:`${label} browser colors that follow Firefox's light or dark appearance.`,homepage_url:`https://${family}theme.dev/`,browser_specific_settings:{gecko:{id:`${family}-theme@${family}theme.dev`,strict_min_version:'142.0',data_collection_permissions:{required:['none']}}},theme:firefoxColors(themes.light),dark_theme:firefoxColors(themes.dark)};
}
/** Manual editor values, not a claimed native import contract. */
export function chatgptPreset(theme,version) {
 return {name:theme.name,version,format:'appearance-settings',appearance:theme.mode,background:theme.tokens.bg,foreground:theme.tokens.text,accent:theme.tokens.accent,contrast:theme.mode==='light'?45:60,instructions:'Enter these values in Settings > Appearance in ChatGPT/Codex desktop. Native import serialization is pending verification against an app export. Preset-only web/mobile clients may not expose custom colors.'};
}
export function highlightCSS(theme,version) {
 const t=theme.tokens, maps={'keyword,selector-tag,literal':'syntax-keyword','string,regexp,addition':'syntax-string','number':'syntax-number','title,function,title.function_':'syntax-function','type,built_in,title.class_':'syntax-type','variable,params':'syntax-variable','comment,quote':'syntax-comment','symbol,bullet':'syntax-constant','tag,name':'syntax-tag','attr,attribute':'syntax-attribute','deletion':'danger','meta':'syntax-decorator','operator,punctuation':'syntax-operator'};
 let s=`/* ${theme.name} ${version}. MIT. */\npre code.hljs { display: block; overflow-x: auto; padding: 1em; }\ncode.hljs { padding: 3px 5px; }\n.hljs { background: ${t.bg}; color: ${t.text}; }\n.hljs-subst { color: ${t.text}; }\n`;
 for(const [groups,role] of Object.entries(maps)) s+=groups.split(',').map(g=>'.hljs-'+g).join(', ')+` { color: ${t[role]}; }\n`;
 return s+'.hljs-comment, .hljs-quote, .hljs-emphasis { font-style: italic; }\n.hljs-strong { font-weight: bold; }\n';
}
