const scund = document.querySelector(".scund");
;

const render = function (parentEl)
{
    const markup = `
        <style>
            .spiner_loding { display: flex; align-items: center; justify-content: center; }
            svg { width: 3.25em; transform-origin: center; animation: rotate4 2s linear infinite; }
            circle { fill: none; stroke: #fff; stroke-width: 2; stroke-dasharray: 1, 200; stroke-dashoffset: 0; stroke-linecap: round; animation: dash4 1.5s ease-in-out infinite; }
            @keyframes rotate4 { 100% { transform: rotate(360deg); } }
            @keyframes dash4 { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; } 100% { stroke-dashoffset: -125px; } }
        </style>
        <div class="spiner_loding">
            <svg viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg>
        </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
};

async function fetchContent()
{
    try
    {
        render(scund);

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

            const html = `<a
            href="${contactUrl}"
            class="item d-inline-flex justify-content-center align-items-center gap-2" >
            <img src="${contactImgUrl}" alt="" />
            <p>${contactName}</p>
          </a>`;

            scund.insertAdjacentHTML("beforeend", html);
        });
        await document.querySelectorAll(".item").forEach(item =>
        {
            const itemPath = new URL(item.href).pathname;
            if (itemPath === window.location.pathname)
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
