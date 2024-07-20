function slide(rowId, direction) {
    const row = document.getElementById(rowId);
    const scrollAmount = direction * 400;
    row.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

let currentIndex = 0;

function showSlide(index) {
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

if (index >= totalSlides) {
    currentIndex = 0;
} else if (index < 0) {
    currentIndex = totalSlides - 1;
} else {
    currentIndex = index;
}

const carouselInner = document.querySelector('.carousel-inner');
const offset = -currentIndex * 100; // Calculate the offset for the current slide
carouselInner.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
showSlide(currentIndex + 1);
}

function prevSlide() {
showSlide(currentIndex - 1);
}

document.addEventListener('DOMContentLoaded', () => {
showSlide(currentIndex);
setInterval(() => {
    nextSlide();
}, 5000);
});
