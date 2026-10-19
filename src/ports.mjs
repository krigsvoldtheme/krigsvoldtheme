/** Starter ports: semantic editors and ANSI terminal colors. */
export function terminal(theme) {
 const t=theme.tokens, dark=theme.mode==='dark';
 const a=dark ? ['#0A1D35','#F0A4AF','#A6CFB5','#D9B876','#9ED5E6','#C6B6DB','#8FCBC7','#D4D8D9','#56616C','#F4B4BC','#B7DDC3','#E8CB97','#C2E4EF','#DFD0EB','#B5E0DE','#FBFAF7'] : ['#061325','#9A3542','#35644E','#79571F','#286A9D','#655477','#187178','#56616C','#62717B','#B34850','#2C7851','#8A6629','#1F75A3','#7F5E99','#167D86','#17202A'];
 return {name:theme.name,background:t.bg,foreground:t.text,cursor:t.accent,selection:t.selection,
 ansi:Object.fromEntries(['black','red','green','yellow','blue','magenta','cyan','white','brightBlack','brightRed','brightGreen','brightYellow','brightBlue','brightMagenta','brightCyan','brightWhite'].map((key,i)=>[key,a[i]]))};
}
export function vscode(theme) {
 const t=theme.tokens;
 const colors={'editor.background':t.bg,'editor.foreground':t.text,'editorLineNumber.foreground':t.muted,'editorCursor.foreground':t.accent,'editor.selectionBackground':t.selection,'editor.inactiveSelectionBackground':t.panel2,'editorIndentGuide.background1':t.line,'editorWidget.background':t.panel,'editorError.foreground':t.danger,'editorWarning.foreground':t.warning,'editorInfo.foreground':t.info,'focusBorder':t.focus,'activityBar.background':t.panel,'sideBar.background':t.panel,'sideBar.foreground':t.text,'panel.background':t.panel,'statusBar.background':t.panel2,'statusBar.foreground':t.text,'button.background':t.accent,'button.foreground':t['on-accent'],'button.hoverBackground':t['accent-hover'],'input.background':t['input-bg'],'input.foreground':t['input-text'],'input.border':t['input-border'],'dropdown.background':t.panel,'dropdown.foreground':t.text,'terminal.background':t.bg,'terminal.foreground':t.text};
 const types=[
 [['comment','punctuation.definition.comment'],'syntax-comment','italic'],
 [['keyword','storage.type','storage.modifier'],'syntax-keyword'],
 [['string','string.quoted'],'syntax-string'],
 [['constant.numeric','constant.language'],'syntax-number'],
 [['entity.name.function','support.function'],'syntax-function'],
 [['entity.name.type','support.type','support.class'],'syntax-type'],
 [['variable','identifier'],'syntax-variable'],
 [['entity.name.tag'],'syntax-tag'],
 [['entity.other.attribute-name'],'syntax-attribute'],
 [['string.regexp'],'syntax-regexp'],
 [['invalid','invalid.illegal'],'syntax-invalid']
 ];
 return {name:theme.name,type:theme.mode,semanticHighlighting:true,colors,tokenColors:types.map(([scope,role,fontStyle])=>({scope,settings:{foreground:t[role],...(fontStyle?{fontStyle}:{})}}))};
}
