document.addEventListener("DOMContentLoaded", () => {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP or ScrollTrigger not loaded");
        document.body.style.opacity = "1"; // Fallback
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Helper to safely get elements
    const safeSelect = (sel) => {
        const els = document.querySelectorAll(sel);
        return els.length > 0 ? gsap.utils.toArray(els) : [];
    };

    /* NAV INTRO */
    const nav = document.querySelector(".navbar");
    if(nav) {
        gsap.from(nav, {
            y: -80,
            opacity: 0,
            duration: 1,
            clearProps: "all" // Ensure it stays visible after animation
        });
    }

    /* HERO ANIMATION */
    gsap.from(safeSelect(".hero-title"), {
        y: 80,
        opacity: 0,
        duration: 1.2,
        clearProps: "all"
    });

    gsap.from(safeSelect(".hero-sub"), {
        y: 40,
        opacity: 0,
        delay: .3,
        clearProps: "all"
    });

    gsap.from(safeSelect(".hero-desc"), {
        y: 30,
        opacity: 0,
        delay: .5,
        clearProps: "all"
    });

    const ctaLinks = safeSelect(".hero-cta a");
    if(ctaLinks.length > 0) {
        gsap.from(ctaLinks, {
            y: 20,
            opacity: 0,
            stagger: .2,
            delay: .7,
            clearProps: "all"
        });
    }

    /* SECTION REVEAL */
    gsap.utils.toArray(".section").forEach(sec => {
        const children = sec.querySelectorAll(".card, .project-card, .skill"); // Removed .tech
        if (children.length > 0) {
            gsap.from(gsap.utils.toArray(children), {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 85%" 
                },
                y: 60,
                opacity: 0, 
                stagger: 0.15,
                duration: .8,
                clearProps: "y,opacity" 
            });
        }
    });

    /* SKILL METERS */
    document.querySelectorAll(".meter div").forEach(bar => {
        gsap.to(bar, {
            width: bar.dataset.width,
            duration: 1.4,
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            }
        });
    });

    /* PARALLAX BG */
    gsap.to(".hero-bg", {
        y: 120,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            scrub: true
        }
    });

    /* MARQUEE ANIMATION */
    const row1 = document.querySelector("#marquee-left .tech-track");
    const row2 = document.querySelector("#marquee-right .tech-track");

    if (row1 && row2) {
        // Row 1: Scroll Left
        const t1 = gsap.to(row1, {
            x: "-50%",
            duration: 20,
            ease: "none",
            repeat: -1
        });

        // Row 2: Scroll Right (Start at -50% and move to 0 for continuous look)
        gsap.set(row2, { x: "-50%" });
        const t2 = gsap.to(row2, {
            x: "0%",
            duration: 20,
            ease: "none",
            repeat: -1
        });

        // Slow motion on hover
        const wrapper = document.querySelector(".tech-marquee-wrapper");
        if(wrapper) {
            wrapper.addEventListener("mouseenter", () => {
                gsap.to([t1, t2], { timeScale: 0.1, duration: 0.5 });
            });
            wrapper.addEventListener("mouseleave", () => {
                gsap.to([t1, t2], { timeScale: 1, duration: 0.5 });
            });
        }
    }

    /* MOBILE MENU */
    const burger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if(burger && navLinks) {
        burger.onclick = () => navLinks.classList.toggle("open");
    }

    /* THEME TOGGLE */
    const themeCheckbox = document.getElementById("themeToggleCheckbox");
    const html = document.documentElement;
    
    // Check saved theme
    // Default is Light. 
    // SVG Logic: Checked = Show Moon (Dark Mode). Unchecked = Show Sun (Light Mode).
    // So if theme is 'dark', we need to check the box and set data-theme="dark".
    // If theme is 'light' (or null), leave unchecked (Default).

    const savedTheme = localStorage.getItem("theme");
    
    if(savedTheme === "dark") {
        html.setAttribute("data-theme", "dark");
        if(themeCheckbox) themeCheckbox.checked = true; 
    } else {
        // Default Light
        if(themeCheckbox) themeCheckbox.checked = false;
        html.removeAttribute("data-theme"); // Ensure no residual attribute
    }

    if(themeCheckbox) {
        themeCheckbox.addEventListener("change", () => {
             if(themeCheckbox.checked) {
                // User Checked -> Switch to Dark
                html.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
             } else {
                // User Unchecked -> Switch to Light
                html.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
             }
        });
    }

});

/* PROGRESS BAR */
window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const pb = document.getElementById("progressBar");
    if(pb) pb.style.width = scrolled + "%";
});
