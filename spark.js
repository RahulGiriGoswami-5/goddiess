// ---- CLICK SPARK ANIMATION (simple straight lines, small) ----

(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'spark-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 999998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let sparks = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createSpark(x, y) {
        const count = 6;
        const length = 8; // small expansion distance
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            sparks.push({
                x, y,
                angle,
                length,
                life: 1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks.forEach(s => {
            const dist = s.length * (1 - s.life) + 2;
            const x1 = s.x + Math.cos(s.angle) * dist;
            const y1 = s.y + Math.sin(s.angle) * dist;
            const x2 = s.x + Math.cos(s.angle) * (dist + 6);
            const y2 = s.y + Math.sin(s.angle) * (dist + 6);

            ctx.globalAlpha = Math.max(s.life, 0);
            ctx.strokeStyle = '#088178';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            s.life -= 0.07;
        });
        sparks = sparks.filter(s => s.life > 0);
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('click', (e) => {
        createSpark(e.clientX, e.clientY);
    });
})();