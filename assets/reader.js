(()=>{'use strict';
const root=document.getElementById('reader-frame');
const doc=(window.PORTFOLIO_DOCUMENTS||[]).find(d=>d.id===new URLSearchParams(location.search).get('id'));
if(!root||!doc?.pages?.length)return;
let pageNumber=1,zoom=1,token=0;
root.classList.add('pdf-reader');
root.innerHTML='<div class="pdf-toolbar" aria-label="作品閱讀控制"><button id="pdf-prev" aria-label="上一頁">←</button><label for="pdf-page">頁次</label><input id="pdf-page" type="number" min="1" value="1" aria-label="跳到頁次"><span id="pdf-total">/ '+doc.pages.length+'</span><button id="pdf-next" aria-label="下一頁">→</button><button id="pdf-out" aria-label="縮小">−</button><button id="pdf-in" aria-label="放大">＋</button><span id="pdf-status" role="status" aria-live="polite"></span></div><div class="pdf-canvas-wrap"><div id="pdf-page-frame"><img id="pdf-page-image"></div></div><div id="reader-video"></div><details class="reader-text"><summary>文字閱讀</summary><div id="reader-text-content"></div></details>';
const el=id=>document.getElementById(id),frame=el('pdf-page-frame'),image=el('pdf-page-image');
el('pdf-page').max=doc.pages.length;
function controls(){el('pdf-prev').disabled=pageNumber<=1;el('pdf-next').disabled=pageNumber>=doc.pages.length;el('pdf-in').disabled=zoom>=2;el('pdf-out').disabled=zoom<=.75;}
function render(){const p=doc.pages[pageNumber-1],request=++token;controls();el('pdf-page').value=pageNumber;el('pdf-status').textContent='正在顯示第 '+pageNumber+' 頁…';frame.style.width=(zoom*100)+'%';frame.style.aspectRatio=p.width+'/'+p.height;image.alt=doc.title+'，第 '+pageNumber+' 頁';image.style.transform='translateY(-'+(p.top/p.sheetHeight*100)+'%)';
image.onload=()=>{if(request===token)el('pdf-status').textContent='第 '+pageNumber+' 頁';};image.onerror=()=>{if(request===token)el('pdf-status').textContent='此頁未顯示，請重新選擇頁次或確認上傳的 assets 資料夾。';};image.src=p.src;if(image.complete&&image.naturalWidth)el('pdf-status').textContent='第 '+pageNumber+' 頁';
el('reader-text-content').textContent=p.text||'此頁主要為圖片或圖像內容，請查看上方作品頁面。';const video=el('reader-video');if(doc.video&&pageNumber===doc.video.page){if(!video.querySelector('video'))video.innerHTML='<div class="reader-video"><h3>本頁案例影片</h3><video controls controlslist="nodownload" playsinline preload="metadata" aria-label="原簡報案例影片"><source src="'+doc.video.src+'" type="video/mp4"></video></div>';}else video.replaceChildren();}
el('pdf-prev').onclick=()=>{pageNumber=Math.max(1,pageNumber-1);render();};el('pdf-next').onclick=()=>{pageNumber=Math.min(doc.pages.length,pageNumber+1);render();};el('pdf-page').onchange=()=>{pageNumber=Math.max(1,Math.min(doc.pages.length,Math.floor(Number(el('pdf-page').value)||1)));render();};el('pdf-in').onclick=()=>{zoom=Math.min(2,zoom+.25);render();};el('pdf-out').onclick=()=>{zoom=Math.max(.75,zoom-.25);render();};
render();
})();
