const countriesContainer = document.querySelector('.countriess');

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
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=50`);
        const data = await response.json();
        data.forEach(post =>
        {
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No Image";
            const projectLink = post.acf?.link_progect || "#";

            const postCategories = post.categories.map(catId => categoryMap[catId] || "غير معروف");
            const excerptText = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            const words = excerptText.split(" ");
            const truncatedExcerpt = words.length > 50 ? words.slice(0, 30).join(" ") + "..." : excerptText;

            const html = `
                <div class="projec_box ${postCategories.join(" , ")}">
                    <img  src="${imageUrl}" alt="">
                    <div  class="text">
                        <h4><span>${postCategories.join(", ")}</span></h4>
                        <a target="_blank" href="${projectLink}">${post.title.rendered}</a>
                   <p>   ${truncatedExcerpt} </p>
                    <div class="links" style= "gap: 10px; display: flex;">
                        <a target="_blank" href="${projectLink}" class="link"><i
                                class="fa-solid fa-arrow-up"></i></a>
                        <a style="width: fit-content; font-size: 20px; padding: 10px 20px; gap: 17px; rotate: 0deg;" href="./post.html?id=${post.id}" class="link">Read More 
                        <i style= "rotate: 45deg !important; scale: 1.5; !important"  class="fa-solid fa-arrow-up"></i></a>
                    </div>
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
fetchPosts();
