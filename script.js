gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

// Debounce function to limit the frequency of scroll updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update ScrollTrigger on Lenis scroll, but debounced
lenis.on('scroll', debounce(() => {
    ScrollTrigger.update();
}, 100));

requestAnimationFrame(raf)
var h1 = document.querySelector("#span1")
var h1Text = document.querySelector("#span1").textContent;
var split = h1Text.split("");
var clutter = " "
split.forEach(function(e){
    clutter += `<span>${e}</span>`
})
h1.innerHTML = clutter
gsap.from("#span1 span",{
    y:55,
    opacity:0,
    duration:1,
    delay:0.5,
    stagger:0.05
})
gsap.from("nav a",{
    opacity:0,
    duration:1,
    y:25,
})
gsap.from(".about h1",{
    opacity:0,
    duration:1,
    y:44,
    scrollTrigger:{
        trigger:".about",
        start:"top 70%",
        end:"bottom center",
        scrub:true,
    }
})
// Apply scroll animation to all text elements
gsap.utils.toArray(".text p, .footer p, .outro p, .about p, .product p, .hero-content p, .client-text p, .about-text p,.product-filter p").forEach((text) => {
    gsap.from(text, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
        }
    });
});

function createMasks() {
    const imgs = document.querySelectorAll(".img");
    imgs.forEach((img, imgIndex) => {
    for (let i = 0; i <= 9; i++){
    const mask = document.createElement("div");
    mask.classList.add("mask", `m-${i}`);
    img.appendChild(mask);
    }
    });
    }
    createMasks();
    const tl = gsap.timeline();
    const imgs = document.querySelectorAll(".img");
    const masks = document.querySelectorAll(".mask");

    imgs.forEach((img, index) => {
        // Set initial state to invisible
        gsap.set(img, { autoAlpha: 0 });

        const imgTl = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none reverse",
                scrub:true,
            }
        });

        imgTl.to(img, {
            duration:2.5,
            autoAlpha: 1, // Fade in the image
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "expo.out"
        });

        const imgMasks = img.querySelectorAll(".mask");
        imgTl.to(imgMasks, {
            duration: 5,
            scale: 1.5,
            filter: "blur(15px)",
            ease: "expo.out",
            stagger: 0.05
        }, "-=1");
    });
    gsap.from(".info-text",{
        opacity:0,
        duration:1,
        x:40,
        scrollTrigger:{
            trigger:".info-text",
            start:"top 70%",
            end:"bottom center",
            scrub:true,
        }
    })