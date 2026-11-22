function projectCard(project, imageRoot) {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = project.url;
    if (project.id) card.id = project.id;

    const preview = document.createElement("div");
    preview.className = "project-image";

    if (project.image) {
        const image = document.createElement("img");
        image.src = imageRoot + project.image;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        preview.append(image);
    } else if (project.spotlight) {
        card.classList.add("project-spotlight");
        preview.classList.add("pitwall-art");
        preview.setAttribute("aria-hidden", "true");
        const emblem = document.createElement("span");
        emblem.textContent = "PITWALL";
        preview.append(emblem);
    }

    const info = document.createElement("div");
    info.className = "project-info";

    const category = document.createElement("p");
    category.className = "project-category";
    category.textContent = project.status || (project.category === "certification"
        ? "Certification"
        : projectCategories[project.category]);

    const title = document.createElement("h3");
    title.textContent = project.name;
    info.append(category, title);

    if (project.summary) {
        const summary = document.createElement("p");
        summary.textContent = project.summary;
        info.append(summary);
    }

    if (project.spotlight) {
        const sourceLabel = document.createElement("span");
        sourceLabel.className = "project-source";
        sourceLabel.textContent = "View on GitHub";
        info.append(sourceLabel);
    }

    card.append(preview, info);
    return card;
}

const featured = document.querySelector("#featured-projects");
if (featured) {
    featured.append(...projects.filter(project => project.featured).map(project => projectCard(project, "img/")));
}

const gallery = document.querySelector("#portfolio-gallery");
if (gallery) {
    const filters = document.querySelector("#filter-btns");
    const count = document.querySelector("#project-count");
    const cards = projects.map(project => ({ project, element: projectCard(project, "../img/") }));
    const categories = Object.entries({ all: "All", ...projectCategories });

    function applyFilter(category, selectedButton) {
        let visibleCount = 0;
        for (const { project, element } of cards) {
            const visible = category === "all" || project.category === category;
            element.hidden = !visible;
            if (visible) visibleCount++;
        }

        for (const button of filters.children) {
            button.setAttribute("aria-pressed", String(button === selectedButton));
        }

        count.textContent = visibleCount + (visibleCount === 1 ? " item" : " items");
    }

    gallery.append(...cards.map(card => card.element));
    for (const [category, label] of categories) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.addEventListener("click", () => applyFilter(category, button));
        filters.append(button);
    }

    applyFilter("all", filters.firstElementChild);
    filters.hidden = false;
}
