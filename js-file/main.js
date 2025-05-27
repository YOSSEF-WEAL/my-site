import Header from "./Header.js";


new Header();

let nav_links = document.querySelector(".links");
const nav_linkss = document.querySelectorAll(".link-nav");
const iconMenue = document.querySelector('.icon_menue');
let isMuneOpen = false;
nav_linkss.forEach(link => link.addEventListener('click', closeMune))


function closeMune()
{
    nav_links.classList.remove("active");
    iconMenue.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    isMuneOpen = false;
}

function openMune()
{
    nav_links.classList.add("active");
    iconMenue.innerHTML = '<i class="fa-solid fa-x"></i>';
    isMuneOpen = true;
}

iconMenue.addEventListener('click', () => isMuneOpen === false ? openMune() : closeMune());



let heder = document.querySelector("header");
let span_btn_up = document.querySelector(".up");

window.onscroll = function ()
{
    if (this.scrollY >= 50)
    {
        heder.classList.add("activeHeader");
    } else
    {
        heder.classList.remove("activeHeader");
    }

    if (this.scrollY >= 100)
    {
        span_btn_up.classList.add("visible");
    } else
    {
        span_btn_up.classList.remove("visible");
    }
};

span_btn_up.onclick = function ()
{
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};


// Select all navigation links
const navLinks = document.querySelectorAll('.link-nav');

// Add smooth scrolling behavior
navLinks.forEach(link =>
{
    link.addEventListener('click', function (event)
    {
        const targetId = this.getAttribute('href').slice(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        // Check if the target section exists in the current page
        if (targetSection)
        {
            event.preventDefault(); // Prevent default anchor behavior

            const offset = 120; // Margin offset
            const sectionPosition = targetSection.offsetTop - offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth' // Smooth scrolling
            });
        }
    });
});