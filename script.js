// Efeito de sombra no cabecalho ao rolar a pagina
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Revelar elementos ao rolar a pagina (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // observer.unobserve(entry.target); // Descomente para animar apenas 1 vez
        }
    });
};

const revealOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Scroll suave com compensacao do cabecalho fixo
function smoothScrollTo(targetPosition, duration = 700) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function easeInOutCubic(progress) {
        return progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        

        if (targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            smoothScrollTo(offsetPosition);

            history.pushState(null, '', targetId);
        }
    });
});

// Efeito Parallax em elementos com a classe .parallax
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    let scrollPosition = window.pageYOffset;

    parallaxElements.forEach(function(el) {
        // velocidade pode ser definida por um atributo data-speed="0.5"
        let speed = el.getAttribute('data-speed') || 0.5;
        // deslocamento no eixo Y
        el.style.transform = 'translateY(' + (scrollPosition * speed) + 'px)';
    });
});

