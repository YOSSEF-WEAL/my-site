const countriesContainer = document.querySelector('.countriess');
console.log(countriesContainer);

async function fetchCategories()
{
    const response = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/categories");
    const categories = await response.json();
    const categoryMap = {};
    categories.forEach(cat =>
    {
        categoryMap[cat.id] = cat.name;


        // console.log(categoryMap);
    });
    return categoryMap;
}

async function fetchPosts()
{
    try
    {
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=12`);
        const data = await response.json();

        data.forEach(post =>
        {
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No Image";
            const projectLink = post.acf?.link_progect || "#";

            const postCategories = post.categories.map(catId => categoryMap[catId] || "غير معروف");
            const html = `
                <div class="projec_box " data-aos="fade-up" ft">
                    <img  src="${imageUrl}" alt="">
                    <div  class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a target="_blank" href="${projectLink}">${post.title.rendered}</a>
                        ${post.excerpt.rendered}
                        <a target="_blank" href="${projectLink}" class="link"><i
                                class="fa-solid fa-arrow-up"></i></a>
                    </div>
                </div>
            `;

            countriesContainer.insertAdjacentHTML('afterbegin', html);
        });

    } catch (error)
    {
        console.error(`❌ Error fetching posts: ${error}`);
    }
}
// ${post.link}

fetchPosts();
