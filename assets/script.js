document.addEventListener("DOMContentLoaded",()=>{
  if(window.lucide) lucide.createIcons();
  document.querySelectorAll(".year").forEach(el=>el.textContent=new Date().getFullYear());
  const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
  if(menu&&nav) menu.addEventListener("click",()=>{nav.classList.toggle("open");menu.classList.toggle("open")});
  // Full-width hero slider
  const slides=[...document.querySelectorAll(".hero-slide")], dots=[...document.querySelectorAll(".dot")];
  let current=0, timer;
  function showSlide(n){if(!slides.length)return;current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("active",i===current));dots.forEach((d,i)=>d.classList.toggle("active",i===current));}
  function restart(){clearInterval(timer);if(slides.length>1)timer=setInterval(()=>showSlide(current+1),6000)}
  document.querySelector(".slide-next")?.addEventListener("click",()=>{showSlide(current+1);restart()});
  document.querySelector(".slide-prev")?.addEventListener("click",()=>{showSlide(current-1);restart()});
  dots.forEach((d,i)=>d.addEventListener("click",()=>{showSlide(i);restart()}));restart();
  // Scroll reveals
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
  // Contact form opens a prefilled WhatsApp message. No data is stored.
  document.querySelector("#contactForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Hello Patient Care Bureau,%0AName: ${encodeURIComponent(f.get("name"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0AService: ${encodeURIComponent(f.get("service"))}%0AMessage: ${encodeURIComponent(f.get("message"))}`;window.open("https://wa.me/918459810728?text="+msg,"_blank")});
  // Service enquiry cart
  const cart=document.querySelector("#enquiryCart"), fab=document.querySelector("#cartFab");
  if(cart&&fab){
    let selected=[];
    const count=()=>{document.querySelector("#cartCount").textContent=selected.length;document.querySelector("#fabCount").textContent=selected.length};
    function render(){const box=document.querySelector("#cartItems");box.innerHTML=selected.length?selected.map((s,i)=>`<div class="cart-item"><span>${s}</span><button data-remove="${i}" aria-label="Remove ${s}"><i data-lucide="x"></i></button></div>`).join(""):'<p class="cart-empty">Your selected services will appear here.</p>';box.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{selected.splice(+b.dataset.remove,1);render();count()}));if(window.lucide)lucide.createIcons();count()}
    document.querySelectorAll(".add-service").forEach(b=>b.addEventListener("click",()=>{if(!selected.includes(b.dataset.service)){selected.push(b.dataset.service);render()}cart.classList.add("open");}));
    fab.addEventListener("click",()=>cart.classList.toggle("open"));document.querySelector("#cartClose")?.addEventListener("click",()=>cart.classList.remove("open"));
    document.querySelector("#sendEnquiry")?.addEventListener("click",()=>{if(!selected.length){cart.classList.remove("open");return}const msg="Hello Patient Care Bureau, I would like to enquire about:%0A• "+selected.map(encodeURIComponent).join("%0A• ");window.open("https://wa.me/918459810728?text="+msg,"_blank")});
  }
});