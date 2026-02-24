async function loadProjects() {
    const grid = document.querySelector(".gallery-grid");
    if (!grid) return;

    try {
        const response = await fetch("/assets/projects.json");
        const data = await response.json();

        grid.innerHTML = data
            .map(
                (project) => `
            <div class="gallery-item" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="overlay">
                    <div class="overlay-text">
                        <h3>${project.title}</h3>
                    </div>
                </div>
            </div>
        `,
            )
            .join("");

        setupModal();
    } catch (error) {
        console.error("Error loading project data:", error);
        grid.innerHTML =
            "<p>Unable to load projects. Please check back later.</p>";
    }
}

function setupModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("img-slot");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".close-modal");

    document.querySelector(".gallery-grid").addEventListener("click", (e) => {
        const item = e.target.closest(".gallery-item");
        if (!item) return;

        const clickedImg = item.querySelector("img");
        modal.style.display = "flex";
        modalImg.src = clickedImg.src;
        captionText.innerHTML = clickedImg.alt;
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };
    }

    window.onclick = (event) => {
        const modal = document.getElementById("image-modal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

document.addEventListener("DOMContentLoaded", loadProjects);
