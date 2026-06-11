const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", (e) => {

    mouse.x = e.x;
    mouse.y = e.y;

});

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < 100){

            this.x -= dx / 15;
            this.y -= dy / 15;

        }

        if(this.x > canvas.width) this.x = 0;
        if(this.x < 0) this.x = canvas.width;

        if(this.y > canvas.height) this.y = 0;
        if(this.y < 0) this.y = canvas.height;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00ffff";

        ctx.fill();

    }

}

const particles = [];

for(let i = 0; i < 250; i++){

    particles.push(new Particle());

}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(animate);

}

animate();

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

/* ========================= */
/* PHOTO SLIDER */
/* ========================= */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changePhoto(){

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    slides[currentSlide].classList.add("active");

}

setInterval(changePhoto, 3000);
/* ========================= */
/* MOUSE LIGHT EFFECT */
/* ========================= */

const resumeBox = document.querySelector(".resume-box");

document.addEventListener("mousemove",(e)=>{

    let x = e.clientX - resumeBox.getBoundingClientRect().left;
    let y = e.clientY - resumeBox.getBoundingClientRect().top;

    resumeBox.style.setProperty("--x", x + "px");
    resumeBox.style.setProperty("--y", y + "px");

});
/* ========================= */
/* SCROLL REVEAL SYSTEM */
/* ========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    for(let i = 0; i < reveals.length; i++){

        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;

        let elementVisible = 150;

        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }

    }

}

window.addEventListener("scroll", revealOnScroll);
/* ========================= */
/* PARALLAX MOUSE EFFECT */
/* ========================= */

document.addEventListener("mousemove",(e)=>{

    let x = (window.innerWidth / 2 - e.clientX) / 25;
    let y = (window.innerHeight / 2 - e.clientY) / 25;

    const left = document.querySelector(".resume-left");
    const right = document.querySelector(".resume-right");

    if(left && right){

        left.style.transform = `translateY(${y}px) translateX(${x}px)`;
        right.style.transform = `translateY(${-y}px) translateX(${-x}px)`;

    }

});
/* ========================= */
/* 3D TILT PHOTO FRAME */
/* ========================= */

const frame = document.querySelector(".photo-frame");

document.addEventListener("mousemove",(e)=>{

    let x = (window.innerWidth / 2 - e.clientX) / 30;
    let y = (window.innerHeight / 2 - e.clientY) / 30;

    if(frame){

        frame.style.transform = `
            perspective(1000px)
            rotateY(${x}deg)
            rotateX(${y}deg)
        `;

    }

});