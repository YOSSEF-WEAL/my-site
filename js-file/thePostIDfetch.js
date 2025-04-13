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
        // console.log(data);

        // ================== 
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content.rendered, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        const imageUrls = Array.from(imgElements).map(img => img.src);
        // ================== 
        // === filter text data
        const filteText = function (allContent)
        {
            const parser = new DOMParser();
            const doc = parser.parseFromString(allContent, 'text/html');
            return doc.body.textContent || "";
        };

        // ================== 
        const postCategories = data.categories.map(catId => categoryMap[catId] || "غير معروف");

        const projectLink = data.acf?.link_progect || "";
        const Design_link = data.acf?.Design_link || "";
        const Repositories_link = data.acf?.Repositories_link || "";
        const selectd_technologys = data.acf?.selectd_technologys || "";
        const wordpress = data.acf?.wordpress || "";



        const html = `
                    <div class="projec_box ">
                     <div class="butnSlider">
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
<i class="fa-solid fa-chevron-left"></i>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
<i class="fa-solid fa-chevron-right"></i>  </button>
  </div>
     <div class='imges'>
<div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
  <div class="carousel-inner">
               ${imageUrls.map((url, index) =>
        {
            return `
                       
                       <div class="carousel-item  ${index === 0 ? 'active' : ''}">
                            <img loading="lazy" class="d-block w-100" src="${url}" alt="">
                     </div>
                        `;
        }).join('')}
    
  </div>
 
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
                              </li>
                                `).join('')}   
                            </ui>
                            <h3>Links</h3>
                            <div class="links">
                            <a target="_blank" href="${projectLink}" class="link"> <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                            <a target="_blank" href="${Repositories_link}" class="link "><i class="fa-brands fa-github"></i></a>
                            <a target="_blank" href="${Design_link}" class="link"> <i class="fa-brands fa-behance"></i></a>
                            <a target="_blank" href="${wordpress}" class="link"><i class="fa-brands fa-wordpress"></i></a>

                        </div>
                    </ div>
                `;




        countriesContainer.innerHTML = '';
        countriesContainer.insertAdjacentHTML('afterbegin', html);

        await document.querySelectorAll(".link").forEach((a) =>
        {
            if (a.href === window.location.href || a.href === `${window.location.href}#`)
            {
                a.style.display = 'none';
            }

        });



    } catch (error)
    {
        console.error(`Error fetching post data ❌: ${error} `);
    }
}
fetchPosts();




