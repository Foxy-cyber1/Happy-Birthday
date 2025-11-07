const moon = document.createElement("div");
moon.classList.add("moon");
document.body.appendChild(moon);

const reflection = document.createElement("div");
reflection.classList.add("moon-reflection");
document.body.appendChild(reflection);

for (let i = 0; i < 5; i++) {
  const cloud = document.createElement("div");
  cloud.classList.add("cloud");
  cloud.style.width = `${150 + Math.random() * 150}px`;
  cloud.style.height = `${60 + Math.random() * 40}px`;
  cloud.style.top = `${50 + Math.random() * 200}px`;
  cloud.style.left = `${-300 + Math.random() * 100}px`;
  cloud.style.animationDuration = `${40 + Math.random() * 40}s`;
  document.body.appendChild(cloud);
}

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
  star.style.top = `${Math.random() * 50}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDelay = `${Math.random() * 2}s`;
  document.body.appendChild(star);
}
const targetDate = new Date(
  new Date("2025-11-14T00:00:00").toLocaleString("en-US", { timeZone: "Africa/Tripoli" })
);

const countdownEl = document.getElementById("countdown");
const countdownContainer = document.getElementById("countdown-container");
const heartContainer = document.getElementById("heart-container");
const heart = document.getElementById("heart");
const messageContainer = document.getElementById("message");
let clickCount = 0;

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownContainer.style.display = "none";
    document.getElementById("secret-container").style.display = "block";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

const correctCode = "POOKIE";
const checkButton = document.getElementById("check-code");
const secretInput = document.getElementById("secret-code");
const wrongText = document.getElementById("wrong-code");

checkButton.addEventListener("click", () => {
  if (secretInput.value.trim().toUpperCase() === correctCode) {
    const heartBtn = document.getElementById("check-code");
heartBtn.addEventListener("click", () => {
  heartBtn.style.animation = "pulse 0.6s ease-in-out 1";
  setTimeout(() => {
    heartBtn.style.animation = "";
  }, 600);
});

    document.getElementById("secret-container").style.display = "none";
    heartContainer.style.display = "block";
  } else {
    wrongText.style.display = "block";
    secretInput.value = "";
  }
});

heart.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 1) {
    heart.classList.add("grow");
  } else if (clickCount === 2) {
    heart.style.transform = "scale(2)";
  } else {
    heart.classList.add("explode");
    setTimeout(() => {
      heartContainer.style.display = "none";
      showMessageAndConfetti();
    }, 800);
  }
});

function showMessageAndConfetti() {
  messageContainer.style.display = "block";
  launchConfetti();
  const music = document.getElementById("birthday-music");
  music.volume = 0.5;
  music.play();
}

function launchConfetti() {
  const colors = ["#ff3366", "#ff99aa", "#ffe066", "#66ff99", "#66ccff"];
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.opacity = 0.9;
    confetti.style.borderRadius = "50%";
    document.body.appendChild(confetti);

    const animationDuration = Math.random() * 3000 + 2000;

    confetti.animate(
      [
        { transform: "translateY(0px) rotate(0deg)" },
        { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)` }
      ],
      { duration: animationDuration, iterations: 1, easing: "linear" }
    );

    setTimeout(() => confetti.remove(), animationDuration);
  }
}

