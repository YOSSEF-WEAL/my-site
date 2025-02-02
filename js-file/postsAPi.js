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

async function fetchPosts(selectedCategories = [])
{
    try
    {
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=50`);
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
            const projectLink = post.acf?.link_progect || "#";
            const excerptText = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            const words = excerptText.split(" ");
            const truncatedExcerpt = words.length > 50 ? words.slice(0, 30).join(" ") + "..." : excerptText;
            const html = `
                <div class="projec_box ${postCategories.join(" , ")}">
                    <img src="${imageUrl}" alt="">
                    <div class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a href="./post.html?id=${post.id}">${post.title.rendered}</a>
                        <p>${truncatedExcerpt}</p>
                        <div class="links" style="gap: 10px; display: flex;">
                            <a target="_blank" href="${projectLink}" class="link"><i class="fa-solid fa-arrow-up"></i></a>
                            <a style="width: fit-content; font-size: 20px; padding: 10px 20px; gap: 17px; rotate: 0deg;" href="./post.html?id=${post.id}" class="link">Read More
                                <i style="rotate: 45deg !important; scale: 1.5; !important" class="fa-solid fa-arrow-up"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            countriesContainer.insertAdjacentHTML('beforeend', html);
        });
    } catch (error)
    {
        console.error(`❌ Error fetching posts: ${error}`);
    }
}

const filtersContainer = document.querySelector('.filters');

async function renderCategoryFilters()
{
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
