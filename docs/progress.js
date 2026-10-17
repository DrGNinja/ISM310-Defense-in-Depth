/* Pure state functions shared by the browser and tests. Completion is self-reported practice only. */
(function(root){
'use strict';
const SCHEMA='ism310-hub-progress-v1';
function index(week,day){const w=Number(week),d=Number(day);return Number.isInteger(w)&&w>=1&&w<=4&&Number.isInteger(d)&&d>=1&&d<=4?(w-1)*4+d-1:0;}
function address(i){const n=Number.isInteger(i)&&i>=0&&i<16?i:0;return{week:Math.floor(n/4)+1,day:n%4+1};}
function normalize(raw){raw=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};const completed=Array.isArray(raw.completed)?[...new Set(raw.completed.filter(x=>Number.isInteger(x)&&x>=0&&x<16))].sort((a,b)=>a-b):[];const researchNotes={};if(raw.researchNotes&&typeof raw.researchNotes==='object')for(let i=0;i<16;i++){const v=raw.researchNotes[String(i)];if(typeof v==='string')researchNotes[i]=v.slice(0,20000);}return{schema:SCHEMA,version:'1.0.0',active:Number.isInteger(raw.active)&&raw.active>=0&&raw.active<16?raw.active:0,completed,researchNotes};}
function mark(raw,i,complete=true){const s=normalize(raw);if(Number.isInteger(i)&&i>=0&&i<16){s.completed=s.completed.filter(x=>x!==i);if(complete)s.completed.push(i);s.completed.sort((a,b)=>a-b);}return s;}
function next(i){return Math.min(15,Math.max(0,Number.isInteger(i)?i:0)+1);}
function previous(i){return Math.max(0,Math.min(15,Number.isInteger(i)?i:0)-1);}
function validateBackup(raw){if(!raw||raw.schema!=='ism310-hub-backup-v1'||!raw.progress||raw.progress.schema!==SCHEMA)throw new Error('Use an ISM 310 hub backup created by this version.');const notesByWeek={};for(let w=1;w<=4;w++){const input=raw.notesByWeek?.[w];if(!input||typeof input!=='object'||Array.isArray(input))continue;const safe=Object.create(null);for(const [k,v]of Object.entries(input)){if(!/^[A-Za-z][A-Za-z0-9_-]{0,80}$/.test(k)||['constructor','prototype'].includes(k))continue;if(typeof v==='string')safe[k]=v.slice(0,20000);else if(typeof v==='boolean')safe[k]=v;}notesByWeek[w]=safe;}return{progress:normalize(raw.progress),notesByWeek};}
const api={SCHEMA,index,address,normalize,mark,next,previous,validateBackup};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ISMProgress=api;
})(typeof globalThis!=='undefined'?globalThis:this);
