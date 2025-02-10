const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
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

async function fetchPosts()
{
    try
    {
        renderSpinner(countriesContainer);
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts/${postId}`);
        const data = await response.json();
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
        const projectLink = data.acf?.link_progect || "#";
        const postCategories = data.categories.map(catId => categoryMap[catId] || "غير معروف");
        const html = `
            <div class="projec_box ${postCategories.join(" , ")}">
                        <div class='imges'>
            ${imageUrls.map((url) =>
        {
            return `<img loading="lazy" src="${url}" alt="">`;
        }).join('')}
            </div>
            <div class="text">
                <h4><span>${postCategories.join(", ")}</span></h4>
                <a target="_blank" href="${projectLink}">${data.title.rendered}</a>
                <p>${filteText(data.content.rendered)}</p>
                <div class="links" style="gap: 10px; display: flex;">
        <a target="_blank" href="${projectLink}" class="link"><i class="fa-solid fa-arrow-up"></i></a>
    </div>
            </div >

            </div >
        `;
        countriesContainer.innerHTML = '';
        countriesContainer.insertAdjacentHTML('afterbegin', html);
    } catch (error)
    {
        console.error(`Error fetching post data ❌: ${error} `);
    }
}
fetchPosts();

window.addEventListener('scroll', function ()
{
    const textPost = document.querySelector('.projec_box .text');
    if (window.scrollY >= 80)
        textPost.classList.add("stackyText");
    else
        textPost.classList.remove("stackyText");
});
