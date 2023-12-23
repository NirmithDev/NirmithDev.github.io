let menu = document.querySelector('.menu-icon')
let navBar = document.querySelector('.navbar')

let getReview = reviews
let header = document.querySelector('header')
let scrollTop = document.querySelector('.scroll-top')

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


