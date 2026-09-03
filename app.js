
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const toggle = document.getElementById("toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {

    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
        toggle.textContent = "✕";
    } else {
        toggle.textContent = "☰";
    }

});


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

const navLinks = document.querySelectorAll("#nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        toggle.textContent = "☰";

    });

});


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   CONTACT FORM
========================================================= */

const form = document.getElementById("form");
const message = document.getElementById("message");

form.addEventListener("submit", event => {

    event.preventDefault();

    message.textContent =
        "Thank you. Your consultation request has been received.";

    form.reset();

});


/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();

