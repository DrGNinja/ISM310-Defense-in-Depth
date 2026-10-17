/* Sequential practice state. Browser records are not authenticated assessment evidence. */
(function(root){'use strict';
const SCHEMA='ism310-hub-progress-v1',POLICY='sequential-attempts-v1';
function index(week,day){const w=Number(week),d=Number(day);return Number.isInteger(w)&&w>=1&&w<=4&&Number.isInteger(d)&&d>=1&&d<=4?(w-1)*4+d-1:0;}
function address(i){const n=Number.isInteger(i)&&i>=0&&i<16?i:0;return{week:Math.floor(n/4)+1,day:n%4+1};}
function prefix(completed){const values=new Set(Array.isArray(completed)?completed.filter(x=>Number.isInteger(x)&&x>=0&&x<16):[]),out=[];for(let i=0;i<16&&values.has(i);i++)out.push(i);return out;}
function normalize(raw){raw=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};const completed=raw.policy===POLICY?prefix(raw.completed):[],researchNotes={};if(raw.researchNotes&&typeof raw.researchNotes==='object')for(let i=0;i<16;i++){const v=raw.researchNotes[String(i)];if(typeof v==='string')researchNotes[i]=v.slice(0,20000);}const active=Number.isInteger(raw.active)&&raw.active>=0&&raw.active<16?raw.active:0;return{schema:SCHEMA,policy:POLICY,version:'1.1.0',active:Math.min(active,Math.min(15,completed.length)),completed,researchNotes};}
function frontier(raw){return Math.min(15,normalize(raw).completed.length);}
function allowed(raw,i){return Number.isInteger(i)&&i>=0&&i<16&&i<=frontier(raw);}
function resolve(raw,i){return allowed(raw,i)?i:frontier(raw);}
function mark(raw,i,complete=true){const s=normalize(raw);if(!Number.isInteger(i)||i<0||i>=16)return s;if(complete){if(i===s.completed.length)s.completed.push(i);}else{s.completed=s.completed.filter(x=>x<i);}s.active=resolve(s,s.active);return s;}
function next(i){return Math.min(15,Math.max(0,Number.isInteger(i)?i:0)+1);}
function previous(i){return Math.max(0,Math.min(15,Number.isInteger(i)?i:0)-1);}
function validateBackup(raw){if(!raw||raw.schema!=='ism310-hub-backup-v1'||!raw.progress||raw.progress.schema!==SCHEMA)throw new Error('Use an ISM 310 hub backup.');const notesByWeek={},reviewsByWeek={};for(let w=1;w<=4;w++){for(const [source,target]of [[raw.notesByWeek,notesByWeek],[raw.reviewsByWeek,reviewsByWeek]]){const input=source?.[w];if(!input||typeof input!=='object'||Array.isArray(input))continue;const safe=Object.create(null);for(const [k,v]of Object.entries(input)){if(!/^[A-Za-z][A-Za-z0-9_-]{0,80}$/.test(k)||['constructor','prototype'].includes(k))continue;if(typeof v==='string')safe[k]=v.slice(0,50000);else if(typeof v==='boolean'&&target===notesByWeek)safe[k]=v;}target[w]=safe;}}return{progress:normalize(raw.progress),notesByWeek,reviewsByWeek,migrated:raw.progress.policy!==POLICY};}
const api={SCHEMA,POLICY,index,address,prefix,normalize,frontier,allowed,resolve,mark,next,previous,validateBackup};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ISMProgress=api;
})(typeof globalThis!=='undefined'?globalThis:this);
