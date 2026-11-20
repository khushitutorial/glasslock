"use strict";
/* AES-256-GCM file encryption */
async function encrypt(file,pw){
  const salt=rnd(16),nonce=rnd(12),useA=hasArgon();
  const [kdf,pa,pb,pc]=useA?[KA,ARGON.m,ARGON.t,ARGON.p]:[KP,PB_IT,0,0];
  $("#kdfl").textContent=useA?"Argon2id":"PBKDF2-SHA256";
  const hdr=buildHeader(kdf,pa,pb,pc,salt,nonce,file.name,file.type||"application/octet-stream");
  stage("Deriving key…");await tick();
  const key=await deriveKey(pw,kdf,pa,pb,pc,salt);
  stage("Encrypting…");await tick();
  const data=await file.arrayBuffer();
  const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv:nonce,additionalData:hdr,tagLength:128},key,data);
  stage("Packaging encrypted file…");await tick();
  return new Blob([hdr,ct],{type:"application/octet-stream"})}
