'use strict';
const $=id=>document.getElementById(id);
const money=n=>'$'+Math.floor(n).toLocaleString('en-US');
const num=n=>Math.floor(n).toLocaleString('en-US');
const crops=[
{id:'almond',name:'Almond Trees',icon:'🌰',time:28,yield:8,cost:25,desc:'Grow almonds for creamy almond milk.'},
{id:'oat',name:'Oat Fields',icon:'🌾',time:22,yield:10,cost:18,desc:'Harvest oats for oat milk.'},
{id:'soy',name:'Soybeans',icon:'🫘',time:35,yield:9,cost:35,desc:'Grow soybeans for rich soy milk.'},
{id:'cocoa',name:'Cocoa Grove',icon:'🍫',time:42,yield:7,cost:50,desc:'Chocolate milk starts here.'},
{id:'strawberry',name:'Strawberry Patch',icon:'🍓',time:34,yield:8,cost:40,desc:'Pick fresh strawberry flavor.'},
{id:'coconut',name:'Coconut Palms',icon:'🥥',time:55,yield:6,cost:75,desc:'Coconut milk and tropical blends.'},
{id:'banana',name:'Banana Plants',icon:'🍌',time:40,yield:8,cost:55,desc:'Great for banana milk.'},
{id:'rice',name:'Rice Paddies',icon:'🍚',time:38,yield:10,cost:45,desc:'Fresh rice milk.'},
{id:'cashew',name:'Cashew Trees',icon:'🥜',time:62,yield:7,cost:110,desc:'Make premium cashew milk.'},
{id:'vanilla',name:'Vanilla Vines',icon:'🌼',time:60,yield:6,cost:95,desc:'Flavor the finest bottles.'},
{id:'matcha',name:'Matcha Garden',icon:'🍵',time:72,yield:5,cost:170,desc:'Grow leaves for luxury matcha milk.'},
{id:'pistachio',name:'Pistachio Orchard',icon:'💚',time:95,yield:6,cost:260,desc:'High-end pistachio milk.'},
{id:'coffee',name:'Coffee Plants',icon:'☕',time:75,yield:6,cost:155,desc:'Make coffee-flavored milk.'},
{id:'hazelnut',name:'Hazelnut Grove',icon:'🌰',time:90,yield:6,cost:225,desc:'Sweet nutty hazelnut milk.'}];
const recipes=[
{id:'raw',name:'Fresh Cow Milk',icon:'🥛',price:3,ingredients:{raw:1},time:0,unlock:0,desc:'Straight from the barn. Sell it raw.'},
{id:'chocolate',name:'Chocolate Milk',icon:'🍫',price:12,ingredients:{raw:2,cocoa:1},time:4,unlock:60,desc:'Creamy chocolate milk.'},
{id:'strawberry',name:'Strawberry Milk',icon:'🍓',price:14,ingredients:{raw:2,strawberry:1},time:5,unlock:90,desc:'Fresh strawberry dairy milk.'},
{id:'almond',name:'Almond Milk',icon:'🌰',price:17,ingredients:{almond:3},time:5,unlock:120,desc:'Plant-based and delicious.'},
{id:'oat',name:'Oat Milk',icon:'🌾',price:16,ingredients:{oat:3},time:5,unlock:140,desc:'Smooth, creamy oat milk.'},
{id:'soy',name:'Soy Milk',icon:'🫘',price:19,ingredients:{soy:3},time:6,unlock:200,desc:'High-protein soy milk.'},
{id:'banana',name:'Banana Milk',icon:'🍌',price:23,ingredients:{raw:2,banana:2},time:7,unlock:300,desc:'Sweet banana goodness.'},
{id:'coconut',name:'Coconut Milk',icon:'🥥',price:25,ingredients:{coconut:3},time:7,unlock:400,desc:'Tropical dairy-free milk.'},
{id:'rice',name:'Rice Milk',icon:'🍚',price:22,ingredients:{rice:4},time:6,unlock:500,desc:'Mild and refreshing.'},
{id:'vanilla',name:'Vanilla Milk',icon:'🌼',price:33,ingredients:{raw:2,vanilla:2},time:8,unlock:800,desc:'Extra-special vanilla recipe.'},
{id:'cashew',name:'Cashew Milk',icon:'🥜',price:36,ingredients:{cashew:3},time:9,unlock:1100,desc:'Premium silky cashew milk.'},
{id:'coffee',name:'Coffee Milk',icon:'☕',price:45,ingredients:{raw:2,coffee:2},time:11,unlock:1800,desc:'Coffeehouse-style milk.'},
{id:'matcha',name:'Matcha Milk',icon:'🍵',price:52,ingredients:{raw:2,matcha:2},time:12,unlock:2500,desc:'Elegant green-tea milk.'},
{id:'hazelnut',name:'Hazelnut Milk',icon:'🌰',price:62,ingredients:{hazelnut:3},time:12,unlock:4000,desc:'Roasted hazelnut magic.'},
{id:'pistachio',name:'Pistachio Milk',icon:'💚',price:80,ingredients:{pistachio:3},time:15,unlock:6000,desc:'A luxury plant-based bottle.'},
{id:'chocoalmond',name:'Chocolate Almond Milk',icon:'🍫',price:55,ingredients:{almond:3,cocoa:2},time:10,unlock:2200,desc:'Chocolate without dairy.'},
{id:'strawban',name:'Strawberry Banana Milk',icon:'🍓',price:65,ingredients:{raw:2,strawberry:2,banana:2},time:12,unlock:3500,desc:'A fruity milkshake favorite.'},
{id:'mocha',name:'Mocha Milk',icon:'☕',price:95,ingredients:{raw:2,coffee:2,cocoa:2},time:16,unlock:7500,desc:'Rich chocolate coffee fusion.'},
{id:'golden',name:'Golden Milk',icon:'✨',price:125,ingredients:{raw:3,vanilla:2,matcha:1},time:19,unlock:12000,desc:'The crown jewel of the factory.'}
];
const shop=[
{id:'cow',name:'Buy Cow',icon:'🐄',base:70,scale:1.36,desc:'Each cow adds +1 milk per click.'},
{id:'bucket',name:'Bigger Buckets',icon:'🪣',base:110,scale:1.55,desc:'Each level adds +2 milk per click.'},
{id:'milker',name:'Auto Milker',icon:'🤖',base:155,scale:1.55,desc:'Adds +1 raw milk per second automatically.'},
{id:'blender',name:'Buy Blender',icon:'🥤',base:100,scale:1.58,desc:'Unlock crafting! Each blender adds processing speed.'},
{id:'bottler',name:'Auto Bottler',icon:'🏭',base:450,scale:1.72,desc:'Each adds +1 bottle of your selected recipe to the queue every 12 seconds (if ingredients are available).'},
{id:'seller',name:'Auto Seller',icon:'🛍️',base:300,scale:1.72,desc:'Each sells up to one ready bottle per 5 seconds.'},
{id:'silo',name:'Storage Expansion',icon:'📦',base:135,scale:1.55,desc:'Adds 100 storage capacity for both raw milk and finished bottles.'},
{id:'feed',name:'Premium Cow Feed',icon:'🌿',base:290,scale:1.65,desc:'Adds +50% more milk per click and auto milker (additive).'},
{id:'market',name:'Marketing Campaign',icon:'📢',base:380,scale:1.7,desc:'Adds +15% to milk sale prices (additive).'},
{id:'tractor',name:'Smart Harvester',icon:'🚜',base:590,scale:1.72,desc:'Auto-plants empty fields and harvests ready fields when affordable.'},
{id:'field',name:'Extra Field Plot',icon:'🌱',base:320,scale:1.6,desc:'Each level lets you plant one additional crop at a time.'},
{id:'fertilizer',name:'Growth Fertilizer',icon:'🧪',base:400,scale:1.65,desc:'Each level speeds crop growth by 15% (up to 75%).'}];
const achievements=[['first','First Sip','Milk a cow once.',s=>s.clicks>=1],['sales100','Corner Shop','Make $100 in lifetime sales.',s=>s.totalEarned>=100],['sales1k','Milk Merchant','Make $1,000 in lifetime sales.',s=>s.totalEarned>=1000],['sales10k','Dairy CEO','Make $10,000 in lifetime sales.',s=>s.totalEarned>=10000],['sales100k','Milk Tycoon','Make $100,000 in lifetime sales.',s=>s.totalEarned>=100000],['cows5','The Herd','Own 5 cows.',s=>s.up.cow>=4],['factory','Factory Open','Buy your first blender.',s=>s.up.blender>=1],['bottles','Bottle Master','Sell 500 bottles.',s=>s.totalBottles>=500],['all','Milk Collector','Unlock all milk recipes.',s=>s.totalEarned>=12000]];
const defaultState=()=>({cash:0,totalEarned:0,totalBottles:0,clicks:0,ingredients:{raw:0},products:{},up:{cow:0,bucket:0,milker:0,blender:0,bottler:0,seller:0,silo:0,feed:0,market:0,tractor:0,field:0,fertilizer:0},fields:[],queue:[],autoRecipe:'chocolate',marketFactor:1,marketTime:Date.now(),lastTime:Date.now(),autoTimer:0,sellTimer:0,harvestTimer:0,unlocked:[],achievements:[]});
let s=defaultState();
try{let saved=JSON.parse(localStorage.getItem('milkEmpireSaveV1')||'null');if(saved&&typeof saved==='object'){let d=defaultState();s={...d,...saved,ingredients:{...d.ingredients,...saved.ingredients},products:{...d.products,...saved.products},up:{...d.up,...saved.up},fields:Array.isArray(saved.fields)?saved.fields:[],queue:Array.isArray(saved.queue)?saved.queue:[],achievements:Array.isArray(saved.achievements)?saved.achievements:[]};}}catch(e){console.warn('Could not load save:',e)}
const level=id=>Math.max(0,Number(s.up[id])||0);
const storage=()=>100+100*level('silo');
const rawGain=()=>Math.max(1,Math.floor((1+level('cow')+level('bucket')*2)*(1+level('feed')*.5)));
const autoGain=()=>Math.floor(level('milker')*(1+level('feed')*.5));
const speed=()=>level('blender')*(1+Math.floor(level('blender')/5)*.2);
const inventoryUsed=()=>Object.values(s.products).reduce((a,b)=>a+(Number(b)||0),0);
const unitPrice=r=>r.price*(1+level('market')*.15)*s.marketFactor;
const canUnlock=r=>s.totalEarned>=r.unlock;
const canMake=r=>Object.entries(r.ingredients).every(([id,count])=>(s.ingredients[id]||0)>=count);
const cost=upgrade=>Math.ceil(upgrade.base*Math.pow(upgrade.scale,level(upgrade.id)));
const fieldsLimit=()=>2+level('field');
const cropFor=id=>crops.find(x=>x.id===id);
const recipeFor=id=>recipes.find(x=>x.id===id);
const note=t=>{$('message').textContent=t};
const addMilk=n=>{let add=Math.min(n,Math.max(0,storage()-(s.ingredients.raw||0)));s.ingredients.raw=(s.ingredients.raw||0)+add;return add};
const sell=(r,amount)=>{let have=r.id==='raw'?(s.ingredients.raw||0):(s.products[r.id]||0);let q=Math.min(have,amount);if(q<=0){note('No '+r.name+' available to sell yet.');return false;}if(r.id==='raw')s.ingredients.raw-=q;else s.products[r.id]-=q;let profit=Math.floor(q*unitPrice(r));s.cash+=profit;s.totalEarned+=profit;s.totalBottles+=q;note('Sold '+num(q)+' × '+r.name+' for '+money(profit)+'!');checkAchievements();return true};
function milk(){let n=addMilk(rawGain());s.clicks++;note(n?'Collected '+num(n)+' fresh milk!':'Raw milk storage is full! Sell milk or expand storage.');render();}
function buy(id){let item=shop.find(x=>x.id===id);if(!item)return;let price=cost(item);if(s.cash<price){note('Not enough cash for '+item.name+'.');return;}s.cash-=price;s.up[id]++;note('Purchased '+item.name+'!');checkAchievements();render();save();}
function plant(id){let c=cropFor(id);if(!c)return;if(s.fields.length>=fieldsLimit()){note('All your field plots are occupied. Harvest or buy more field plots.');return;}if(s.cash<c.cost){note('Not enough money to plant '+c.name+'.');return;}s.cash-=c.cost;s.fields.push({id,remaining:Math.max(3,c.time*(1-Math.min(5,level('fertilizer'))*.15))});note('Planted '+c.name+'.');render();}
function harvest(index){let f=s.fields[index];if(!f||f.remaining>0)return;let c=cropFor(f.id);s.ingredients[c.id]=(s.ingredients[c.id]||0)+c.yield;s.fields.splice(index,1);note('Harvested '+c.yield+' '+c.name+'!');render();}
function craft(id,n=1,auto=false){let r=recipeFor(id);if(!r||id==='raw'||!canUnlock(r)||!level('blender'))return false;let made=0;for(let i=0;i<n;i++){if(!canMake(r)||inventoryUsed()+s.queue.length>=storage())break;for(let [key,val] of Object.entries(r.ingredients))s.ingredients[key]-=val;s.queue.push({id,remaining:r.time,original:r.time});made++;}if(made&&!auto){note('Queued '+made+' × '+r.name+'!');render();}else if(!made&&!auto){note('Need ingredients and free storage for '+r.name+'.');}return made>0;}
function selectAuto(id){if(!recipeFor(id)||id==='raw')return;s.autoRecipe=id;note('Auto Bottlers set to '+recipeFor(id).name+'.');render();}
function checkAchievements(){for(let [id,name,,fn] of achievements){if(fn(s)&&!s.achievements.includes(id)){s.achievements.push(id);note('🏆 Achievement unlocked: '+name+'!');}}}
function tick(delta){delta=Math.max(0,Math.min(delta,8*3600));if(!delta)return;
addMilk(autoGain()*delta);
for(let f of s.fields)f.remaining=Math.max(0,f.remaining-delta);
let totalWork=delta*speed();while(totalWork>0&&s.queue.length){let q=s.queue[0];let spent=Math.min(totalWork,q.remaining);q.remaining-=spent;totalWork-=spent;if(q.remaining<=.0001){s.products[q.id]=(s.products[q.id]||0)+1;s.queue.shift();}else break;}
s.autoTimer+=delta;let batches=Math.min(2400,Math.floor(s.autoTimer/12));s.autoTimer%=12;if(level('bottler')&&batches){for(let i=0;i<batches;i++)craft(s.autoRecipe,level('bottler'),true)}
s.sellTimer+=delta;let cycles=Math.min(10000,Math.floor(s.sellTimer/5));s.sellTimer%=5;let toSell=cycles*level('seller');if(toSell>0){for(let r of recipes.slice().reverse()){if(toSell<=0)break;let available=r.id==='raw'?(s.ingredients.raw||0):(s.products[r.id]||0);let q=Math.min(toSell,Math.floor(available));if(q>0){if(r.id==='raw')s.ingredients.raw-=q;else s.products[r.id]-=q;let profit=Math.floor(q*unitPrice(r));s.cash+=profit;s.totalEarned+=profit;s.totalBottles+=q;toSell-=q;}}}
s.harvestTimer+=delta;if(level('tractor')&&s.harvestTimer>=3){s.harvestTimer%=3;for(let i=s.fields.length-1;i>=0;i--){let f=s.fields[i];if(f.remaining<=0){let c=cropFor(f.id);s.ingredients[c.id]=(s.ingredients[c.id]||0)+c.yield;s.fields.splice(i,1);}}let c=cropFor(s.autoRecipe);if(!c){let r=recipeFor(s.autoRecipe);c=cropFor(Object.keys(r?.ingredients||{}).find(k=>k!=='raw'))||crops[0]}while(s.fields.length<fieldsLimit()&&s.cash>=c.cost){s.cash-=c.cost;s.fields.push({id:c.id,remaining:Math.max(3,c.time*(1-Math.min(5,level('fertilizer'))*.15))});}}
if(Date.now()-s.marketTime>=60000){s.marketTime=Date.now();s.marketFactor=.85+Math.random()*.35;}
checkAchievements();}
function render(){let active=document.querySelector('.tab.active')?.id||'farm';
$('cash').textContent=money(s.cash);$('totalEarned').textContent=money(s.totalEarned);$('totalBottles').textContent=num(s.totalBottles);
$('cowCount').textContent=num(1+level('cow'));$('milkPerClick').textContent=num(rawGain());$('milkGain').textContent=num(rawGain());$('autoMilk').textContent=num(autoGain());$('rawMilk').textContent=num(s.ingredients.raw||0);$('storageCap').textContent=num(storage());$('milkBar').style.width=Math.min(100,100*(s.ingredients.raw||0)/storage())+'%';
if(active==='farm'){
$('cropGrid').innerHTML=crops.map(c=>{let f=s.fields.find(f=>f.id===c.id);let ready=s.fields.filter(f=>f.id===c.id&&f.remaining<=0).length;return `<div class="tile"><div class="emoji">${c.icon}</div><h4>${c.name}</h4><p>${c.desc}</p><div class="meta">Grow: ${c.time}s · Harvest: +${c.yield}</div><div class="meta">${f?'🌱 Growing: '+Math.ceil(f.remaining)+'s left':'Open planting'} ${ready?' · ✅ '+ready+' ready':''}</div><button class="secondary" data-plant="${c.id}" ${s.cash<c.cost||s.fields.length>=fieldsLimit()?'disabled':''}>Plant · ${money(c.cost)}</button></div>`}).join('')+`<div class="tile"><div class="emoji">🚜</div><h4>Field Space</h4><p>${s.fields.length} / ${fieldsLimit()} field plots in use.</p>${s.fields.map((f,i)=>`<button class="${f.remaining<=0?'primary':'secondary'}" data-harvest="${i}" ${f.remaining>0?'disabled':''}>${cropFor(f.id).icon} ${cropFor(f.id).name} · ${f.remaining<=0?'Harvest':'Ready in '+Math.ceil(f.remaining)+'s'}</button>`).join('')}</div>`;
$('pantry').innerHTML=[{id:'raw',name:'Raw Milk',icon:'🥛'},...crops].map(c=>`<span>${c.icon} ${c.name}: <b>${num(s.ingredients[c.id]||0)}</b></span>`).join('');}
if(active==='factory'){$('blenderCount').textContent=level('blender');$('processingSpeed').textContent=speed().toFixed(1);$('factoryStorage').textContent=num(inventoryUsed()+s.queue.length);$('factoryStorageMax').textContent=num(storage());$('autoBottlers').textContent=num(level('bottler'));
$('factoryNotice').textContent=level('blender')?'💡 Blenders process queued milk automatically. Auto Bottlers can queue your selected recipe every 12 seconds.':'Buy a Blender in the Upgrade Shop to create flavored and plant-based milk.';
$('recipeGrid').innerHTML=recipes.filter(r=>r.id!=='raw').map(r=>`<div class="tile ${canUnlock(r)?'':'locked'}"><div class="emoji">${r.icon}</div><h4>${r.name}</h4><p>${r.desc}</p><div class="meta">${Object.entries(r.ingredients).map(([k,n])=>`${n} ${k==='raw'?'raw milk':k}`).join(' + ')} · ${r.time}s</div><div class="meta">${canUnlock(r)?'🟢 Unlocked':'🔒 Unlock at '+money(r.unlock)+' lifetime sales'}</div><button class="primary" data-craft="${r.id}" ${!canUnlock(r)||!level('blender')||!canMake(r)||inventoryUsed()+s.queue.length>=storage()?'disabled':''}>Blend 1 · ${money(r.price)} value</button><button class="secondary" data-craft5="${r.id}" ${!canUnlock(r)||!level('blender')||!canMake(r)||inventoryUsed()+s.queue.length>=storage()?'disabled':''}>Queue up to 5</button><button class="secondary" data-auto="${r.id}" ${!canUnlock(r)?'disabled':''}>${s.autoRecipe===r.id?'✅ Auto recipe selected':'Set auto recipe'}</button></div>`).join('');
$('queueView').innerHTML=s.queue.length?s.queue.slice(0,8).map((q,i)=>`<div class="queue-row">${recipeFor(q.id)?.icon||'🥛'} ${recipeFor(q.id)?.name||q.id} · ${Math.ceil(q.remaining)}s of work left <div class="queue-progress"><span style="width:${Math.max(0,Math.min(100,100*(1-q.remaining/q.original)))}%"></span></div></div>`).join('')+(s.queue.length>8?`<p>+${num(s.queue.length-8)} more orders queued</p>`:''):'<div class="queue-row">Nothing being blended. Add a recipe above!</div>';}
if(active==='market'){$('marketTrend').textContent=(s.marketFactor*100).toFixed(0)+'% of base market price';$('sellMultiplier').textContent=((1+level('market')*.15)*s.marketFactor).toFixed(2)+'×';$('sellGrid').innerHTML=recipes.map(r=>{let have=Math.floor(r.id==='raw'?(s.ingredients.raw||0):(s.products[r.id]||0));return `<div class="tile"><div class="emoji">${r.icon}</div><h4>${r.name}</h4><p>Ready to sell: <b>${num(have)}</b> bottles</p><div class="meta">${money(unitPrice(r))} per bottle</div><button class="primary" data-sell="${r.id}" ${!have?'disabled':''}>Sell 1</button><button class="secondary" data-sellall="${r.id}" ${!have?'disabled':''}>Sell All · ${money(have*unitPrice(r))}</button></div>`}).join('');}
if(active==='shop'){$('shopGrid').innerHTML=shop.map(u=>`<div class="tile"><div class="emoji">${u.icon}</div><h4>${u.name}</h4><p>${u.desc}</p><div class="meta">Owned / level: ${u.id==='cow'?1+level('cow'):level(u.id)}</div><button class="primary" data-buy="${u.id}" ${s.cash<cost(u)?'disabled':''}>Buy · ${money(cost(u))}</button></div>`).join('');}
if(active==='recipes')$('cookbook').innerHTML=recipes.map(r=>`<div class="tile ${canUnlock(r)?'':'locked'}"><div class="emoji">${canUnlock(r)?r.icon:'🔒'}</div><h4>${r.name}</h4><p>${r.desc}</p><div class="meta">${Object.entries(r.ingredients).map(([k,n])=>`${n} ${k==='raw'?'raw milk':k}`).join(' + ')}</div><div class="meta">Selling price ${money(r.price)} · ${canUnlock(r)?'Unlocked':'Unlock at '+money(r.unlock)+' lifetime sales'}</div></div>`).join('');
if(active==='achievements')$('achievementGrid').innerHTML=achievements.map(([id,name,desc])=>`<div class="tile ${s.achievements.includes(id)?'':'locked'}"><div class="emoji">${s.achievements.includes(id)?'🏆':'🔒'}</div><h4>${name}</h4><p>${desc}</p><div class="meta">${s.achievements.includes(id)?'✅ Complete':'Not completed'}</div></div>`).join('');}
function save(){try{s.lastTime=Date.now();localStorage.setItem('milkEmpireSaveV1',JSON.stringify(s));}catch(e){note('Could not save progress. Browser storage may be disabled.')}}
$('milkBtn').addEventListener('click',milk);$('cowVisual').addEventListener('click',milk);$('saveBtn').addEventListener('click',()=>{save();note('Game saved!')});
$('resetBtn').addEventListener('click',()=>{if(confirm('Delete ALL Milk Empire progress? This cannot be undone.')){localStorage.removeItem('milkEmpireSaveV1');s=defaultState();note('A brand-new dairy awaits!');render();}});
document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active');render();}));
document.addEventListener('click',e=>{let btn=e.target.closest('button[data-buy],button[data-plant],button[data-harvest],button[data-craft],button[data-craft5],button[data-auto],button[data-sell],button[data-sellall]');if(!btn)return;let d=btn.dataset;if(d.buy)buy(d.buy);else if(d.plant)plant(d.plant);else if(d.harvest!==undefined)harvest(Number(d.harvest));else if(d.craft)craft(d.craft);else if(d.craft5)craft(d.craft5,5);else if(d.auto)selectAuto(d.auto);else if(d.sell){let r=recipeFor(d.sell);if(r)sell(r,1);render();}else if(d.sellall){let r=recipeFor(d.sellall);if(r)sell(r,Infinity);render();}});
$('sellAllBtn').addEventListener('click',()=>{let count=0;for(let r of recipes){let have=r.id==='raw'?(s.ingredients.raw||0):(s.products[r.id]||0);if(have>0){sell(r,Infinity);count++;}}if(!count)note('Nothing to sell yet!');render();});
let offline=Math.max(0,Math.min(8*3600,(Date.now()-(s.lastTime||Date.now()))/1000));if(offline>5){tick(offline);note('Welcome back! Your farm worked for '+Math.floor(offline/60)+' minutes while you were away.');}
checkAchievements();render();let last=performance.now();setInterval(()=>{let now=performance.now();let dt=Math.min(10,(now-last)/1000);last=now;tick(dt);render();},1000);setInterval(save,10000);document.addEventListener('visibilitychange',()=>{if(document.hidden)save();else {let dt=Math.min(8*3600,(Date.now()-s.lastTime)/1000);if(dt>2)tick(dt);last=performance.now();render();}});window.addEventListener('beforeunload',save);
