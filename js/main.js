const reviewTrack = document.querySelector("#reviews");

for (const review of reviews) {
    const figure = document.createElement("figure");
    figure.className = "review";

    const paragraphs = [review.Testimonial].flat();
    const quote = document.createElement("blockquote");
    for (const text of paragraphs) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        quote.append(paragraph);
    }

    const words = paragraphs.join(" ").split(/\s+/);
    const excerpt = document.createElement("blockquote");
    excerpt.className = "review-excerpt";
    excerpt.textContent = words.slice(0, 34).join(" ") + "…";

    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Read full recommendation";
    details.append(summary, quote);
    details.addEventListener("toggle", () => {
        excerpt.hidden = details.open;
        summary.textContent = details.open ? "Show less" : "Read full recommendation";
    });

    const attribution = document.createElement("figcaption");
    const author = document.createElement(review.LinkedIn ? "a" : "strong");
    if (review.LinkedIn) author.href = review.LinkedIn;
    author.textContent = review.Name;

    const role = document.createElement("span");
    role.textContent = review.Position + ", " + review.Organization;

    attribution.append(author, role);
    if (review.Date) {
        const date = document.createElement("time");
        date.dateTime = review.Date;
        date.textContent = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" })
            .format(new Date(review.Date));
        attribution.append(date);
    }
    if (words.length > 34) figure.append(excerpt, details);
    else figure.append(quote);
    figure.append(attribution);
    reviewTrack.append(figure);
}

const reviewControls = document.querySelector(".review-controls");
const previousReview = document.querySelector("#review-previous");
const nextReview = document.querySelector("#review-next");
const autoplayButton = document.querySelector("#review-autoplay");
const testimonials = document.querySelector("#testimonials");
const reducedReviewMotion = matchMedia("(prefers-reduced-motion: reduce)");
let autoplay = !reducedReviewMotion.matches;

function updateReviewButtons() {
    previousReview.disabled = reviewTrack.scrollLeft <= 1;
    nextReview.disabled = reviewTrack.scrollLeft + reviewTrack.clientWidth >= reviewTrack.scrollWidth - 1;
}

function scrollReview(direction) {
    const [first, second] = reviewTrack.children;
    reviewTrack.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft) });
}

previousReview.addEventListener("click", () => scrollReview(-1));
nextReview.addEventListener("click", () => scrollReview(1));
reviewTrack.addEventListener("scroll", updateReviewButtons, { passive: true });
window.addEventListener("resize", updateReviewButtons);
reviewControls.hidden = reviewTrack.childElementCount < 2;
updateReviewButtons();

function updateAutoplayButton() {
    autoplayButton.textContent = autoplay ? "Pause auto-scroll" : "Start auto-scroll";
}

autoplayButton.addEventListener("click", () => {
    autoplay = !autoplay;
    updateAutoplayButton();
});
reducedReviewMotion.addEventListener("change", event => {
    if (event.matches) {
        autoplay = false;
        updateAutoplayButton();
    }
});
updateAutoplayButton();

let reviewsInView = false;
new IntersectionObserver(([entry]) => {
    reviewsInView = entry.intersectionRatio >= 0.5;
}, { threshold: 0.5 }).observe(reviewTrack);
window.setInterval(() => {
    if (!autoplay || !reviewsInView || document.hidden || reviewControls.hidden ||
        testimonials.matches(":hover, :focus-within") || reviewTrack.querySelector("details[open]")) return;

    if (nextReview.disabled) reviewTrack.scrollTo({ left: 0, behavior: "instant" });
    else scrollReview(1);
}, 7000);

const contactForm = document.querySelector("#contact-form");
const sendButton = contactForm.querySelector("button[type=submit]");
const formStatus = contactForm.querySelector(".form-status");

function loadEmailClient() {
    if (window.emailjs) return Promise.resolve(window.emailjs);

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.addEventListener("load", () => {
            if (window.emailjs) resolve(window.emailjs);
            else reject(new Error("Email client did not initialize."));
        }, { once: true });
        script.addEventListener("error", () => {
            script.remove();
            reject(new Error("Email client could not be loaded."));
        }, { once: true });
        document.head.append(script);
    });
}

contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (sendButton.disabled) return;

    const fields = new FormData(contactForm);
    const name = fields.get("name").trim();
    const email = fields.get("email").trim();
    const message = fields.get("message").trim();

    if (!name || !message) {
        formStatus.dataset.state = "error";
        formStatus.textContent = "Enter your name and a message.";
        contactForm.elements.namedItem(!name ? "name" : "message").focus();
        return;
    }

    sendButton.disabled = true;
    formStatus.dataset.state = "sending";
    formStatus.textContent = "Sending your message…";

    try {
        const client = await loadEmailClient();
        await client.send("service_o5r4fdj", "template_7faqv6i", {
            from_name: email,
            from_email: email,
            reply_to: email,
            sender_name: name,
            to_name: "Nirmith",
            message: name + "\n\n" + message,
        }, "7-iJou_mtFeypOg1K");

        contactForm.reset();
        formStatus.dataset.state = "success";
        formStatus.textContent = "Your message was sent.";
    } catch {
        formStatus.dataset.state = "error";
        formStatus.textContent = "Your message couldn’t be sent. Try again or use the email link.";
    } finally {
        sendButton.disabled = false;
    }
});

contactForm.hidden = false;
