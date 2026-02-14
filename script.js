const flowers = ["🌸", "🌹", "🌺", "🌷", "💮", "🏵️"];
const hearts = ["💖", "💕", "💗", "💓", "💝"];
const sparkles = ["✨", "⭐", "🌟", "💫"];

// Detect mobile
const isMobile = window.innerWidth <= 768;
const maxFlowers = isMobile ? 5 : 10;
let flowerCount = 0;

// Animasi bunga jatuh
function createFlower() {
  if (flowerCount >= maxFlowers) return;

  const flower = document.createElement("div");
  flower.className = "flower";
  flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

  let startX = Math.random() * window.innerWidth;
  let y = -50;
  let speed = 1 + Math.random() * 2;
  let swing = Math.random() * (isMobile ? 50 : 80);
  let angle = Math.random() * 360;

  flower.style.left = startX + "px";
  flower.style.fontSize =
    (isMobile ? 18 : 20) + Math.random() * (isMobile ? 20 : 30) + "px";
  flower.style.opacity = 0.7 + Math.random() * 0.3;

  document.body.appendChild(flower);
  flowerCount++;

  function animate() {
    y += speed;
    angle += 1;
    const x = startX + Math.sin(y * 0.015) * swing;

    flower.style.transform =
      `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    if (y < window.innerHeight + 60) {
      requestAnimationFrame(animate);
    } else {
      flower.remove();
      flowerCount--;
    }
  }

  animate();
}

// Floating hearts background
function createFloatingHeart() {
  if (isMobile && document.querySelectorAll('.heart-bg').length >= 3) return;

  const heart = document.createElement("div");
  heart.className = "heart-bg";
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (15 + Math.random() * 10) + "s";
  heart.style.animationDelay = Math.random() * 5 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 25000);
}

// Sparkle effect
function createSparkle() {
  if (isMobile && document.querySelectorAll('.sparkle').length >= 3) return;

  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];

  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();

  sparkle.style.left = rect.left + Math.random() * rect.width + "px";
  sparkle.style.top = rect.top + Math.random() * rect.height + "px";
  sparkle.style.animationDelay = Math.random() * 2 + "s";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 3000);
}

// Ripple
function createRipple(e) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "10px";
  ripple.style.height = "10px";

  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

setInterval(createFlower, isMobile ? 400 : 250);
setInterval(createFloatingHeart, isMobile ? 5000 : 3000);
setInterval(createSparkle, isMobile ? 1500 : 800);

/* MUSIC */
const music = document.getElementById("bg-music");
const startOverlay = document.getElementById("startOverlay");
const musicIndicator = document.getElementById("musicIndicator");
let musicStarted = false;

function fadeInMusic() {
  let volume = 0;
  music.volume = 0;
  const fade = setInterval(() => {
    volume += 0.02;
    if (volume >= 0.6) {
      volume = 0.6;
      clearInterval(fade);
    }
    music.volume = volume;
  }, 100);
}

function startMusic(e) {
  if (e) createRipple(e);

  if (!musicStarted) {
    music.play().then(() => {
      musicStarted = true;
      fadeInMusic();
      startOverlay.classList.add("hidden");
      setTimeout(() => startOverlay.style.display = "none", 800);

      musicIndicator.classList.add("show");
      setTimeout(() => musicIndicator.classList.remove("show"), 4000);
    });
  }
}

startOverlay.addEventListener("click", startMusic);

window.addEventListener("load", () => {
  music.play().then(() => {
    musicStarted = true;
    fadeInMusic();
    startOverlay.style.display = "none";
  }).catch(() => {});
});

window.addEventListener("orientationchange", () => {
  location.reload();
});