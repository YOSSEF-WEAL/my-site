const boxsSkills = document.querySelector('.technologys');


async function fetchSkills()
{
    try
    {

        const res = await fetch("https://a3raff.com/Yossefprofile/wp-json/wp/v2/skill?per_page=100");
        const data = await res.json();
        boxsSkills.innerHTML = '';
        data.forEach(skill =>
        {
            const skillName = skill.acf?.skillName || "";
            const skillImage = skill.acf?.skillImage || "";
            const html = `<li class="technology"  data-aos="zoom-in">
                          <img  class="imgTec" src="${skillImage}" alt="${skillName}">
                        <p>${skillName}</p>
                    </li>`
            boxsSkills.insertAdjacentHTML('beforeend', html);
        });
    } catch (error)
    {
        console.error(error);
    }

}

fetchSkills()