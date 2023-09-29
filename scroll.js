// animation for slide class
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
});

window.addEventListener('scroll', function() {
    animateSlides('.slide');
});

// animation for pills & cloud classes
function animatePills(selector) {
    const pills = document.querySelectorAll(selector);
    const maxScroll = window.innerHeight;
    let maxPosition = 0;
    var speed = 0.5

    function updateMaxPosition() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            speed = 0.7;
            maxPosition = (screenWidth - pills[0].offsetWidth) / 2.5;
        } else {
            maxPosition = (screenWidth - pills[0].offsetWidth) / 2;
        }
    }

    updateMaxPosition();

    function animate() {
        pills.forEach(function(pill) {
            var screenWidth = window.innerWidth;
            var pillTop = pill.getBoundingClientRect().top;
            var pillHeight = pill.offsetHeight;
            const pillDistance = maxScroll - pillTop;
            var scrollPercentage = pillDistance / maxScroll - 0.25;
            if (screenWidth < 768) {
                var scrollPercentage = pillDistance / maxScroll - 0.3;
            } else if (screenWidth < 1200) {
                var scrollPercentage = pillDistance / maxScroll - 0.19;
            } else {
                var scrollPercentage = pillDistance / maxScroll;
            }
            var pillPosition = (1 - Math.pow(1 - scrollPercentage, 1.5)) * maxPosition * speed;

            if (pillPosition > maxPosition) {
                pillPosition = maxPosition;
            }

            pill.style.transform = `translateX(${pillPosition}px)`;

            if (pillTop < window.innerHeight - pillHeight) {
                pill.classList.add('animate');
            } else {
                pill.classList.remove('animate');
            }
        });
    }

    window.addEventListener('resize', function() {
        updateMaxPosition();
        animate();
    });

    window.addEventListener('scroll', animate);

    animate();
}

window.addEventListener('load', function() {
    animatePills('.pills');
    animatePills('.cloud');
});


// change the color of the navbar after start scrolling

function changeNavColor() {
    var navbar = document.getElementById('navbar');

    if (window.scrollY > 70) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', changeNavColor);



// highlight navbar section when scrolling on section class active
var activeLink = null;
var prevLink = null;

function activeNavColor() {
    var navbar = document.getElementById('navbar');
    var topsec = document.getElementById('topsec');
    var midsec = document.getElementById('midsec');
    var bottomsec = document.getElementById('bottomsec');

    var navHeight = navbar.offsetHeight;
    var topsecOffset = topsec.offsetTop - navHeight;
    var midsecOffset = midsec.offsetTop - navHeight;
    var bottomsecOffset = bottomsec.offsetTop - navHeight;
    var midsecHeight = midsec.offsetHeight;
    var bottomsecHeight = bottomsec.offsetHeight;

    if (window.scrollY >= topsecOffset && window.scrollY < (midsecOffset - 1)) {
        activeLink = activateLink(navbar, 'nav-about');
        deactivateLinks(navbar, activeLink, 'nav-projects');
        deactivateLinks(navbar, activeLink, 'nav-contact');
    } else if (window.scrollY >= midsecOffset && window.scrollY < (bottomsecOffset - 1)) {
        activeLink = activateLink(navbar, 'nav-projects');
        deactivateLinks(navbar, activeLink, 'nav-about');
        deactivateLinks(navbar, activeLink, 'nav-contact');
    } else if (window.scrollY >= bottomsecOffset - 1) {
        activeLink = activateLink(navbar, 'nav-contact');
        deactivateLinks(navbar, activeLink, 'nav-projects');
        deactivateLinks(navbar, activeLink, 'nav-about');
    }

    prevLink = activeLink;
}


function activateLink(navbar, target) {
    var link = navbar.querySelector('#' + target + ' a');
    var linkParent = link.parentNode;
    if (linkParent.classList.contains('active')) {
        return linkParent;
    } else {
        linkParent.classList.add('active');
        return linkParent;
    }
}


function deactivateLinks(navbar, activeLink, target) {
    var links = navbar.querySelectorAll('.navbtn li');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link !== activeLink && link.classList.contains('active')) {
            link.classList.remove('active');
        }
        if (link.querySelector('a').getAttribute('href') === '#' + target) {
            prevLink = link;
        }
    }
}

window.addEventListener('scroll', activeNavColor);

//////////**********************load screen*************************//////////// 
setTimeout(function() {
    const loadingScreen = document.querySelector('.loading');
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');

    window.addEventListener('load', function() {
        loadingScreen.classList.add('hidden');
    });

}, 500);
window.addEventListener('scroll', parallaxEffect);

function parallaxEffect() {
    const parallaxElement = document.querySelector('.parallax');
    const scrollPosition = window.pageYOffset;

    // Adjust the parallax effect by changing the value (0.5 in this example)
    const parallaxValue = scrollPosition * 0.1;

    // Update the transform property to apply the parallax effect
    parallaxElement.style.transform = `translateY(${parallaxValue}px)`;
}

