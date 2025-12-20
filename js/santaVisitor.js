const santa = document.getElementById("santa-visitor");

if (santa) {
  const MARGIN = 2; // tight to edge

  function getSize() {
    // Use real rendered size (prevents weird padding/gaps on top/bottom)
    const rect = santa.getBoundingClientRect();
    const w = rect.width || 130;
    const h = rect.height || 130;
    return { w, h };
  }

  // Pick a random point along one of the 4 edges
  function randomEdgeSpot() {
    const { w, h } = getSize();
    const side = ["top", "right", "bottom", "left"][Math.floor(Math.random() * 4)];

    if (side === "top") {
      return {
        side,
        x: MARGIN + Math.random() * (window.innerWidth - w - MARGIN * 2),
        y: MARGIN
      };
    }

    if (side === "bottom") {
      return {
        side,
        x: MARGIN + Math.random() * (window.innerWidth - w - MARGIN * 2),
        y: window.innerHeight - h - MARGIN
      };
    }

    if (side === "left") {
      return {
        side,
        x: MARGIN,
        y: MARGIN + Math.random() * (window.innerHeight - h - MARGIN * 2)
      };
    }

    // right
    return {
      side,
      x: window.innerWidth - w - MARGIN,
      y: MARGIN + Math.random() * (window.innerHeight - h - MARGIN * 2)
    };
  }

  // Directional tilt so Santa "leans" based on where he appears
  function computeTilt(side, x, y) {
    // normalize to [-1..1]
    const nx = (x / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = (y / Math.max(1, window.innerHeight)) * 2 - 1;

    let tilt = 0;

    // Base tilt by side + slight variation by position along that edge
    if (side === "left")   tilt =  6 + (ny * 4);
    if (side === "right")  tilt = -6 + (ny * 4);
    if (side === "top")    tilt =  6 + (nx * 4);   // upside-down still feels angled
    if (side === "bottom") tilt = -6 + (nx * 4);

    // clamp for subtlety
    tilt = Math.max(-12, Math.min(12, tilt));
    return tilt;
  }

  // Sets flip/rotation + slide-in direction + tilt
  function setOrientationAndSlide(side, x, y) {
    santa.style.setProperty("--flipx", "1");
    santa.style.setProperty("--rot", "0deg");

    // ✅ directional tilt
    const tilt = computeTilt(side, x, y);
    santa.style.setProperty("--tilt", `${tilt}deg`);

    // slide-in start offset
    let sx = 0, sy = 0;

    if (side === "left")  { sx = -75; }
    if (side === "right") { sx =  75; santa.style.setProperty("--flipx", "-1"); }
    if (side === "top")   { sy = -75; santa.style.setProperty("--rot", "180deg"); santa.style.setProperty("--flipx", "-1"); }
    if (side === "bottom"){ sy =  75; }

    santa.style.setProperty("--sx", `${sx}px`);
    santa.style.setProperty("--sy", `${sy}px`);
  }

  function showSanta() {
    const spot = randomEdgeSpot();

    santa.classList.remove("show");
    santa.style.left = `${spot.x}px`;
    santa.style.top = `${spot.y}px`;

    setOrientationAndSlide(spot.side, spot.x, spot.y);

    requestAnimationFrame(() => santa.classList.add("show"));

    // stays longer: 3.5–6.0s
    const stay = 3500 + Math.random() * 2500;
    setTimeout(() => santa.classList.remove("show"), stay);
  }

  (function loop() {
    // appears every 5–14 seconds
    const delay = 5000 + Math.random() * 9000;
    setTimeout(() => {
      showSanta();
      loop();
    }, delay);
  })();

  // Optional: keep it responsive if the user resizes
  window.addEventListener("resize", () => {
    santa.classList.remove("show");
  });
}
