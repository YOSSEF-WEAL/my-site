import RenderSpinner from './renderSpinner.js';

const scund = document.querySelector(".scund");
const contactData = [
    {
        contactName: 'whatsapp',
        contactImgUrl: './imgs/icons/whatsapp.png',
        contactUrl: 'https://wa.me/201212476207'
    },
    {
        contactName: 'linkedin',
        contactImgUrl: './imgs/icons/linkedin.png',
        contactUrl: 'https://www.linkedin.com/in/yossef-weal-39844b289/?trk=opento_sprofile_goalscard'
    },
    {
        contactName: 'facebook',
        contactImgUrl: './imgs/icons/facebook.png',
        contactUrl: 'https://www.facebook.com/profile.php?id=100040317048909'
    },
    {
        contactName: 'instagram',
        contactImgUrl: './imgs/icons/instagram.png',
        contactUrl: 'https://www.instagram.com/weal.yossef/'
    },
    {
        contactName: 'behance',
        contactImgUrl: './imgs/icons/behance.png',
        contactUrl: 'https://www.behance.net/yossefweal'
    },

    {
        contactName: 'gmail',
        contactImgUrl: './imgs/icons/gmail.png',
        contactUrl: 'yweal423@gmail.com'
    },
    {
        contactName: 'github',
        contactImgUrl: './imgs/icons/github.png',
        contactUrl: 'https://github.com/YOSSEF-WEAL'
    },
    /*
    {
        contactName: '',
        contactImgUrl: './imgs/icons/.png',
        contactUrl: ''
    },
    */

]


async function fetchContent()
{
    try
    {
        new RenderSpinner(scund);

        const data = contactData;
        scund.innerHTML = "";

        data.forEach((content) =>
        {
            const contactName = content.contactName || "";
            const contactImgUrl = content.contactImgUrl || "";
            const contactUrl = content?.contactUrl || "";


            const html = `<a
            target="_blank"
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

        await document.querySelectorAll(".item").forEach(item =>
        {
            const itemPath = new URL(item.href).pathname;
            if (itemPath.includes('portfolio'))
            {
                item.style.display = "none";
            }
        });



    } catch (error)
    {
        console.error(error);
    }
}

fetchContent();
