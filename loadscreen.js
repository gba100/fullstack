//////////**********************load screen*************************//////////// 
setTimeout(function() {
    const loadingScreen = document.querySelector('.loading');
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    loadingScreen.appendChild(spinner);

    window.addEventListener('load', function() {
        loadingScreen.classList.add('hidden');
    });

    requestAnimationFrame(function() {
        loadingScreen.classList.add('hidden');
    });

}, 500);
window.addEventListener('scroll', parallaxEffect);
