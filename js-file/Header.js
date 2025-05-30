class Header
{
    constructor()
    {
        const pathname = window.location.pathname.toLowerCase();
        let path = './portfolio';

        if (pathname.includes("portfolio.html") && pathname.endsWith("portfolio.html"))
        {
            path = '';
        } else
        {
            path = './portfolio.html'
        };

        const html = `<nav class="container">
            <a href="./index.html" class="logo"><img src="./imgs/logo_rades.png" alt=""></a>
            <div class="links">
                <a href="${path}#hero" class="link-nav">Home</a>
                <a href="${path}#about" class="link-nav">About</a>
                <a href="${path}#services" class="link-nav">Services</a>
                <a href="${path}#skills" class="link-nav">Tech Stack</a>
                <a href="./projects.html" class="link-nav">Projects</a>
                <a href="${path}#contact" class="link-nav">Contact</a>
            </div>
         <div class="icons">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100040317048909&amp;locale=ar_AR">
                <i class="fa-brands fa-facebook-f"></i></a>
                <a target="_blank" href="https://www.instagram.com/weal.yossef/"><i class="fa-brands fa-instagram"></i></a>
                <a target="_blank" href="https://wa.link/u33dav"><i class="fa-brands fa-whatsapp"></i></a>
                <a target="_blank" href="https://www.behance.net/yossefweal"><i class="fa-brands fa-behance"></i></a>
                <span class="icon_menue"><i class="fa-solid fa-bars-staggered"></i></span>
            </div>
        </nav>`;

        const header = document.querySelector('#header');
        header.innerHTML = '';
        header.insertAdjacentHTML('afterbegin', html);
    }
}

export default Header;