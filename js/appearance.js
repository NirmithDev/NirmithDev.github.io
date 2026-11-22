(() => {
    const root = document.documentElement;
    const canadianMonth = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", month: "numeric" });
    const seasonsByMonth = [
        "winter", "winter", "winter", "spring", "spring", "summer",
        "summer", "summer", "fall", "fall", "winter", "winter",
    ];
    const christmasPreview = new URLSearchParams(window.location.search).get("christmas") === "1";

    function readPreference(key) {
        try {
            return localStorage.getItem("portfolio." + key);
        } catch {
            return null;
        }
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem("portfolio." + key, value);
        } catch {
            // The controls still work when browser storage is unavailable.
        }
    }

    function updateSeason() {
        const month = Number(canadianMonth.format(new Date()));
        root.dataset.season = seasonsByMonth[month - 1];
        root.classList.toggle("christmas-season", month >= 11 || christmasPreview);
    }

    root.dataset.theme = readPreference("theme") === "light" ? "light" : "dark";
    updateSeason();
    window.addEventListener("focus", updateSeason);

    document.addEventListener("DOMContentLoaded", () => {
        const menuToggle = document.querySelector(".menu-toggle");
        const nav = document.getElementById(menuToggle.getAttribute("aria-controls"));
        const menuIsOpen = () => menuToggle.getAttribute("aria-expanded") === "true";
        const closeMenu = () => menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", String(!menuIsOpen()));
        });
        nav.addEventListener("click", event => {
            if (event.target.closest("a")) closeMenu();
        });
        menuToggle.closest(".site-header").addEventListener("keydown", event => {
            if (event.key !== "Escape" || !menuIsOpen() || !menuToggle.getClientRects().length) return;
            closeMenu();
            menuToggle.focus();
        });
        menuToggle.hidden = false;

        const backToTop = document.querySelector(".back-to-top");
        function updateBackToTop() {
            backToTop.hidden = window.scrollY < 320;
        }
        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        const appearance = document.querySelector(".appearance");
        const themeToggle = appearance.querySelector(".theme-toggle");
        const themeColor = document.querySelector('meta[name="theme-color"]');

        function updateTheme() {
            const isDark = root.dataset.theme === "dark";
            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
            themeColor.content = isDark ? "#151618" : "#e1e7ed";
        }

        themeToggle.addEventListener("click", () => {
            root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
            savePreference("theme", root.dataset.theme);
            updateTheme();
        });
        updateTheme();
        appearance.hidden = false;

        const scene = document.querySelector(".portrait-scene");
        if (!scene) return;

        const hero = scene.parentElement;
        const aboutIntro = document.querySelector(".about-intro");
        const mobileLayout = matchMedia("(max-width: 46rem)");
        function placePortrait() {
            if (mobileLayout.matches) aboutIntro.after(scene);
            else hero.append(scene);
        }
        mobileLayout.addEventListener("change", placePortrait);
        placePortrait();

        const art = scene.querySelector(".scene-art");
        const sceneControls = scene.querySelector(".scene-controls");
        const rotateButton = scene.querySelector(".rotate-button");
        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
        const angles = [[0, 0], [-8, 19], [8, -19]];
        let pose = 0;

        function renderTilt(x = 0, y = 0) {
            art.style.setProperty("--tilt-x", angles[pose][0] + x + "deg");
            art.style.setProperty("--tilt-y", angles[pose][1] + y + "deg");
        }

        scene.addEventListener("pointermove", event => {
            if (event.pointerType !== "mouse" || reduceMotion.matches || event.target.closest(".scene-controls")) return;
            const bounds = scene.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            art.classList.add("is-tracking");
            renderTilt(-y * 16, x * 20);
        });
        function resetPointerTilt() {
            art.classList.remove("is-tracking");
            renderTilt();
        }
        scene.addEventListener("pointerleave", resetPointerTilt);
        sceneControls.addEventListener("pointerenter", resetPointerTilt);
        reduceMotion.addEventListener("change", resetPointerTilt);
        rotateButton.addEventListener("click", () => {
            pose = (pose + 1) % angles.length;
            resetPointerTilt();
        });
        sceneControls.hidden = false;

        const santa = document.querySelector(".santa-visit");
        let santaTimer;
        let firstVisit = true;

        function scheduleSanta() {
            clearTimeout(santaTimer);
            santaTimer = undefined;
            santa.classList.remove("is-visiting");
            if (document.hidden || !root.classList.contains("christmas-season")) return;

            const [minimum, spread] = christmasPreview
                ? [800, 0]
                : firstVisit ? [12000, 16000] : [45000, 45000];
            santaTimer = setTimeout(() => {
                firstVisit = false;
                santa.classList.add("is-visiting");
                santaTimer = christmasPreview ? undefined : setTimeout(scheduleSanta, 4200);
            }, minimum + Math.random() * spread);
        }

        document.addEventListener("visibilitychange", () => {
            updateSeason();
            scheduleSanta();
        });
        window.addEventListener("focus", () => {
            if (!root.classList.contains("christmas-season") ||
                (!santaTimer && !santa.classList.contains("is-visiting"))) scheduleSanta();
        });
        scheduleSanta();
    });
})();
