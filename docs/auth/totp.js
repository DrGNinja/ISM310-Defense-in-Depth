(function(root){
'use strict';
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function decode(secret){let bits='';for(const c of secret){const index=alphabet.indexOf(c);if(index<0)throw Error('Invalid Base32 secret');bits+=index.toString(2).padStart(5,'0');}return new Uint8Array((bits.match(/.{8}/g)||[]).map(b=>parseInt(b,2)));}
async function codeAt(secret,seconds){
 if(!root.crypto?.subtle)throw Error('Web Crypto is unavailable. Try current Edge or Chrome using the HTTPS test page.');
 const key=await root.crypto.subtle.importKey('raw',decode(secret),{name:'HMAC',hash:'SHA-1'},false,['sign']);
 const bytes=new Uint8Array(8);new DataView(bytes.buffer).setBigUint64(0,BigInt(Math.floor(seconds/30)),false);
 const signature=new Uint8Array(await root.crypto.subtle.sign('HMAC',key,bytes));
 const o=signature[signature.length-1]&15;
 const value=((signature[o]&127)<<24)|(signature[o+1]<<16)|(signature[o+2]<<8)|signature[o+3];
 return String(value%1000000).padStart(6,'0');
}
async function verify(secret,input,seconds=Date.now()/1000){
 if(!/^\d{6}$/.test(input))return false;
 for(const offset of [0,-30,30])if(await codeAt(secret,seconds+offset)===input)return true;
 return false;
}
root.ISM310TOTP=Object.freeze({codeAt,verify});
})(globalThis);
