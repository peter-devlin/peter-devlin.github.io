// Shared fade-in + glow/particle + tooltip system

function initTooltips() {
  document.querySelectorAll('.emphasis').forEach(el => {
    const tipSrc = el.querySelector('.emphasis-tooltip');
    if (!tipSrc) return;

    // Move tooltip to body so it's not affected by parent transforms
    const tip = tipSrc.cloneNode(true);
    document.body.appendChild(tip);
    tipSrc.remove();

    function positionTip(e) {
      const tipW = tip.offsetWidth;
      const tipH = tip.offsetHeight;
      let left = e.clientX - tipW / 2;
      let top = e.clientY - tipH - 16;
      if (left < 8) left = 8;
      if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
      if (top < 8) top = e.clientY + 20;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }

    const fullText = tip.textContent;
    let typeTimer = null;

    el.addEventListener('mouseenter', (e) => {
      positionTip(e);
      tip.style.opacity = '1';
      tip.textContent = '';
      let i = 0;
      clearInterval(typeTimer);
      typeTimer = setInterval(() => {
        tip.textContent = fullText.slice(0, i + 1);
        i++;
        if (i >= fullText.length) clearInterval(typeTimer);
      }, 12);
    });
    el.addEventListener('mouseleave', () => {
      tip.style.opacity = '0';
      clearInterval(typeTimer);
      tip.textContent = '';
    });
    el.addEventListener('mousemove', positionTip);
  });
}

function initFadeIns() {
  let delay = 0;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), delay);
        delay += 80;
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

function initEffects() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, mx = -1000, my = -1000;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const sparks = [];

  const GREEN = [130, 170, 130];
  const RED = [210, 150, 150];
  const BLUE = [144, 168, 208];

  const glowEls = [];
  document.querySelectorAll('.emphasis').forEach(el => glowEls.push({ el, color: GREEN }));
  document.querySelectorAll('.inline-link').forEach(el => glowEls.push({ el, color: BLUE }));
  document.querySelectorAll('.nav-left a').forEach(el => glowEls.push({ el, color: RED }));
  document.querySelectorAll('.social-icon').forEach(el => glowEls.push({ el, color: RED }));

  function emit(x, y, color) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.6 + 0.1;
    sparks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.012 + Math.random() * 0.01,
      r: Math.random() * 1.2 + 0.4,
      color,
    });
  }

  let activeEl = null;
  let emitTimer = null;

  glowEls.forEach(({ el, color }) => {
    el.addEventListener('mouseenter', () => {
      activeEl = { el, color };
      emitTimer = setInterval(() => { emit(mx, my, color); }, 80);
    });
    el.addEventListener('mouseleave', () => {
      activeEl = null;
      clearInterval(emitTimer);
    });
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    if (activeEl) {
      const c = activeEl.color;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
      grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},0.12)`);
      grad.addColorStop(0.5, `rgba(${c[0]},${c[1]},${c[2]},0.04)`);
      grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(mx - 80, my - 80, 160, 160);
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }

      const a = s.life * 0.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a * 0.25})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
