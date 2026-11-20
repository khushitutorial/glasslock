"use strict";
/* Shared helpers: DOM shortcut, random bytes, formatting, filename/MIME sanitizing, user-facing error messages */
const $=s=>document.querySelector(s),TE=new TextEncoder(),TD=new TextDecoder("utf-8",{fatal:true});
const E={file:"Please select a file first.",pw:"Please enter a password.",mis:"Your passwords do not match.",inv:"This file is not a valid GlassLock file.",wrong:"Unable to decrypt. Check your password or file integrity.",bad:"The encrypted file may be damaged.",ver:"This encrypted file version is not supported.",mem:"This file exceeds the available browser resources."};
const fmt=n=>n<1024?n+" B":n<1048576?(n/1024).toFixed(1)+" KB":n<1073741824?(n/1048576).toFixed(1)+" MB":(n/1073741824).toFixed(2)+" GB";
const tick=()=>new Promise(r=>setTimeout(r,30));
const rnd=n=>crypto.getRandomValues(new Uint8Array(n));
const safeName=n=>{n=String(n).replace(/[\u0000-\u001f\u007f\\/:*?"<>|]/g,"_").replace(/^\.+/,"_").trim();return(n||"recovered-file").slice(0,200)};
const safeMime=m=>/^[a-z0-9.+-]+\/[a-z0-9.+-]+$/i.test(m)?m:"application/octet-stream";
