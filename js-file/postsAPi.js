const countriesContainer = document.querySelector('.countriess');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const filtersContainer = document.querySelector('.filters');
let currentPage = 1;
const postsPerPage = 8;
let totalPosts = 0;
let selectedCategories = [];

const renderSpinner = function (parentEl)
{
    const markup = `
        <style>
            .spiner_loding { display: flex; align-items: center; justify-content: center; }
            svg { width: 3.25em; transform-origin: center; animation: rotate4 2s linear infinite; }
            circle { fill: none; stroke: #fff; stroke-width: 2; stroke-dasharray: 1, 200; stroke-dashoffset: 0; stroke-linecap: round; animation: dash4 1.5s ease-in-out infinite; }
            @keyframes rotate4 { 100% { transform: rotate(360deg); } }
            @keyframes dash4 { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; } 100% { stroke-dashoffset: -125px; } }
        </style>
        <div class="spiner_loding">
            <svg viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg>
        </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
};

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

async function fetchPosts(categories = [], page = currentPage, append = false)
{
    try
    {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = `Loading...`;
        if (!append) renderSpinner(countriesContainer);

        const categoryMap = await fetchCategories();
        const categoryQuery = categories.length > 0 ? `&categories=${categories.join(',')}` : '';
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}${categoryQuery}`);
        const data = await response.json();

        if (page === 1)
        {
            totalPosts = parseInt(response.headers.get('X-WP-Total'), 10);
        }

        if (!append) countriesContainer.innerHTML = '';

        data.forEach(post =>
        {
            const postCategories = post.categories.map(catId => categoryMap[catId] || "غير معروف");
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No Image";
            const projectLink = post.acf?.link_progect || "";
            const designLink = post.acf?.Design_link || "";
            const repoLink = post.acf?.Repositories_link || "";
            const wordpress = post.acf?.wordpress || "";
            const excerptText = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            const truncatedExcerpt = excerptText.split(" ").slice(0, 10).join(" ") + (excerptText.split(" ").length > 10 ? " ..." : "");

            const html = `
                <div class="projec_box" data-aos="fade-up">
                    <img loading="lazy" src="${imageUrl}" alt="">
                    <div class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a href="./post.html?id=${post.id}">${post.title.rendered}</a>
                        <p>${truncatedExcerpt}</p>
                        <div class="links">
                            <a target="_blank" href="${projectLink}" class="link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                            <a target="_blank" href="${repoLink}" class="link"><i class="fa-brands fa-github"></i></a>
                            <a target="_blank" href="${designLink}" class="link"><i class="fa-brands fa-behance"></i></a>
                            <a target="_blank" href="${wordpress}" class="link"><i class="fa-brands fa-wordpress"></i></a>
                        </div>
                        <a href="./post.html?id=${post.id}" class="readMore">Read More</a>
                    </div>
                </div>
            `;
            countriesContainer.insertAdjacentHTML('beforeend', html);
        });


        document.querySelectorAll(".link").forEach(a =>
        {
            const href = a.getAttribute('href');
            if (!href || href === '' || href === '#' || href === 'javascript:void(0)')
            {
                a.style.display = 'none';
            }
        });

        const loadedPosts = document.querySelectorAll('.projec_box').length;
        if (loadedPosts >= totalPosts)
        {
            loadMoreBtn.textContent = `No More Projects`;
            loadMoreBtn.disabled = true;
        } else
        {
            loadMoreBtn.textContent = `Load More Projects`;
            loadMoreBtn.disabled = false;
        }

    } catch (error)
    {
        console.error(`❌ Error fetching posts: ${error}`);
        loadMoreBtn.textContent = `Load More Projects`;
        loadMoreBtn.disabled = false;
    }
}

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
        selectedCategories = Array.from(filtersContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        currentPage = 1;
        fetchPosts(selectedCategories, currentPage);
    });
}

// Pagination logic
const pagination = function ()
{
    loadMoreBtn.addEventListener('click', async function ()
    {
        currentPage += 1;
        await fetchPosts(selectedCategories, currentPage, true);
    });
};

renderCategoryFilters();
fetchPosts(selectedCategories, currentPage);
pagination();