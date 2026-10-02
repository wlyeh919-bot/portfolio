(()=>{'use strict';
const docs=window.PORTFOLIO_DOCUMENTS||[];
const byId=id=>document.getElementById(id);
const roles={
student:{title:'師資生：把結果連回自己的學習',intro:'從施測與個人報表開始，透過導讀、反思與諮詢理解結果。',items:['入口：個人或學校安排的施測','支持：個人報表、報表導讀、反思學習單、諮詢','用途：連結自身經驗，形成後續培育與學習的參考']},
teacher:{title:'師培教師：把情境與結果帶進培育',intro:'依課程與師資類科需求，選用案例、導讀活動與反思資源。',items:['入口：課程與培育需求','支持：實務案例講座、導讀與反思材料','用途：引導學生討論角色、理解情境，練習專業判斷']},
coordinator:{title:'學校承辦人：讓導入與操作持續運作',intro:'理解測驗用途、施測安排與報表取用，建立可延續的學校端流程。',items:['入口：校級導入、甄選與專案施測','支持：系統研習、操作說明、使用諮詢、成果回饋','用途：協調年度作業、整理需求、回饋功能與服務建議']},
leader:{title:'主管與資料使用者：理解採用與培育應用',intro:'以適當的資料與解釋範圍，支持校級分析、成果整理與制度規劃。',items:['入口：校級成果、政策與培育問題','支持：校級報表、年度成果摘要、資料應用與分析','用途：辨識可回答的問題，形成決策與後續工作參考']}};
function setRole(key){const r=roles[key];byId('role-panel').innerHTML=`<h3>${r.title}</h3><p>${r.intro}</p><ul>${r.items.map(x=>`<li>${x}</li>`).join('')}</ul>`;document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===key)));}
if(byId('role-panel')){setRole('student');document.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>setRole(b.dataset.role)));}
const stages={initial:['初始作答 / INITIAL','在原有情境與資訊下，先取得作答者會怎麼做、為什麼這樣做的回答。','保留原始回答，作為初始判斷的獨立證據。'],follow:['反應取證 / A','依預定規則追問具體行動、理由與其他考量，釐清原有回答。','追問所得內容獨立保留，方便回查判斷依据與證據缺口。'],support:['資訊／支持介入 / B','依題目設計提供預定的新資訊或有限支持，觀察條件改變後的判斷。','明確記錄介入內容及條件，區分追問和新增資訊。'],post:['介入後作答 / POST','取得情境更新後的回答，觀察判斷維持、補充或調整。','初始與介入後回答分開解釋，不覆寫先前歷程。']};
function setStage(key){const s=stages[key];byId('stage-panel').innerHTML=`<h3>${s[0]}</h3><p>${s[1]}</p><p><strong>留下什麼：</strong>${s[2].replace('依据','依據')}</p>`;document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stage===key)));}
if(byId('stage-panel')){setStage('initial');document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>setStage(b.dataset.stage)));}
const steps=[
{label:'01 / 情境',title:'家長希望你介入資源班學習',body:'<p>你是國小導師。班上一位學生部分時間接受資源班服務。家長向你反映：孩子在資源班沒有學到東西，希望你協助處理。</p><p>此刻，你掌握的是家長的說法。你會先回應什麼？還需要向誰確認哪些資訊？</p>',prompt:'寫下你目前想先確認的問題（僅留在此頁，不傳送）：'},
{label:'02 / 不同觀點',title:'同一件事，出現三種敘述',body:'<ul><li><strong>家長：</strong>孩子在資源班沒有學到東西。</li><li><strong>資源班教師：</strong>學生上課聊天，沒有完成任務。</li><li><strong>學生：</strong>課程很無聊。</li></ul><p>這些說法各自透露了什麼？目前仍無法確認什麼？</p>',prompt:'把一個評價改成可以觀察或追問的問題：'},
{label:'03 / 釐清資訊',title:'保留至少兩種可能解釋',body:'<p>「無聊」可能與難度、活動方式、成功經驗或互動感受有關。這些目前都是需要確認的可能性。</p><p>先詢問具體任務、發生時機與學生經驗，再和不同角色的觀察互相對照。</p>',prompt:'你會提出哪兩個具體問題？'},
{label:'04 / 支持行動',title:'把問題轉成可以試行的支持',body:'<ul><li>先回應家長的關切，保留對原因的判斷。</li><li>向資源班教師與學生蒐集具體資訊。</li><li>整合觀察，討論小範圍、可試行的支持。</li><li>約定觀察重點與回饋時間。</li></ul><p>選擇支持時，說明它要回應的需求與你希望觀察的變化。</p>',prompt:'寫下一項支持做法，以及要觀察什麼變化：'},
{label:'05 / 設計回看',title:'你剛走過的，是課程的學習路徑',body:'<p>案例從單方說法逐步展開不同觀點，讓學習者辨識已知與未知，再把解釋轉成提問與支持行動。</p><p>這個展示依原課程整理與縮寫。完整版本包含兩個案例、討論活動、處理優先序與後續協作。</p><p><a class="text-link" href="reader.html?id=course-latest">閱讀完整 32 頁課程 ↗</a></p>'}
];
let step=0;const reflections={};
function saveReflection(){const t=byId('reflection');if(t)reflections[step]=t.value;}
function renderCase(){const s=steps[step];byId('case-step-label').textContent=s.label;byId('case-content').className='case-content';byId('case-content').innerHTML=`<h3>${s.title}</h3>${s.body}${s.prompt?`<label class="reflection-label" for="reflection">${s.prompt}</label><textarea class="reflection" id="reflection" maxlength="1500" placeholder="你可以先想一想，也可以直接繼續。"></textarea>`:''}`;if(byId('reflection'))byId('reflection').value=reflections[step]||'';byId('case-prev').disabled=step===0;byId('case-next').textContent=step===4?'重新體驗 ↻':'繼續展開 →';}
if(byId('case-content')){renderCase();byId('case-next').addEventListener('click',()=>{saveReflection();step=step===4?0:step+1;renderCase();});byId('case-prev').addEventListener('click',()=>{saveReflection();step=Math.max(0,step-1);renderCase();});}
const id=new URLSearchParams(location.search).get('id');const doc=docs.find(d=>d.id===id);
if(byId('reader-title')){
 if(!doc){byId('reader-title').textContent='請選擇要閱讀的資料';byId('reader-frame').innerHTML='<p><a href="resources.html">回完整資料頁選擇文件 →</a></p>';}
 else{byId('reader-title').textContent=doc.title;document.title=doc.title+'｜葉瑋琳';byId('reader-meta').textContent=doc.date;byId('reader-actions').replaceChildren();}
}
})();
