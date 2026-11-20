"use strict";
/* AES-256-GCM file decryption with authentication */
async function decrypt(file,pw){
  stage("Validating container…");await tick();
  const c=parse(await file.arrayBuffer());
  stage("Deriving key…");await tick();
  const key=await deriveKey(pw,c.kdf,c.pa,c.pb,c.pc,c.salt);
  stage("Decrypting and verifying…");await tick();
  let pt;try{pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:c.nonce,additionalData:c.header,tagLength:128},key,c.ct)}
  catch(e){const x=new Error("wrong");x.code="wrong";throw x}
  let name,mime;try{name=safeName(TD.decode(c.nameB));mime=safeMime(TD.decode(c.mimeB))}catch(e){name="recovered-file";mime="application/octet-stream"}
  return{blob:new Blob([pt],{type:mime}),name}}
