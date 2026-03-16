const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

const colors = ["#ffffff", "#9be7ff", "#ffd6ff", "#fff5b7"];

for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random(),
    blink: Math.random() * 0.02,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.opacity += star.blink;

    if (star.opacity <= 0 || star.opacity >= 1) {
      star.blink *= -1;
    }

    ctx.globalAlpha = star.opacity;
    ctx.fillStyle = star.color;

    ctx.beginPath();

    if (star.size > 1.2) {
      ctx.moveTo(star.x, star.y - star.size);
      ctx.lineTo(star.x + star.size, star.y);
      ctx.lineTo(star.x, star.y + star.size);
      ctx.lineTo(star.x - star.size, star.y);
      ctx.closePath();
    } else {
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    }

    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// links
document.querySelectorAll("[data-href]").forEach((el) => {
  el.addEventListener("click", () => (window.location.href = el.dataset.href));
});
