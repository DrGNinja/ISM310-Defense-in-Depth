(function(){'use strict';
const params=new URLSearchParams(location.search),week=Number(document.body.dataset.week),selected=Math.max(1,Math.min(4,Number(params.get('day'))||1)),lesson=(week-1)*4+selected-1,route=params.get('route')||'';
// Ordinary direct weekly-page links return to the hub so the same navigation guard applies.
if(parent===window||params.get('embed')!=='1'){location.replace('../../index.html#week='+week+'&day='+selected);return;}
selectDay(selected);document.documentElement.classList.add('hub-embedded');
const CK=ISMCompletion,reviewKey='ism310-week'+week+'-reviews-v1';let reviews={};try{reviews=JSON.parse(localStorage.getItem(reviewKey)||'{}');if(!reviews||typeof reviews!=='object'||Array.isArray(reviews))reviews={};}catch(e){reviews={};}
const day=document.getElementById('day-'+selected),targetOrigin=location.protocol==='file:'?'*':location.origin;
function send(data){parent.postMessage({...data,lesson,route},targetOrigin);}
function descriptors(container){return Array.from(container.querySelectorAll('[data-note],[data-pick]')).map(e=>({id:e.id,type:e.type||e.tagName.toLowerCase(),value:e.value,checked:e.checked,label:(e.labels?.[0]?.textContent||e.id).trim()}));}
function activityRecords(){return Array.from(day.querySelectorAll('section.activity[id]')).map(s=>({id:s.id,name:s.querySelector('h3')?.textContent||s.id,fields:descriptors(s)}));}
function report(){const activities=activityRecords(),exitFields=Array.from(day.querySelectorAll('[id^="exit-"]')).map(e=>({id:e.id,value:e.value,label:(e.labels?.[0]?.textContent||e.id).trim()}));send({type:'ism310:completion',...CK.evaluate(activities,exitFields,reviews)});}
function autosave(){try{localStorage.setItem(storageKey,JSON.stringify(collect()));localStorage.setItem(reviewKey,JSON.stringify(reviews));status('Practice notes and feedback checks saved on this device.');}catch(e){status('Device saving is unavailable. Download this week’s notes before leaving.');}}
for(const s of day.querySelectorAll('section.activity[id]')){const b=s.querySelector('button');if(b)b.addEventListener('click',()=>{const fields=descriptors(s);if(CK.missingFields(s.id,fields).length===0)reviews[s.id]=CK.signature(fields);else delete reviews[s.id];autosave();report();});}
for(const e of day.querySelectorAll('[data-note],[data-pick]'))for(const event of ['input','change'])e.addEventListener(event,()=>{autosave();report();});
const clear=document.getElementById('clear');if(clear)clear.addEventListener('click',()=>{if(Array.from(document.querySelectorAll('[data-note],[data-pick]')).some(e=>e.type==='checkbox'?e.checked:String(e.value||'').trim()))return;for(const s of day.querySelectorAll('section.activity[id]'))delete reviews[s.id];autosave();report();});
const privacy=document.querySelector('p.small');if(privacy)privacy.textContent='Practice responses and feedback checks save automatically in this browser when storage is available. Complete responses, check each activity’s feedback, and answer the day’s exit questions to unlock completion. Incorrect attempts may still be reviewed; this is not automated grading. Download notes before leaving a shared device.';
function size(){send({type:'ism310:height',height:document.documentElement.scrollHeight});}if(typeof ResizeObserver!=='undefined')new ResizeObserver(size).observe(document.body);window.addEventListener('load',()=>{report();size();});document.addEventListener('toggle',size,true);
window.addEventListener('message',e=>{if(e.source!==parent)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;if(e.data?.route!==route)return;if(e.data.type==='ism310:request-completion')report();});report();size();
})();
