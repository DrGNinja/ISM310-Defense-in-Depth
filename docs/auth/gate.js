(function(){
'use strict';
const get=id=>document.getElementById(id);
get('signin').addEventListener('submit',async event=>{
 event.preventDefault();get('submit').disabled=true;get('message').textContent='Checking…';
 try{
  const valid=await ISM310TOTP.verify(ISM310_CLASS_CONFIG.secret,get('code').value.trim());
  if(valid){get('gate').hidden=true;get('unlocked').hidden=false;get('hub').src='course/index.html';get('message').textContent='';get('code').value='';}
  else get('message').textContent='Code did not match. Enter the current six-digit code from the ISM 310 | Defense in Depth entry.';
 }catch(error){get('message').textContent=error.message;}
 finally{get('submit').disabled=false;}
});
get('lock').addEventListener('click',()=>{get('hub').src='about:blank';get('unlocked').hidden=true;get('gate').hidden=false;get('code').value='';get('message').textContent='';get('code').focus();});
})();
