import RenderSpinner from './renderSpinner.js';

const scund = document.querySelector(".scund");

async function fetchContent()
{
    try
    {
        new RenderSpinner(scund);

        const res = await fetch(
            "https://a3raff.com/Yossefprofile/wp-json/wp/v2/yossef_contact?per_page=100"
        );
        const data = await res.json();
        scund.innerHTML = "";

        data.forEach((content) =>
        {
            const contactName = content.title?.rendered || "";
            const contactUrl = content.acf?.contactUrl || "";
            const contactImgUrl = content.acf?.contactImgUrl || "";
            const target = content.acf?.target === false ? "_blank" : "_parent";

            const html = `<a
            target=${target} 
            href="${contactUrl}"
            class="item d-inline-flex justify-content-center align-items-center gap-2"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            >
            <img src="${contactImgUrl}" alt="" />
            <p>${contactName}</p>
          </a>`;

            scund.insertAdjacentHTML("beforeend", html);
        });

        // await document.querySelectorAll(".item").forEach(item =>
        // {
        //     const itemPath = new URL(item.href).pathname;
        //     if (itemPath.includes('portfolio'))
        //     {
        //         item.style.display = "none";
        //     }
        // });



    } catch (error)
    {
        console.error(error);
    }
}

fetchContent();
