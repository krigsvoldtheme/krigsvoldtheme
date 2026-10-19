import bplist from 'bplist-creator';
import { readFileSync } from 'node:fs';
const { version }=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
import { terminal } from './ports.mjs';

/** Apple's Terminal profile colors are NSData containing keyed NSColor archives. */
export function archiveColor(hex) {
  if (!/^#[a-f\d]{6}$/i.test(hex)) throw new TypeError('Expected a six-digit RGB color');
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
  return bplist({
    $version:100000,
    $objects:['$null', {NSRGB:Buffer.from(rgb.join(' ')+'\0'), NSColorSpace:1, $class:{UID:2}}, {$classname:'NSColor',$classes:['NSColor','NSObject']}],
    $archiver:'NSKeyedArchiver', $top:{root:{UID:1}}
  });
}

export function terminalAppColors(theme) {
  const p=terminal(theme);
  const colors={BackgroundColor:p.background,TextColor:p.foreground,TextBoldColor:theme.tokens['text-strong'],CursorColor:p.cursor,SelectionColor:p.selection};
  for(const [name,hex] of Object.entries(p.ansi)) colors['ANSI'+name[0].toUpperCase()+name.slice(1)+'Color']=hex;
  return colors;
}

/** Color-only profile: no startup commands, font dependency, or keyboard changes. */
export function terminalApp(theme) {
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const colors=Object.entries(terminalAppColors(theme)).map(([key,hex])=>`  <key>${key}</key>\n  <data>${archiveColor(hex).toString('base64')}</data>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Krigsvold Theme ${version}. Generated from src/palettes.mjs. -->
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>name</key><string>${escape(theme.name)}</string>
  <key>type</key><string>Window Settings</string>
  <key>ProfileCurrentVersion</key><real>2.04</real>
  <key>UseBrightBold</key><false/>
${colors}
</dict></plist>
`;
}
