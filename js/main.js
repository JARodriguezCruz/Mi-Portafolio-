/* =====================================================
   PORTFOLIO - Jonathan A. Rodriguez Cruz
   js/main.js
   ===================================================== */

/* ─────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .fb, .pc, .srv').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width   = '18px';
    cur.style.height  = '18px';
    curR.style.width  = '54px';
    curR.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width   = '10px';
    cur.style.height  = '10px';
    curR.style.width  = '36px';
    curR.style.height = '36px';
  });
});

/* ─────────────────────────────────────────
   2. NAVBAR — shrink on scroll
───────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', window.scrollY > 50);
});

/* ─────────────────────────────────────────
   3. SCROLL REVEAL
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 70);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rev').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   4. SKILL BARS ANIMATION
───────────────────────────────────────── */
const barsSection = document.querySelector('.h-bars');

if (barsSection) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w;
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  barObserver.observe(barsSection);
}

/* ─────────────────────────────────────────
   5. TERMINAL TYPER
───────────────────────────────────────── */
const terminalLines = [
  { prompt: '~$', cmd: 'cat sobre-mi.json' },
  { out: '<span class="t-key">{</span>' },
  { out: '&nbsp;&nbsp;<span class="t-key">"nombre"</span>: <span class="t-str">"Jonathan A. Rodriguez Cruz"</span>,' },
  { out: '&nbsp;&nbsp;<span class="t-key">"rol"</span>: <span class="t-str">"Jr Full Stack Java Dev"</span>,' },
  { out: '&nbsp;&nbsp;<span class="t-key">"formacion"</span>: <span class="t-str">"EBAC - Udemy"</span>,' },
  { out: '&nbsp;&nbsp;<span class="t-key">"repos"</span>: <span class="t-num">13</span>,' },
  { out: '&nbsp;&nbsp;<span class="t-key">"stack"</span>: [<span class="t-str">"Java"</span>, <span class="t-str">"Spring"</span>, <span class="t-str">"JS"</span>],' },
  { out: '&nbsp;&nbsp;<span class="t-key">"open_to_work"</span>: <span class="t-val">true</span>' },
  { out: '<span class="t-key">}</span>' },
  { prompt: '~$', cmd: '' },
];

const termBody = document.getElementById('termBody');
let lineIndex = 0;
let charIndex = 0;

function typeTerminal() {
  if (lineIndex >= terminalLines.length) return;

  const line = terminalLines[lineIndex];

  // Output line (no typing effect)
  if (line.out !== undefined) {
    termBody.innerHTML += `<div class="t-line"><span class="t-out">${line.out}</span></div>`;
    lineIndex++;
    setTimeout(typeTerminal, 85);
    return;
  }

  // Command line (typing effect)
  const text = line.cmd;
  if (charIndex <= text.length) {
    const rows = [...termBody.querySelectorAll('.t-line')];
    const lastRow = rows[rows.length - 1];

    if (lastRow && lastRow.dataset.typing) {
      lastRow.innerHTML = `
        <span class="t-prompt">${line.prompt}</span>
        <span style="color:var(--text)">${text.slice(0, charIndex)}<span class="t-cursor"></span></span>
      `;
    } else {
      termBody.innerHTML += `
        <div class="t-line" data-typing="1">
          <span class="t-prompt">${line.prompt}</span>
          <span style="color:var(--text)">${text.slice(0, charIndex)}<span class="t-cursor"></span></span>
        </div>
      `;
    }
    charIndex++;
    setTimeout(typeTerminal, 55);
  } else {
    // Remove typing marker from last row
    const rows = [...termBody.querySelectorAll('.t-line')];
    const lastRow = rows[rows.length - 1];
    if (lastRow) lastRow.removeAttribute('data-typing');

    lineIndex++;
    charIndex = 0;
    setTimeout(typeTerminal, 180);
  }
}

setTimeout(typeTerminal, 900);

/* ─────────────────────────────────────────
   6. PORTFOLIO FILTER
───────────────────────────────────────── */
function filterProjects(category, btn) {
  // Update active button
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.pc').forEach(card => {
    const show = category === 'all' || card.dataset.cat === category;
    card.style.display = show ? '' : 'none';
  });
}

/* ─────────────────────────────────────────
   7. CONTACT FORM
───────────────────────────────────────── */
function handleSubmit(event) {
  event.preventDefault();

  const submitBtn = event.target.querySelector('.f-submit');
  const successMsg = document.getElementById('fok');

  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  // Simulated send delay
  setTimeout(() => {
    successMsg.style.display = 'block';
    event.target.reset();
    submitBtn.textContent = '✓ ¡Enviado!';
    submitBtn.style.background = 'var(--accent3)';
  }, 1500);
}

/* ─────────────────────────────────────────
   8. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  document.querySelectorAll('.n-links a').forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--text)'
      : '';
  });
});
