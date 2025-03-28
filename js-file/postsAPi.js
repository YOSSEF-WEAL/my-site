const countriesContainer = document.querySelector('.countriess');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
let numberOfPage = 8;

const renderSpinner = function (parintEl)
{
    const markup = `
<style>
.spiner_loding{
    display: flex;
    align-items: center;
    justify-content: center;
}
svg {
 width: 3.25em;
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: #fff;
 stroke-width: 2;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}

</style>
<div class="spiner_loding">
<svg viewBox="25 25 50 50">
  <circle r="20" cy="50" cx="50"></circle>
</svg>
</div>
        `;
    parintEl.innerHTML = '';
    parintEl.insertAdjacentHTML('afterbegin', markup);

}
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

async function fetchPosts(selectedCategories = [], numberPage = numberOfPage)
{
    try
    {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = `Loading...`;

        renderSpinner(countriesContainer);
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=${numberPage}`);
        const data = await response.json();
        countriesContainer.innerHTML = '';

        data.forEach(post =>
        {
            const postCategories = post.categories.map(catId => categoryMap[catId] || "غير معروف");

            if (selectedCategories.length > 0 && !post.categories.some(catId => selectedCategories.includes(catId.toString())))
            {
                return;
            }


            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No Image";

            const projectLink = post.acf?.link_progect || "";
            const Design_link = post.acf?.Design_link || "";
            const Repositories_link = post.acf?.Repositories_link || "";
            const wordpress = post.acf?.wordpress || "";



            const excerptText = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            const words = excerptText.split(" ");
            const truncatedExcerpt = words.length > 10 ? words.slice(0, 10).join(" ") + " ..." : excerptText;


            const html = `
                <div class="projec_box" data-aos="fade-up">
                    <img loading="lazy" src="${imageUrl}" alt="">
                    <div class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a href="./post.html?id=${post.id}">${post.title.rendered}</a>
                        <p>${truncatedExcerpt}</p>
                         <div class="links">
                    <a target="_blank" href="${projectLink}" class="link"> <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    <a target="_blank" href="${Repositories_link}" class="link "><i class="fa-brands fa-github"></i></a>
                    <a target="_blank" href="${Design_link}" class="link"> <i class="fa-brands fa-behance"></i></a>
                    <a target="_blank" href="${wordpress}" class="link"><i class="fa-brands fa-wordpress"></i></a>

                    </div>
                    <a  href="./post.html?id=${post.id}" class="readMore">Read More</a>

                    </div>
                </div>
            `;

            countriesContainer.insertAdjacentHTML('beforeend', html);
        });

        await document.querySelectorAll(".link").forEach((a) =>
        {
            if (a.href === window.location.href || a.href === `${window.location.href}#`)
            {
                a.style.display = 'none';
            }
        });

    } catch (error)
    {
        console.error(`❌ Error fetching posts: ${error}`);
    } finally
    {

        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = `Load More Projects`;
    }
}



const filtersContainer = document.querySelector('.filters');
async function renderCategoryFilters()
{
    renderSpinner(filtersContainer);
    const categoryMap = await fetchCategories();


    filtersContainer.innerHTML = '';

    Object.entries(categoryMap).forEach(([id, name]) =>
    {
        const label = document.createElement('label');
        label.textContent = name;
        label.classList.add('labelFilter');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = id;
        checkbox.id = `cat-${id}`;
        checkbox.classList.add('checkFilter');
        label.prepend(checkbox);

        filtersContainer.appendChild(label);
    });

    filtersContainer.addEventListener('change', () =>
    {
        const selectedCategories = Array.from(filtersContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        fetchPosts(selectedCategories);
    });
}

renderCategoryFilters();
fetchPosts();



const pagination = function ()
{
    let previousCount = 0;

    loadMoreBtn.addEventListener('click', async function ()
    {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = `Loading...`;

        try
        {
            numberOfPage += 4;
            await fetchPosts([], numberOfPage);

            let currentCount = document.querySelectorAll('.projec_box').length;

            if (currentCount === previousCount)
            {
                loadMoreBtn.textContent = `No More Projects`;
                loadMoreBtn.disabled = true;
                return;
            }

            previousCount = currentCount;

        } catch (error)
        {
            console.error(error);
        }

        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = `Load More Projects`;
    });
};

pagination();
