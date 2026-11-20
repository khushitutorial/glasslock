"use strict";
/* Password to AES-256 key: Argon2id (primary, hash-wasm) or PBKDF2-HMAC-SHA256 (fallback) */
const ARGON={m:65536,t:3,p:1},PB_IT=600000;
const hasArgon=()=>typeof hashwasm!=="undefined"&&hashwasm.argon2id;
async function deriveKey(pw,kdf,pa,pb,pc,salt){
  const p=pw.normalize("NFKC");let raw;
  if(kdf===KA){if(!hasArgon())throw new Error("noargon");
    raw=await hashwasm.argon2id({password:p,salt,parallelism:pc,iterations:pb,memorySize:pa,hashLength:32,outputType:"binary"})}
  else{const base=await crypto.subtle.importKey("raw",TE.encode(p),"PBKDF2",false,["deriveBits"]);
    raw=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:pa},base,256)}
  return crypto.subtle.importKey("raw",raw,{name:"AES-GCM"},false,["encrypt","decrypt"])}
