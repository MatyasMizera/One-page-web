const buttons = document.querySelectorAll(".menu-button");
const mainContent = document.getElementById("main-content");
let data = {};

const xhr = new XMLHttpRequest();
xhr.open("GET", "get_mountains.php", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            showContent("intro");
        } else {
            console.error("Chyba při načítání dat z PHP:", xhr.status);
        }
    }
};
xhr.send();

function showContent(key) {
    const item = data[key];
    if (!item) {
        mainContent.innerHTML = "<p>Data nejsou dostupná.</p>";
        return;
    }

    if (key === "intro") {
        let html = `<h2>${item.title}</h2>`;
        item.paragraphs.forEach(p => html += `<p>${p}</p>`);
        mainContent.innerHTML = html;
        return;
    }

    mainContent.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" class="mountain-img">
        <p><strong>Výška:</strong> ${item.height}</p>
        <p><strong>Pohoří:</strong> ${item.range}</p>
        <p><strong>Státy:</strong> ${item.countries}</p>
        <p class="description">${item.description}</p>
    `;
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const key = btn.dataset.target;
        showContent(key);
    });
});
