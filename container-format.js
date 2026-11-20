"use strict";
/* .glasslock binary container: build and strictly parse the header (the header bytes are used as AES-GCM AAD) */
const MAGIC=[0x47,0x4c,0x43,0x4b],VER=1,KA=1,KP=2;
/* ---- container format ----
magic4 | ver1 | kdf1 | cipher1 | pa4 | pb4 | pc1 | salt16 | nonce12 | nameLen2 | name | mimeLen2 | mime | ciphertext+tag(16)
Everything before the ciphertext is the AAD. */
function buildHeader(kdf,pa,pb,pc,salt,nonce,name,mime){
  const nb=TE.encode(name).slice(0,255),mb=TE.encode(mime).slice(0,127);
  const h=new Uint8Array(4+3+9+16+12+2+nb.length+2+mb.length),v=new DataView(h.buffer);let o=0;
  h.set(MAGIC,0);h[4]=VER;h[5]=kdf;h[6]=1;v.setUint32(7,pa);v.setUint32(11,pb);h[15]=pc;
  h.set(salt,16);h.set(nonce,32);o=44;v.setUint16(o,nb.length);h.set(nb,o+2);o+=2+nb.length;
  v.setUint16(o,mb.length);h.set(mb,o+2);return h}
function parse(buf){
  const u=new Uint8Array(buf),bad=c=>{const e=new Error(c);e.code=c;return e};
  if(u.length<64||MAGIC.some((b,i)=>u[i]!==b))throw bad("inv");
  const v=new DataView(buf);
  if(u[4]!==VER||u[6]!==1)throw bad("ver");
  const kdf=u[5],pa=v.getUint32(7),pb=v.getUint32(11),pc=u[15];
  if(kdf===KA){if(pa<8192||pa>524288||pb<1||pb>16||pc<1||pc>8)throw bad("bad")}
  else if(kdf===KP){if(pa<100000||pa>20000000)throw bad("bad")}else throw bad("ver");
  let o=44;const nl=v.getUint16(o);if(nl>255||o+2+nl+2>u.length)throw bad("bad");
  const nameB=u.slice(o+2,o+2+nl);o+=2+nl;const ml=v.getUint16(o);if(ml>127||o+2+ml+16>u.length)throw bad("bad");
  const mimeB=u.slice(o+2,o+2+ml);o+=2+ml;
  return{kdf,pa,pb,pc,salt:u.slice(16,32),nonce:u.slice(32,44),nameB,mimeB,header:u.slice(0,o),ct:u.slice(o)}}
