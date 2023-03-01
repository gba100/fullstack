function animateSlides(selector) {
    const elements = document.querySelectorAll(selector);
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    elements.forEach(function(element) {
        const boxTop = element.getBoundingClientRect().top + scrollTop;
        if (boxTop < (scrollTop + windowHeight) && boxTop > scrollTop) {
            element.classList.add('animate');
        } else {
           /* element.classList.remove('animate');
                        element.classList.add('hide');
            
            setTimeout(function() {
                element.classList.remove('hide');
            }, 800);*/
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


function animatePills(selector, speed) {
    const pills = document.querySelectorAll(selector);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const maxPosition = (window.innerWidth - pills[0].offsetWidth) /7;
    const maxSpeed = 90;
  
    pills.forEach(function(pill) {
      const pillTop = pill.getBoundingClientRect().top;
      const pillHeight = pill.offsetHeight;
      const pillDistance = maxScroll - pillTop;
      const scrollPercentage = pillDistance / maxScroll;
      const pillPosition = (1 - Math.pow(1 - scrollPercentage, 1.5)) * maxPosition * speed;
      pill.style.transform = `translateX(${pillPosition}px)`;
      if (pillTop < window.innerHeight - pillHeight) {
        pill.classList.add('animate');
      } else {
        pill.classList.remove('animate');
      }
    });
  }
  
  window.addEventListener('load', function() {
    animatePills('.pills', 0.8);
  });
  
  window.addEventListener('scroll', function() {
    animatePills('.pills', 0.3);
  });
  
  