"use strict";
/* Password strength meter, show/hide and input wiring */
function strength(p){let s=0;if(p.length>=8)s++;if(p.length>=12)s++;if(p.length>=16)s++;
  if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++;if(/\d/.test(p)&&/[^A-Za-z0-9]/.test(p))s++;return Math.min(s,4)}
function updPw(){const p=$("#p1").value,s=p?Math.max(1,strength(p)):0,L=["","Weak","Fair","Good","Strong"],C=["","#ff8a80","#ffb74d","#9ccc65","#7be0a0"];
  $("#mt").style.width=s*25+"%";$("#mt").style.background=C[s];
  $("#ml").textContent=p?"Strength: "+L[s]+(p.length<12?" · use at least 12 characters":""):"Use 12 or more characters. A long passphrase works best."}
$("#eye").onclick=()=>{const show=$("#p1").type==="password";["#p1","#p2","#p3"].forEach(s=>$(s).type=show?"text":"password");$("#eye").setAttribute("aria-label",show?"Hide password":"Show password")};
["#p1","#p2","#p3"].forEach(s=>$(s).oninput=()=>{if(s==="#p1")updPw();upd()});
