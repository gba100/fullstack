const carouselItems = document.querySelectorAll('.carousel-item');
const totalCarouselItems = carouselItems.length;
let currentCarouselItem = 0;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// show carousel item with fade-in animation
function showCarouselItem() {
    carouselItems.forEach(function(item) {
        item.classList.remove('active');
        item.style.opacity = '0';
    });

    carouselItems[currentCarouselItem].classList.add('active');
    carouselItems[currentCarouselItem].style.opacity = '1';
}

// handle click events
prevBtn.addEventListener('click', function() {
    currentCarouselItem--;
    if (currentCarouselItem < 0) {
        currentCarouselItem = totalCarouselItems - 1;
    }
    showCarouselItem();
});

nextBtn.addEventListener('click', function() {
    currentCarouselItem++;
    if (currentCarouselItem >= totalCarouselItems) {
        currentCarouselItem = 0;
    }
    showCarouselItem();
});

// show initial carousel item with fade-in animation
showCarouselItem();