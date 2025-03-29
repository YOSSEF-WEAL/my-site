const boxsSkills = document.querySelector(".technologys");

async function fetchSkills() {
  try {
    const res = await fetch(
      "https://a3raff.com/Yossefprofile/wp-json/wp/v2/skill?per_page=100",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer TrLqAjL2vhjpu5Hp65bvVmUXqBsj9kG",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Received data is not an array.");
    }

    boxsSkills.innerHTML = "";
    data.forEach((skill) => {
      const skillName = skill.title?.rendered || "No Name";
      const skillImage = skill.acf?.skillImage || "default-image.jpg"; // ضع صورة افتراضية إذا لم تكن متاحة

      const html = `<li class="technology" data-aos="zoom-in">
                            <img class="imgTec" src="${skillImage}" alt="${skillName}">
                            <p>${skillName}</p>
                          </li>`;
      boxsSkills.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("❌ فشل تحميل البيانات:", error);
  }
}

fetchSkills();
