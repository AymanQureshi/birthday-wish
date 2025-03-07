// ===== Dark Mode Toggle =====
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ===== Music Player =====
const playMusicBtn = document.getElementById("playMusic");
const birthdayAudio = document.getElementById("birthdayAudio");
let musicPlaying = false;
playMusicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    birthdayAudio.play();
    playMusicBtn.textContent = "Pause Birthday Tune";
    musicPlaying = true;
  } else {
    birthdayAudio.pause();
    playMusicBtn.textContent = "Play Birthday Tune";
    musicPlaying = false;
  }
});

// ===== Live Wishes Feed =====
const wishesFeed = document.getElementById('wishesFeed');
const randomWishes = [
  "🚑🚑🚑🚑🚑🚑 Happy birthdayyy aniswaa!",
  "Yayayyayyyy! Another year of being awesome, Anish!",
  "HAPPPPYY BIRTHDAYYY ANISS! 🎉🎂",
  "Love you rahega, birthday boy!",
  "🏍️🏍️🏍️🏍️🏍️🏍️ Happy Birthday, Anish!",
  "Happy birthday, Anish! May your day be filled with more fun than a barrel of monkeys... or at least a small zoo.",
  "Wishing you a birthday that's as bright as your future and as fun as your past!",
  "Happy Birthday! Don't count the candles, just make a wish and hope for the best.",
  "Another year older, wiser, and still refusing to act your age. Happy Birthday, Anish!",
  "Happy Birthday! May your day be as sweet as cake and your year even sweeter.",
  "Is it your birthday or did the sun just rise? Oh wait, it's you shining bright!",
  "They say birthdays are nature's way of telling us to eat more cake. Who am I to argue? Happy Birthday, Anish!",
  "Happy Birthday! May your day be loaded with happiness and laughter.",
  "Officially declaring today 'Anish Appreciation Day'! Double celebration!",
  "Happy Birthday! Wishing you endless joy and creativity."
];
let wishesIndex = 0;
function addWish() {
  const wishItem = document.createElement('div');
  wishItem.classList.add('wish-item');
  wishItem.innerHTML = randomWishes[wishesIndex];
  wishesFeed.prepend(wishItem);
  wishesIndex = (wishesIndex + 1) % randomWishes.length;
  if (wishesFeed.children.length > 6) {
    wishesFeed.removeChild(wishesFeed.lastChild);
  }
}
setInterval(addWish, 2500);
addWish(); // initial call

// ===== Memory Wall Functionality =====
document.getElementById('messageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();
  if (!name || !message) return;
  
  // Create memory card
  const card = document.createElement('div');
  card.classList.add('memory-card');
  
  // Create inner container for flip effect
  const cardInner = document.createElement('div');
  cardInner.classList.add('memory-card-inner');
  
  // Front side shows name
  const cardFront = document.createElement('div');
  cardFront.classList.add('memory-card-front');
  cardFront.textContent = name;
  
  // Back side shows memory message
  const cardBack = document.createElement('div');
  cardBack.classList.add('memory-card-back');
  cardBack.textContent = message;
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  
  // Toggle flip on click
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  
  document.querySelector('.memory-wall').prepend(card);
  document.getElementById('messageForm').reset();
});

// ===== Confetti Animation =====
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confetti = [];
const confettiColors = ["#C94C82", "#E07A99", "#FFB6C1", "#FADCD9"];
let animatingConfetti = false;
function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 6 + 4,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    velocityX: Math.random() * 2 - 1,
    velocityY: Math.random() * 4 + 2,
    rotation: Math.random() * 360
  };
}
function generateConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push(createConfettiPiece());
  }
}
function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((piece, index) => {
    piece.x += piece.velocityX;
    piece.y += piece.velocityY;
    piece.rotation += Math.random() * 4;
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.beginPath();
    ctx.arc(0, 0, piece.size, 0, 2 * Math.PI);
    ctx.fillStyle = piece.color;
    ctx.fill();
    ctx.restore();
    if (piece.y > canvas.height) {
      confetti.splice(index, 1);
    }
  });
  if (confetti.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animatingConfetti = false;
  }
}
function startConfetti() {
  if (animatingConfetti) return;
  animatingConfetti = true;
  confetti = [];
  generateConfetti();
  animateConfetti();
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== Gallery Slider Functionality =====
const slidesContainer = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  slideIndex = index;
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}
prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
setInterval(() => {
  showSlide(slideIndex + 1);
}, 5000);
  
// ===== Floating Balloons =====
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  const pastelColors = ["#F9CACA", "#A0D9FF", "#FFFFAA", "#C1FFD7", "#D0BFFF"];
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  balloon.style.background = randomColor;
  const xPos = Math.random() * window.innerWidth;
  balloon.style.left = `${xPos}px`;
  const duration = 8 + Math.random() * 5;
  balloon.style.animationDuration = `${duration}s`;
  const scale = 0.8 + Math.random() * 0.4;
  balloon.style.transform = `scale(${scale})`;
  document.querySelector('.balloons-container').appendChild(balloon);
  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });
}
setInterval(createBalloon, 1500);
