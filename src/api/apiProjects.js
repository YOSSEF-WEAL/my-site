// دالة مساعدة لجلب الأقسام
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

// دالة مساعدة لمعالجة بيانات المشروع
function processProjectData(post, categoryMap)
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
}

// دالة لجلب آخر المشاريع (للصفحة الرئيسية)
async function apiProjects()
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
        const projects = data.map(post => processProjectData(post, categoryMap));

        return projects;

    } catch (error)
    {
        console.error(`❌ Error fetching last projects: ${error}`);
        return [];
    }
}

export default apiProjects;

// دالة لجلب جميع الأقسام كمصفوفة
export async function fetchAllCategories()
{
    const response = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/categories");
    const categories = await response.json();
    return categories.map(cat => ({ id: cat.id, name: cat.name }));
}

// دالة لجلب المشاريع مع pagination
export async function fetchProjectsWithPagination(page = 1, perPage = 6)
{
    try
    {
        const categoryMap = await fetchCategories();
        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`);

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
        const projects = data.map(post => processProjectData(post, categoryMap));

        return {
            projects,
            totalPages,
            hasMore: page < totalPages
        };

    } catch (error)
    {
        console.error(`❌ Error fetching projects with pagination: ${error}`);
        return { projects: [], totalPages: 0, hasMore: false };
    }
}

// دالة لجلب المشاريع حسب القسم
export async function fetchProjectsByCategory(categoryName, page = 1, perPage = 6)
{
    try
    {
        const categoryMap = await fetchCategories();

        // أولاً نحصل على ID القسم
        const categoriesResponse = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/categories");
        const categories = await categoriesResponse.json();
        const category = categories.find(cat => cat.name === categoryName);

        if (!category)
        {
            return { projects: [], totalPages: 0, hasMore: false };
        }

        const response = await fetch(`https://a3raff.com/Yossefprofile/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}&categories=${category.id}&orderby=date&order=desc`);

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
        const projects = data.map(post => processProjectData(post, categoryMap));

        return {
            projects,
            totalPages,
            hasMore: page < totalPages
        };

    } catch (error)
    {
        console.error(`❌ Error fetching projects by category: ${error}`);
        return { projects: [], totalPages: 0, hasMore: false };
    }
}


