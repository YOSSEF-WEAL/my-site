
async function apiTechStack()
{
    const res = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/skill?per_page=100");
    const data = await res.json();

    return data
}

export default apiTechStack
