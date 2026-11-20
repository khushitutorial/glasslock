"use strict";
/* Entry point: mode tabs, main action, init */
$("#t-enc").onclick=()=>setMode("enc");$("#t-dec").onclick=()=>setMode("dec");
$("#go").onclick=async()=>{
  const m=S.mode,f=S[m];if(!f){showErr(E.file);return}
  const pw=m==="enc"?$("#p1").value:$("#p3").value;if(!pw){showErr(E.pw);return}
  if(m==="enc"&&pw!==$("#p2").value){showErr(E.mis);return}
  S.busy=true;clearRes();$("#go").disabled=true;$("#prog").hidden=false;
  try{
    if(m==="enc"){const blob=await encrypt(f,pw),n=f.name+".glasslock";
      showRes("Encryption complete",[["Original",f.name],["Encrypted file",n],["Original size",fmt(f.size)],["Encrypted size",fmt(blob.size)]],"Download encrypted file",blob,n)}
    else{const r=await decrypt(f,pw);
      showRes("Decryption complete",[["Recovered file",r.name],["Size",fmt(r.blob.size)]],"Download recovered file",r.blob,r.name)}
    $("#msg").textContent="";
    ["#p1","#p2","#p3"].forEach(s=>$(s).value="");updPw()
  }catch(e){
    const c=e.code;showErr(E[c]||(e instanceof RangeError||/memory|alloc|quota/i.test(e.message)?E.mem:e.message==="noargon"?"This file needs Argon2id, which could not be loaded. Check your connection and reload.":E.bad))
  }finally{S.busy=false;$("#prog").hidden=true;upd()}};
setMode("enc");
