// Homepage filters. The vehicle cards are rendered by the server (functions/_home.js);
// this only shows/hides them and opens the photo viewer.
const cards=[...document.querySelectorAll(".vehicle")];
function applyFilter(test){
 let shown=0;cards.forEach(el=>{const ok=test(el.dataset);el.hidden=!ok;if(ok)shown++});
 noResults.hidden=shown>0;document.getElementById("inventory").scrollIntoView({behavior:"smooth"});
}
function filterCars(){applyFilter(d=>(!make.value||d.make==make.value)&&(!model.value||d.model==model.value)&&(!year.value||d.year==year.value))}
function pickBrand(b){applyFilter(d=>d.make==b)}
function openCarEl(el){openGallery(JSON.parse(el.dataset.photos),el.dataset.name)}
