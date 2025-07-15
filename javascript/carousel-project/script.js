const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
let autoPlayInterval;
const slideCount = slides.length;

function updateSlidePosition() {
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function showNext() {
  index = (index + 1) % slideCount;
  updateSlidePosition();
}

function showPrev() {
  index = (index - 1 + slideCount) % slideCount;
  updateSlidePosition();
}

nextBtn.addEventListener("click", () => {
  showNext();
  resetAutoplay();
});

prevBtn.addEventListener("click", () => {
  showPrev();
  resetAutoplay();
});

// ⏱️ Autoplay
function startAutoplay() {
  autoPlayInterval = setInterval(showNext, 3000);
}

function resetAutoplay() {
  clearInterval(autoPlayInterval);
  startAutoplay();
}

// 🤳 Swipe Support
let startX = 0;

slidesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) showNext();
  if (endX - startX > 50) showPrev();
  resetAutoplay();
});

startAutoplay();
