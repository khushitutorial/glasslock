"use strict";
/* UI state, status messages, tabs, theme, result panel and downloads */
const S={mode:"enc",enc:null,dec:null,busy:false,blob:null,rname:""};
function stage(t){$("#msg").className="";$("#msg").textContent=t}
function showErr(t){$("#msg").className="err";$("#msg").textContent=t}
function upd(){const m=S.mode,f=S[m];$("#drop").hidden=!!f;$("#info").hidden=!f;
  if(f){$("#fn").textContent=f.name;const ext=(f.name.split(".").pop()||"").toLowerCase();$("#fm").textContent=fmt(f.size)+" · "+(f.type||(ext?"."+ext:"unknown type"))}
  $("#go").disabled=S.busy||!f||!(m==="enc"?$("#p1").value&&$("#p2").value:$("#p3").value)}
function clearRes(){$("#res").hidden=true;$("#res").innerHTML="";S.blob=null}
function setMode(m){if(S.busy)return;S.mode=m;$("#seg").dataset.m=m;
  $("#t-enc").setAttribute("aria-selected",m==="enc");$("#t-dec").setAttribute("aria-selected",m==="dec");
  $("#encf").hidden=m!=="enc";$("#decf").hidden=m!=="dec";$("#warn").hidden=m!=="enc";
  $("#go").textContent=m==="enc"?"Encrypt file":"Decrypt file";
  $("#acc").textContent=m==="enc"?"or browse files · any file type":"or browse files · .glasslock files";
  $("#fin").value="";$("#msg").textContent="";clearRes();upd()}
$("#theme").onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme==="light"?"dark":"light"};
document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),10000)}
function showRes(title,rows,btn,blob,name){
  const r=$("#res");r.innerHTML="";const h=document.createElement("h2");h.textContent="✓ "+title;
  const dl=document.createElement("dl");rows.forEach(([k,v])=>{const a=document.createElement("dt"),b=document.createElement("dd");a.textContent=k;b.textContent=v;dl.append(a,b)});
  const b=document.createElement("button");b.className="go";b.textContent=btn;b.onclick=()=>download(blob,name);
  r.append(h,dl,b);r.hidden=false;S.blob=blob}
