const countriesContainer = document.querySelector('.countriess');
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

async function fetchPosts(selectedCategories = [])
{
    try
    {
        renderSpinner(countriesContainer);
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
                    <img loading="lazy" src="${imageUrl}" alt="">
                    <div class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a target="_blank" href="./post.html?id=${post.id}">${post.title.rendered}</a>
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
            const serchOfNameOption = `<option data-url="./post.html?id=${post.id}">${post.title.rendered}</option>`;
            const projectNamsList = document.getElementById('projectNams');
            projectNamsList.insertAdjacentHTML('beforeend', serchOfNameOption);
            countriesContainer.insertAdjacentHTML('beforeend', html);


        });
    } catch (error)
    {
        console.error(`❌ Error fetching posts: ${error}`);
    }
}
const nameSeach = document.querySelector('.nameSeach');
const btnSeach = document.querySelector('.btnSeach');

btnSeach.addEventListener('click', function (e)
{
    e.preventDefault();
    const projectNamsList = document.getElementById('projectNams');
    const selectedOption = Array.from(projectNamsList.options).find(option => option.value === nameSeach.value);
    if (selectedOption)
    {
        const url = selectedOption.getAttribute('data-url');
        if (url)
        {
            window.location.href = url;
        }
    } else
    {
        console.error('No matching option found.');
    }
});



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
