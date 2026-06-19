// ============= CONFIGURAÇÕES =============
const weddingDate = new Date("Jun 27, 2026 08:30:00").getTime();

// ============= PLAYER DE ÁUDIO =============
const audio = document.getElementById("music");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");
const volumeControl = document.getElementById("volumeControl");

// Play/Pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML =
      '<img class="ajust-pause" src="./public/pause1.png" />';
  } else {
    audio.pause();
    playPauseBtn.innerHTML =
      '<img class="ajust-pause" src="./public/play.png" />';
  }
});

// Atualizar barra de progresso
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100 || 0;
  progressBar.value = progress;

  // Atualizar gradiente da barra
  progressBar.style.background = `linear-gradient(to right, #5d7248 0%, #5d7248 ${progress}%, #ddd ${progress}%, #ddd 100%)`;

  // Atualizar tempo
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

// Controlar progresso ao clicar
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});

// Controlar volume
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Resetar ao terminar
audio.addEventListener("ended", () => {
  playPauseBtn.innerHTML =
    '<img class="ajust-pause" src="./public/play.png" />';
});

// ============= COUNTDOWN =============
function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

// Atualizar countdown a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// ============= CARROSSEL =============
const carouselTrack = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");

let currentSlide = 0;
const totalSlides = slides.length;

// Criar dots
function createDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentSlide ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Atualizar carrossel
function updateCarousel() {
  // Mover o track
  const offset = -currentSlide * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;

  // Atualizar dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Ir para slide específico
function goToSlide(index) {
  currentSlide = index;
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  updateCarousel();
}

// Botões de navegação
prevBtn.addEventListener("click", () => {
  currentSlide--;
  goToSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide++;
  goToSlide(currentSlide);
});

// Navegação com teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  }
});

document.getElementById("copyPixBtn").addEventListener("click", async () => {
  const texto = document.getElementById("pixText").textContent;
  try {
    await navigator.clipboard.writeText(texto);
    alert("PIX copiado com sucesso!");
  } catch {
    // Fallback para navegadores antigos
    const input = document.createElement("input");
    input.value = texto;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert("PIX copiado com sucesso 💚");
  }
});

// Inicializar
createDots();
updateCarousel();
