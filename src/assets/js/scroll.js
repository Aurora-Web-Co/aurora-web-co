(() => {
    const wrapper = document.querySelector('.horiz-scroll-wrapper');
    const panels  = document.querySelector('.horiz-panels');
    const ruler   = document.querySelector('.scroll-nav-ruler');
    const cursor  = document.querySelector('.scroll-nav-cursor');
    if (!wrapper || !panels) return;

    const labels   = ['Services', 'Aurora Web Co', 'About Me'];
    const panelBg  = '#0f0f1a';
    const N        = labels.length;

    let currentPanel  = 0;
    let transitioning = false;
    let lastIdx       = -1;
    let counterDone   = false;
    let codeDone      = false;

    function getProgress() {
        if (window.innerWidth < 1024) return -1;
        const scrollable = wrapper.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return -1;
        const top = wrapper.getBoundingClientRect().top;
        return Math.max(0, Math.min(1, -top / scrollable));
    }

    // Returns true when the wrapper is pinned (sticky track is active)
    function isActive() {
        if (window.innerWidth < 1024) return false;
        const rect = wrapper.getBoundingClientRect();
        return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    }

    function scrollToPanel(index) {
        transitioning = true;
        currentPanel  = index;
        const p          = index / (N - 1);
        const scrollable = wrapper.offsetHeight - window.innerHeight;
        const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
        const targetY    = wrapperTop + p * scrollable;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        setTimeout(() => { transitioning = false; }, 900);
    }

    function update() {
        const p = getProgress();
        if (p < 0) {
            panels.style.transform = '';
            return;
        }

        // Sync currentPanel from scroll position (handles manual scroll / resize)
        if (!transitioning) {
            currentPanel = Math.round(p * (N - 1));
        }

        if (currentPanel === 1 && !counterDone) {
            counterDone = true;
            const el = document.querySelector('#RPsbs-313 .cs-number');
            if (el) {
                let start = null;
                const duration = 1500;
                function step(ts) {
                    if (!start) start = ts;
                    const progress = Math.min((ts - start) / duration, 1);
                    el.textContent = Math.floor(progress * 100) + '%';
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            }
        }

        if (currentPanel === 2 && !codeDone) {
            codeDone = true;
            const block = document.querySelector('.cs-code-block');
            if (block) block.classList.add('is-animating');
        }

        panels.style.transform = `translateX(${-p * wrapper.offsetWidth * (N - 1)}px)`;

        if (ruler && cursor) {
            const max = ruler.offsetWidth - cursor.offsetWidth;
            cursor.style.left = Math.max(0, p * max) + 'px';

            const idx = Math.min(N - 1, Math.floor(p * N));
            if (idx !== lastIdx) {
                cursor.textContent = labels[idx];
                cursor.style.background = panelBg;
                lastIdx = idx;
            }
        }
    }

    // Hijack wheel events while inside the horizontal scroll section
    window.addEventListener('wheel', (e) => {
        if (!isActive()) return;
        if (transitioning) { e.preventDefault(); return; }

        if (e.deltaY > 0 && currentPanel < N - 1) {
            e.preventDefault();
            scrollToPanel(currentPanel + 1);
        } else if (e.deltaY < 0 && currentPanel > 0) {
            e.preventDefault();
            scrollToPanel(currentPanel - 1);
        }
    }, { passive: false });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    // Mobile fallback: panels aren't translated on small screens,
    // so use IntersectionObserver to trigger the reveal when the
    // code block scrolls into view.
    const codeBlock = document.querySelector('.cs-code-block');
    if (codeBlock) {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting && !codeDone) {
                codeDone = true;
                codeBlock.classList.add('is-animating');
                obs.disconnect();
            }
        }, { threshold: 0.2 }).observe(codeBlock);
    }
})();
