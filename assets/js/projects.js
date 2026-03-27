const UI = {
    grid: document.querySelector(".gallery-grid"),
    modal: document.getElementById("image-modal"),
    modalImg: document.getElementById("img-slot"),
    caption: document.getElementById("modal-caption"),
    closeBtn: document.querySelector(".close-modal")
};

async function loadProjects() {
    if (!UI.grid) return;

    try {
        const response = await fetch("/assets/projects.json");
        if (!response.ok) throw new Error("Failed to fetch projects");

        const projects = await response.json();

        // Render projects using a cleaner map/join
        UI.grid.innerHTML = projects.map(project => `
            <div class="gallery-item" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="overlay">
                    <div class="overlay-text">
                        <h3>${project.title}</h3>
                    </div>
                </div>
            </div>
        `).join("");

        setupModal();
    } catch (error) {
        console.error("NBR Error:", error);
        UI.grid.innerHTML = `<p class="error-msg">Unable to load projects at this time.</p>`;
    }
}

function setupModal() {
    if (!UI.modal) return;

    // Event Delegation: One listener on the grid instead of many on items
    UI.grid.addEventListener("click", (e) => {
        const item = e.target.closest(".gallery-item");
        if (!item) return;

        const img = item.querySelector("img");

        // Open Modal
        UI.modal.style.display = "flex";
        UI.modalImg.src = img.src;
        UI.caption.textContent = img.alt; // textContent is safer than innerHTML

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
    });

    // Unified Close Logic
    const closeModal = () => {
        UI.modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    if (UI.closeBtn) UI.closeBtn.onclick = closeModal;

    // Close on background click or Escape key
    window.addEventListener("click", (e) => {
        if (e.target === UI.modal) closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && UI.modal.style.display === "flex") {
            closeModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", loadProjects);
