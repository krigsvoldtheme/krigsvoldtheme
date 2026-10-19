import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBuffer } from 'bplist-parser';
import { themes } from '../src/palettes.mjs';
import { terminalApp,terminalAppColors } from '../src/terminal-app.mjs';
import { terminal } from '../src/ports.mjs';
import { contrastRatio } from '../src/contrast.mjs';

for(const theme of Object.values(themes)) {
  test(theme.name+' Terminal.app profile has correctly archived colors and no commands',()=>{
    const xml=terminalApp(theme);
    const colors=Object.fromEntries([...xml.matchAll(/<key>(\w+Color)<\/key>\s*<data>([^<]+)<\/data>/g)].map(m=>[m[1],Buffer.from(m[2],'base64')]));
    assert.equal(Object.keys(colors).length,21);
    for(const [key,hex] of Object.entries(terminalAppColors(theme))) {
      const [archive]=parseBuffer(colors[key]);
      assert.equal(archive.$archiver,'NSKeyedArchiver');
      const color=archive.$objects[archive.$top.root.UID];
      assert.equal(color.NSColorSpace,1);
      assert.equal(archive.$objects[color.$class.UID].$classname,'NSColor');
      const roundtrip=Buffer.from(color.NSRGB).toString().replace(/\0$/,'').split(' ').map(x=>Math.round(Number(x)*255));
      assert.deepEqual(roundtrip,[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)),key);
    }
    assert.match(xml,/<key>type<\/key><string>Window Settings<\/string>/);
    assert.ok(!/CommandString|RunCommandAsShell|Shell|Font|Keyboard/.test(xml));
  });
}
test('Light terminal ANSI text stays readable on paper',()=>{
  for(const [name,hex] of Object.entries(terminal(themes.light).ansi)) assert.ok(contrastRatio(hex,themes.light.tokens.bg)>=4.5,name);
});
