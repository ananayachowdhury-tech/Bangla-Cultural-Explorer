const input=document.getElementById('searchInput');
input.addEventListener('input',()=>{
 const q=input.value.trim().toLowerCase();
 document.querySelectorAll('.searchable').forEach(card=>{
   card.classList.toggle('hidden', q && !((card.innerText+' '+(card.dataset.keywords||'')).toLowerCase().includes(q)));
 });
});
function analyzeText(){
 const text=document.getElementById('textInput').value.replace(/[.,!?;:।—“”"()]/g,' ');
 const words=text.split(/\s+/).filter(Boolean);
 const counts={};
 words.forEach(w=>{ if(w.length>1) counts[w]=(counts[w]||0)+1; });
 const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6);
 document.getElementById('wordsList').innerHTML=top.length?top.map(([w,n])=>`<div class="word"><span>${w}</span><span>${n}</span></div>`).join(''):'<div style="font-size:11px;color:#777">No words found.</div>';
}
analyzeText();



let exploreData = {};

async function loadCultureData() {
  try {
    const files = [
      ["literature", "data/literature.json"],
      ["words", "data/cultural-words.json"],
      ["textiles", "data/textiles.json"],
      ["food", "data/food.json"],
      ["regions", "data/regions.json"],
      ["folk", "data/folk-traditions.json"]
    ];

    const results = await Promise.all(
      files.map(async ([key, file]) => [key, await fetch(file).then(r => r.json())])
    );

    results.forEach(([key, data]) => {
      exploreData[key] = data;
    });
  } catch (error) {
    console.error("Could not load cultural data:", error);
  }
}

function categoryData(data) {
  return {
    title: data.title,
    intro: data.intro,
    items: data.items
  };
}

function openExplore(category){
  const data=categoryData(exploreData[category]);
  if(!data) return;
  document.getElementById('exploreTitle').textContent=data.title;
  document.getElementById('exploreIntro').textContent=data.intro;
  document.getElementById('exploreItems').innerHTML=data.items.map(item=>`
    <article class="explore-item">
      <div class="symbol">${item[0]}</div>
      <h3>${item[1]}</h3>
      <p>${item[3]}</p>
      <div class="meta">${item[2]}</div>
    </article>`).join('');
  document.getElementById('explorePanel').classList.remove('hidden');
  document.getElementById('explorePanel').scrollIntoView({behavior:'smooth',block:'start'});
}
function closeExplore(){
  document.getElementById('explorePanel').classList.add('hidden');
  document.getElementById('categories').scrollIntoView({behavior:'smooth'});
}

document.querySelectorAll('.nav button').forEach(btn=>{
 btn.addEventListener('click',()=>{
   document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
   btn.classList.add('active');
   const s=btn.dataset.section;
   if(s==='home'){
     document.getElementById('categories').scrollIntoView({behavior:'smooth'});
     return;
   }
   if(exploreData[s]){
     openExplore(s);
     return;
   }
   if(s==='about'){
     document.querySelector('.cta').scrollIntoView({behavior:'smooth'});
   }
 });
});

loadCultureData();

