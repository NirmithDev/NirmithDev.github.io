let menu = document.querySelector('.menu-icon')
let navBar = document.querySelector('.navbar')
let a= document.getElementById("all")
let b= document.getElementById("front")
let c= document.getElementById("full")
let d= document.getElementById("python")
let e= document.getElementById("certs")
let f= document.getElementById("oop")
let a1= document.querySelector(".all")
let b1= document.querySelector(".front")
let c1= document.querySelector(".full")
let d1= document.querySelector(".python")
let e1= document.querySelector(".certs")
let f1= document.querySelector(".oop")
let getData =  datas
let getReview = reviews
let header = document.querySelector('header')
let scrollTop = document.querySelector('.scroll-top')

const filterButtons = document.querySelector("#filter-btns").children;

let spinnerWrapper = document.getElementById("preloader");
window.addEventListener("load", function () {
    spinnerWrapper.style.display = "none";
    menu.onclick = () =>{
        menu.classList.toggle('move');
        navBar.classList.toggle('open-menu')
    }
    this.window.onscroll = () =>{
        menu.classList.remove('move');
        navBar.classList.remove('open-menu')
    }
    getAllData()

    /*testimonials*/
    var swiper=new Swiper(".reviews-content",{
        spaceBetween:30,
        centeredSlides:true,
        autoplay:{
            delay:5000,
            disableonInteraction:true,
        },
        pagination:{
            el:" .swiper-pagination",
            clickable:true,
        },
    });
    getReviews()
    validate()
    this.window.addEventListener('scroll',function(){
        header.classList.toggle("header-active",this.window.scrollY>0)
    })
    this.window.addEventListener('scroll',function(){
        scrollTop.classList.toggle("scroll-active",this.window.scrollY>=300)
    })
})

function validate(){
    let name=document.querySelector('.name')
    let email= document.querySelector('.email')
    let msg=document.querySelector('.message')
    let send = document.querySelector('.send-btn')

    send.addEventListener('click',(e)=>{
        e.preventDefault();
        if(name.value==""|| email.value=="" || msg.value==""){
            emptyerror();
        }
        else{
            sendmail(name.value,email.value,msg.value);
            success();
            name.value=''
            email.value=''
            msg.value=''
        }
    })
}

function sendmail(name,email,msg){
    emailjs.send("service_o5r4fdj","template_7faqv6i",{
        from_name: email,
        to_name: "Nirmith",
        message: msg,
    });
}

function success(){
    swal({
        title:"Success",
        text:"Your email has been sent and is on the way!🛫",
        icon:"success",
    })

}

function emptyerror(){
    swal({
        title:"Oh no......",
        text: "Fields cannot be empty!",
        icon: "error",
    })
}

function getReviews(){
    let at = document.getElementById("swip")
    re=''
    for(i=0;i<getReview.length;i++){
        re+=`
    <div class="swiper-slide">
        <div class="review-box">
            <i class="bx bxs-quote-right"></i>
            <p class="review-text">
                ${getReview[i].Testimonial}
            </p>
            <div class="review-profile">
                <h2>${getReview[i].Name}</h2>
                <span>${getReview[i].Organization} - ${getReview[i].Position}</span>
                <div class="social" style="color: white;">
                    <a href="${getReview[i].LinkedIn}"><i class='bx bxl-linkedin'></i></a>
                    <a href="mailto:${getReview[i].Mail}"><i class='bx bxs-envelope'></i></a>
                </div>
            </div>
        </div>
    </div>
        `
    }
    at.innerHTML=re
}

function getAllData(){
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    a1.classList.add('active')
    for(i=0;i<getData.length;i++){
        out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
    }
    te.innerHTML = out
}

a.addEventListener("click",()=>{
    getAllData()
    a1.classList.add('active')
})

b.addEventListener("click",()=>{
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    for(i=0;i<getData.length;i++){
        if(getData[i].iType.includes("Front")){
            out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
        }
    }
    te.innerHTML = out
    b1.classList.add('active')
})

c.addEventListener("click",()=>{
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    for(i=0;i<getData.length;i++){
        if(getData[i].iType.includes("Full")){
            out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
        }
    }
    te.innerHTML = out
    c1.classList.add('active')
})

d.addEventListener("click",()=>{
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    for(i=0;i<getData.length;i++){
        if(getData[i].iType.includes("Py")){
            out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
        }
    }
    te.innerHTML = out
    d1.classList.add('active')
})

e.addEventListener("click",()=>{
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    for(i=0;i<getData.length;i++){
        if(getData[i].iType.includes("Certs")){
            out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
        }
    }
    te.innerHTML = out
    e1.classList.add('active')
})

f.addEventListener("click",()=>{
    let te=document.getElementById("portfolio-gallery")
    out = ''
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active")
    }
    for(i=0;i<getData.length;i++){
        if(getData[i].iType.includes("OO")){
            out+=`

        <div class="item" data-id="Certs" style="margin: 0 auto;">
            <div class="inner">
            <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
            <div class="portfolio-overlay">     
                <h2>${getData[i].iName}</h2>    
                <a target="_blank" href=${getData[i].iLink}>
                    <i class= 'bx bx-link-alt'></i>    
                </a>
            </div>
            </div>
        </div>

        `
        }
    }
    te.innerHTML = out
    f1.classList.add('active')
})