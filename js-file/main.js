let nav_links = document.querySelector(".links");
function Open_colose_menu()
{
    nav_links.classList.toggle("active");
};


let links_heder = document.querySelector(".links");
let link_nav = document.querySelectorAll(".link-nav");
function close_nav()
{
    nav_links.classList.toggle("active");

};

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


function removeAOSLinkOnMobile()
{
    if (window.innerWidth <= 768)
    {
        let aosLink = document.querySelector('link[href="https://unpkg.com/aos@2.3.1/dist/aos.css"]');
        if (aosLink)
        {
            aosLink.parentNode.removeChild(aosLink);
        }
    }
}

window.addEventListener('load', removeAOSLinkOnMobile);
window.addEventListener('resize', removeAOSLinkOnMobile);


// Spinner
const spinner = document.querySelector('.spinner-wrapper')
window.addEventListener('load', () =>
{
    spinner.style.opacity = '0';
    setTimeout(() =>
    {
        spinner.style.display = 'none';
    }, 100);
})
