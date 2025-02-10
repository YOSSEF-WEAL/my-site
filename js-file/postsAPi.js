const countriesContainer = document.querySelector('.countriess');
const renderSpinner = function (parintEl)
{
    const markup = `

<style>
    .spiner_loding{
      width: 100%;
    display: flex;
    justify-content: center;
    }
    .loader {
        position: relative;
        width: 54px;
        height: 54px;
        border-radius: 10px;
    }

    .loader div {
        width: 8%;
        height: 24%;
        background: rgb(128, 128, 128);
        position: absolute;
        left: 50%;
        top: 30%;
        opacity: 0;
        border-radius: 50px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        animation: fade458 1s linear infinite;
    }

    @keyframes fade458 {
        from {
            opacity: 1;
        }

        to {
            opacity: 0.25;
        }
    }

    .loader .bar1 {
        transform: rotate(0deg) translate(0, -130%);
        animation-delay: 0s;
    }

    .loader .bar2 {
        transform: rotate(30deg) translate(0, -130%);
        animation-delay: -1.1s;
    }

    .loader .bar3 {
        transform: rotate(60deg) translate(0, -130%);
        animation-delay: -1s;
    }

    .loader .bar4 {
        transform: rotate(90deg) translate(0, -130%);
        animation-delay: -0.9s;
    }

    .loader .bar5 {
        transform: rotate(120deg) translate(0, -130%);
        animation-delay: -0.8s;
    }

    .loader .bar6 {
        transform: rotate(150deg) translate(0, -130%);
        animation-delay: -0.7s;
    }

    .loader .bar7 {
        transform: rotate(180deg) translate(0, -130%);
        animation-delay: -0.6s;
    }

    .loader .bar8 {
        transform: rotate(210deg) translate(0, -130%);
        animation-delay: -0.5s;
    }

    .loader .bar9 {
        transform: rotate(240deg) translate(0, -130%);
        animation-delay: -0.4s;
    }

    .loader .bar10 {
        transform: rotate(270deg) translate(0, -130%);
        animation-delay: -0.3s;
    }

    .loader .bar11 {
        transform: rotate(300deg) translate(0, -130%);
        animation-delay: -0.2s;
    }

    .loader .bar12 {
        transform: rotate(330deg) translate(0, -130%);
        animation-delay: -0.1s;
    }
</style>
<div class="spiner_loding">
<div class="loader">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    <div class="bar4"></div>
    <div class="bar5"></div>
    <div class="bar6"></div>
    <div class="bar7"></div>
    <div class="bar8"></div>
    <div class="bar9"></div>
    <div class="bar10"></div>
    <div class="bar11"></div>
    <div class="bar12"></div>
</div>
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
