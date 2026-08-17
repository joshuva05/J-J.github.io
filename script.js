const opening = document.getElementById('opening');
const openBtn = document.getElementById('openBtn');
const site = document.getElementById('site');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let autoScrollId = null;

// Function to stop auto scrolling when user interacts
function stopAutoScroll() {
    if (autoScrollId !== null) {
        cancelAnimationFrame(autoScrollId);
        autoScrollId = null;
    }
}

openBtn.onclick = () => {
    opening.classList.add('hide');
    site.style.display = 'block';
    document.body.style.overflow = 'auto';
    music.play().catch(() => { });
    musicBtn.innerHTML = '❚❚ <span>Music</span>';

    // Increased auto scroll speed (~2.5px per frame / ~150px per second)
    const scrollSpeed = 2.5;
    function autoScrollStep() {
        window.scrollBy(0, scrollSpeed);
        autoScrollId = requestAnimationFrame(autoScrollStep);
    }
    autoScrollId = requestAnimationFrame(autoScrollStep);

    ['wheel', 'touchmove', 'mousedown', 'keydown'].forEach(evt => {
        window.addEventListener(evt, stopAutoScroll, { once: true });
    });
};

document.body.style.overflow = 'hidden';

musicBtn.onclick = () => {
    if (music.paused) {
        music.play().catch(() => { });
        musicBtn.innerHTML = '❚❚ <span>Music</span>';
    } else {
        music.pause();
        musicBtn.innerHTML = '♪ <span>Music</span>';
    }
};

const weddingDate = new Date('2026-09-04T16:30:00+05:30').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
    let x = Math.max(0, weddingDate - Date.now());
    let d = Math.floor(x / 86400000);
    x %= 86400000;
    let h = Math.floor(x / 3600000);
    x %= 3600000;
    let m = Math.floor(x / 60000);
    let s = Math.floor(x / 1000) % 60;

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
    es => es.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(e => observer.observe(e));