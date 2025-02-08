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
