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

async function apiProject(projectId)
{
    try
    {
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts/${projectId}`);
        const data = await response.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content.rendered, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        const imageUrls = Array.from(imgElements).map(img => img.src);

        const filterText = function (allContent)
        {
            const parser = new DOMParser();
            const doc = parser.parseFromString(allContent, 'text/html');
            return doc.body.textContent || "";
        };

        const postCategories = data.categories.map(catId => categoryMap[catId] || "غير معروف");

        return {
            id: data.id,
            title: data.title.rendered,
            content: data.content.rendered,
            contentText: filterText(data.content.rendered),
            categories: postCategories,
            images: imageUrls,
            projectLink: data.acf?.link_progect || "",
            designLink: data.acf?.Design_link || "",
            repositoriesLink: data.acf?.Repositories_link || "",
            selectedTechnologies: data.acf?.selectd_technologys || [],
            wordpress: data.acf?.wordpress || "",
            date: data.date,
            modified: data.modified,
            excerpt: data.excerpt?.rendered || "",
            featuredMedia: data.featured_media,
            slug: data.slug
        };

    } catch (error)
    {
        console.error(`Error fetching project data ❌: ${error}`);
        throw error;
    }
}

export default apiProject; 