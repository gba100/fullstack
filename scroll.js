function animateSlides(selector) {
    const elements = document.querySelectorAll(selector);
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    elements.forEach(function(element) {
        const boxTop = element.getBoundingClientRect().top + scrollTop;
        if (boxTop < (scrollTop + windowHeight) && boxTop > scrollTop) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
            element.classList.add('hide');
            setTimeout(function() {
                element.classList.remove('hide');
            }, 800);
        }
    });
}

window.addEventListener('load', function() {
    animateSlides('.slide');
    animateSlides('.pills');
});

window.addEventListener('scroll', function() {
    animateSlides('.slide');
    animateSlides('.pills');
});
