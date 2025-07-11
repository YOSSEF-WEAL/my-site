
async function apiContact()
{
    const res = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/yossef_contact?per_page=100");
    if (!res.ok)
    {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();


    const contents = data.map(content =>
    {

        const contactName = content.title?.rendered || "";
        const contactUrl = content.acf?.contactUrl || "";
        const contactImgUrl = content.acf?.contactImgUrl || "";
        const target = content.acf?.target === false ? "_blank" : "_parent";

        return {
            contactName,
            contactUrl,
            contactImgUrl,
            target
        };
    });


    return contents
}

export default apiContact
