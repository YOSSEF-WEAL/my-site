let heder = document.querySelector("header");

window.onscroll = function ()
{
    if (this.scrollY >= 50)
    {
        heder.classList.add("active");
    } else
    {
        heder.classList.remove("active");
    }
}

let nav_links = document.querySelector(".links");
function Open_colose_menu()
{
    nav_links.classList.toggle("active");
}

let links_heder = document.querySelector(".links");
let link_nav = document.querySelectorAll(".link-nav");
function close_nav()
{
    nav_links.classList.toggle("active");

}
