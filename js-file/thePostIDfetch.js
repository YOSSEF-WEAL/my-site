import RenderSpinner from './renderSpinner.js';

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const countriesContainer = document.querySelector('.countriess');

async function fetchCategories()
{
    const response = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/categories");
    const categories = await response.json();
    const categoryMap = {};
    categories.forEach(cat =>
    {
        categoryMap[cat.id] = cat.name;
    });
    return categoryMap;
}

async function fetchPosts()
{
    try
    {
        new RenderSpinner(countriesContainer);
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts/${postId}`);
        const data = await response.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content.rendered, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        const imageUrls = Array.from(imgElements).map(img => img.src);

        const filteText = function (allContent)
        {
            const parser = new DOMParser();
            const doc = parser.parseFromString(allContent, 'text/html');
            return doc.body.textContent || "";
        };

        const postCategories = data.categories.map(catId => categoryMap[catId] || "غير معروف");

        const projectLink = data.acf?.link_progect || "";
        const Design_link = data.acf?.Design_link || "";
        const Repositories_link = data.acf?.Repositories_link || "";
        const selectd_technologys = data.acf?.selectd_technologys || "";
        const wordpress = data.acf?.wordpress || "";



        const html = `
            <div class="projec_box ">
                <div class='imges'>
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            ${imageUrls.map((url, index) =>
        {
            return `
                                    <div class="swiper-slide"> 
                                        <img loading="lazy" class="" src="${url}" alt="slide-${index}">
                                    </div>
                                `;
        }).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
                <div class="text">
                    <h4><span>${postCategories.join(", ")}</span></h4>
                    <a target="_blank" href="${projectLink}">${data.title.rendered}</a>
                    <p>${filteText(data.content.rendered)}</p>
                    <h3>Technologys</h3>
                    <ui class="technologys">
                        ${selectd_technologys.map((tec) => `<li class="technology">
                            <img class="imgTec" src="${tec}" alt="">
                        </li>`).join('')}
                    </ui>
                    <h3>Links</h3>
                    <div class="links">
                        ${projectLink ? `
                            <a target="_blank" href="${projectLink}" class="link"> 
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>` : ''}
                        ${Repositories_link ? `
                            <a target="_blank" href="${Repositories_link}" class="link ">
                                <i class="fa-brands fa-github"></i>
                            </a>` : ''}
                        ${Design_link ? `
                            <a target="_blank" href="${Design_link}" class="link"> 
                                <i class="fa-brands fa-behance"></i>
                            </a>` : ''}
                        ${wordpress ? `
                            <a target="_blank" href="${wordpress}" class="link">
                                <i class="fa-brands fa-wordpress"></i>
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `;




        countriesContainer.innerHTML = '';
        countriesContainer.insertAdjacentHTML('afterbegin', html);

        // Initialize Swiper after adding dynamic content
        new Swiper(".mySwiper", {
            direction: "horizontal",
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            mousewheel: true,
        });

    } catch (error)
    {
        console.error(`Error fetching post data ❌: ${error} `);
    }
}

fetchPosts();



