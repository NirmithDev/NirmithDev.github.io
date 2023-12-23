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
let getData =  datas || {}
let header = document.querySelector('header')
let scrollTop = document.querySelector('.scroll-top')

const filterButtons = document.querySelector("#filter-btns").children;

let spinnerWrapper = document.getElementById("preloader");
window.addEventListener("load", function () {
    spinnerWrapper.style.display = "none";
    
    getAllData()

    this.window.addEventListener('scroll',function(){
        header.classList.toggle("header-active",this.window.scrollY>0)
    })
    this.window.addEventListener('scroll',function(){
        scrollTop.classList.toggle("scroll-active",this.window.scrollY>=300)
    })
})

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
function filterItems(type, element) {
    let te = document.getElementById("portfolio-gallery");
    let out = '';

    // Remove 'active' class from all filter buttons
    let filterButtons = [a1, b1, c1, d1, e1, f1];
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
    }

    // Filter items based on the specified type
    for (let i = 0; i < getData.length; i++) {
        if (getData[i].iType.includes(type)) {
            out += `
                <div class="item" data-id="Certs" style="margin: 0 auto;">
                    <div class="inner">
                        <img src=${getData[i].iImage} alt=${getData[i].iName} style="border-radius:10px;">
                        <div class="portfolio-overlay">     
                            <h2>${getData[i].iName}</h2>    
                            <a target="_blank" href=${getData[i].iLink}>
                                <i class='bx bx-link-alt'></i>    
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        
    }

    // Update the gallery content and add 'active' class to the clicked element
    te.innerHTML = out;
    element.classList.add('active');
}

// Add event listeners to each filter button
a.addEventListener("click", () => {
    getAllData();
    filterItems("All", a1);
});

b.addEventListener("click", () => {
    filterItems("Front_end", b1);
});

c.addEventListener("click", () => {
    filterItems("Full_Stack", c1);
});

d.addEventListener("click", () => {
    filterItems("Python", d1);
});

e.addEventListener("click", () => {
    filterItems("Certs", e1);
});

f.addEventListener("click", () => {
    filterItems("OOP", f1);
});
