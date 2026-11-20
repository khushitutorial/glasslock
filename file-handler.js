"use strict";
/* File selection: browse, drag and drop, remove */
function pick(f){if(!f)return;S[S.mode]=f;clearRes();$("#msg").textContent="";upd()}
$("#fin").onchange=e=>pick(e.target.files[0]);
$("#drop").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();$("#fin").click()}};
["dragenter","dragover"].forEach(t=>$("#drop").addEventListener(t,e=>{e.preventDefault();$("#drop").classList.add("over")}));
["dragleave","drop"].forEach(t=>$("#drop").addEventListener(t,e=>{e.preventDefault();$("#drop").classList.remove("over")}));
$("#drop").addEventListener("drop",e=>pick(e.dataTransfer.files[0]));
$("#rm").onclick=()=>{S[S.mode]=null;$("#fin").value="";clearRes();$("#msg").textContent="";upd()};
