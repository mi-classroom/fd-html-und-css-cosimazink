const button = document.querySelector("[data-js-menu-button]");
const menu = document.querySelector("[data-js-menu]");

button.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    button.classList.toggle("is-active");
});

document.addEventListener("DOMContentLoaded", function() {
    const menuLinks = document.querySelectorAll("nav ul li a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Verhindere das Standardverhalten des Links
            const url = this.getAttribute("href");
            window.location.href = url; // Weiterleitung zur angegebenen URL
        });
    });
});