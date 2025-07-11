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

async function apiLastProjects()
{
    try
    {
        const categoryMap = await fetchCategories();
        const response = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=6&orderby=date&order=desc");

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const projects = data.map(post =>
        {
            const postCategories = post.categories.map(catId => categoryMap[catId] || "غير معروف");
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No Image";
            const projectLink = post.acf?.link_progect || "";
            const designLink = post.acf?.Design_link || "";
            const repoLink = post.acf?.Repositories_link || "";
            const wordpress = post.acf?.wordpress || "";
            const excerptText = post.excerpt.rendered.replace(/<[^>]*>/g, "");
            const truncatedExcerpt = excerptText.split(" ").slice(0, 15).join(" ") + (excerptText.split(" ").length > 10 ? " ..." : "");

            return {
                id: post.id,
                title: post.title.rendered,
                categories: postCategories,
                imageUrl: imageUrl,
                projectLink: projectLink,
                designLink: designLink,
                repoLink: repoLink,
                wordpress,
                excerpt: truncatedExcerpt,
            };
        });

        return projects;

    } catch (error)
    {
        console.error(`❌ Error fetching last 8 projects: ${error}`);
        return [];
    }
}

export default apiLastProjects;


