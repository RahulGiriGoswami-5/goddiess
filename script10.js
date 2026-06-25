const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const loaderLogo = document.getElementById('loader-logo');
        const realLogo = document.querySelector('a.logo');
        const realRect = realLogo.getBoundingClientRect();
        const loaderRect = loaderLogo.getBoundingClientRect();

        const fromCX = loaderRect.left + loaderRect.width / 2;
        const fromCY = loaderRect.top + loaderRect.height / 2;

        const toCX = realRect.left + realRect.width / 2;
        const toCY = realRect.top + realRect.height / 2;

        loaderLogo.style.margin = '0';
        loaderLogo.style.top = fromCY + 'px';
        loaderLogo.style.left = fromCX + 'px';
        loaderLogo.style.transform = 'translate(-50%, -50%)';
        loaderLogo.style.transition =
            'top 1s ease, left 1s ease, font-size 1s ease, opacity 0.8s ease 0.5s';

        // CREATE 3 TAIL ELEMENTS (bigger, glowing, genuinely lagging behind)
        const colors = [
            'rgba(205, 110, 50, 0.9)',
            'rgba(225, 145, 75, 0.7)',
            'rgba(180, 80, 30, 0.5)'
        ];

        const tailEls = colors.map((color, i) => {
            const t = document.createElement('div');
            const size = 22 - i * 4;
            t.style.cssText = `
                position: fixed;
                top: ${fromCY}px;
                left: ${fromCX}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: ${color};
                box-shadow: 0 0 12px 2px ${color};
                transform: translate(-50%, -50%);
                z-index: 100000;
                pointer-events: none;
                transition: top 1.3s ease ${0.15 + i * 0.18}s,
                            left 1.3s ease ${0.15 + i * 0.18}s,
                            width 1.3s ease ${0.15 + i * 0.18}s,
                            height 1.3s ease ${0.15 + i * 0.18}s,
                            opacity 1.3s ease ${0.15 + i * 0.18}s;
                opacity: 1;
            `;
            document.body.appendChild(t);
            return t;
        });

        loader.style.transition = 'opacity 1s ease 0.3s';
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';

        requestAnimationFrame(() => {
            loaderLogo.style.top = toCY + 'px';
            loaderLogo.style.left = toCX + 'px';
            loaderLogo.style.fontSize = '32px';
            loaderLogo.style.opacity = '0';

            tailEls.forEach(t => {
                t.style.top = toCY + 'px';
                t.style.left = toCX + 'px';
                t.style.width = '0px';
                t.style.height = '0px';
                t.style.opacity = '0';
            });
        });

        // cleanup after animation finishes
        setTimeout(() => {
            loader.classList.add('hide');
            document.body.classList.remove('loading');
            tailEls.forEach(t => t.remove());
        }, 1900);

    }, 400);
});