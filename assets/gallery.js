// Full-screen photo viewer shared by the homepage and the vehicle pages.
// Needs the <dialog id="gallery"> markup on the page.
let gal=[],gi=0;
function openGallery(list,title,start){gal=list||[];if(!gal.length)return;gi=start||0;galTitle.textContent=title;showPhoto();gallery.showModal()}
function showPhoto(){
 galImg.src=gal[gi];galImg.alt=`${galTitle.textContent} – ${document.documentElement.lang=="en"?"photo":"foto"} ${gi+1}`;galCount.textContent=`${gi+1} / ${gal.length}`;
 document.querySelectorAll(".gal-nav").forEach(b=>b.hidden=gal.length<2);
 [gi+1,gi-1].forEach(k=>{if(gal.length>1)new Image().src=gal[(k+gal.length)%gal.length]}) // preload neighbours
}
function step(d){gi=(gi+d+gal.length)%gal.length;showPhoto()}
gallery.addEventListener("keydown",e=>{if(e.key=="ArrowRight")step(1);if(e.key=="ArrowLeft")step(-1)});
gallery.addEventListener("click",e=>{if(e.target==gallery)gallery.close()});
let touchX=null;
gallery.addEventListener("touchstart",e=>touchX=e.touches[0].clientX,{passive:true});
gallery.addEventListener("touchend",e=>{if(touchX==null)return;const dx=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(dx)>40)step(dx<0?1:-1)});
