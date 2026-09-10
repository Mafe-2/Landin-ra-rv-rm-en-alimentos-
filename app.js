/* ==========================================================================
   FoodXR - Script Principal de Interacciones y Simulador Canvas
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSidebar();
  initCatalogFilters();
  initSearchFilter();
  initNavHighlighting();
  initInteractiveSimulator();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. GESTIÓN DE TEMA CLARO / OSCURO
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const htmlEl = document.documentElement;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('foodxr_theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('foodxr_theme', newTheme);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Modo Oscuro';
    } else {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Modo Claro';
    }
  }
}

/* --------------------------------------------------------------------------
   2. CONTROLES DE LA BARRA LATERAL (SIDEBAR)
   -------------------------------------------------------------------------- */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  const toggleIcon = document.getElementById('toggleIcon');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
      toggleIcon.textContent = '▶';
    } else {
      toggleIcon.textContent = '◀';
    }
  });

  // Cerrar sidebar al hacer clic en nav links en móviles
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. FILTRADO DE SOLUCIONES INDUSTRIALES
   -------------------------------------------------------------------------- */
function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const solutionCards = document.querySelectorAll('.solution-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      solutionCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. BÚSQUEDA RÁPIDA DE CONTENIDOS Y MÓDULOS
   -------------------------------------------------------------------------- */
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const solutionCards = document.querySelectorAll('.solution-card');
  const techCards = document.querySelectorAll('.tech-card');

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    solutionCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? 'flex' : 'none';
    });

    techCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.opacity = text.includes(term) || term === '' ? '1' : '0.4';
    });
  });
}

/* --------------------------------------------------------------------------
   5. RESALTADO AUTOMÁTICO DE NAVEGACIÓN EN SCROLL
   -------------------------------------------------------------------------- */
function initNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. SIMULADOR INTERACTIVO (CANVAS 2D/3D CON VR/AR/MR)
   -------------------------------------------------------------------------- */
function initInteractiveSimulator() {
  const canvas = document.getElementById('simCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let currentMode = 'ar'; // ar, vr, mr
  let mouseX = 0;
  let mouseY = 0;

  // Ajustar resolución del Canvas
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Eventos de ratón para interactividad
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  // Botones de Modo
  const modeBtns = {
    ar: document.getElementById('simModeAR'),
    vr: document.getElementById('simModeVR'),
    mr: document.getElementById('simModeMR')
  };

  const hudModeText = document.getElementById('hudModeText');
  const hudTempText = document.getElementById('hudTempText');

  Object.keys(modeBtns).forEach(mode => {
    if (modeBtns[mode]) {
      modeBtns[mode].addEventListener('click', () => {
        Object.values(modeBtns).forEach(b => b.classList.remove('active'));
        modeBtns[mode].classList.add('active');
        currentMode = mode;

        if (mode === 'ar') {
          hudModeText.textContent = 'INSPECCIÓN AR (CADENA FRÍA)';
          hudModeText.style.color = 'var(--accent-ar)';
        } else if (mode === 'vr') {
          hudModeText.textContent = 'SIMULACIÓN VR (PLANTA UHT)';
          hudModeText.style.color = 'var(--accent-vr)';
        } else if (mode === 'mr') {
          hudModeText.textContent = 'HOLOGRAFÍA MR (MOLECULAR)';
          hudModeText.style.color = 'var(--accent-mr)';
        }
      });
    }
  });

  document.getElementById('resetSimBtn').addEventListener('click', () => {
    scanLineY = 0;
    particles = createParticles();
  });

  // Variables de Animación AR
  let beltOffset = 0;
  let scanLineY = 0;

  // Partículas MR
  function createParticles() {
    const p = [];
    for (let i = 0; i < 24; i++) {
      p.push({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        z: (Math.random() - 0.5) * 200,
        radius: Math.random() * 6 + 4,
        color: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)]
      });
    }
    return p;
  }
  let particles = createParticles();
  let angle = 0;

  // Bucle principal de Render
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    if (currentMode === 'ar') {
      renderARMode(ctx, w, h);
    } else if (currentMode === 'vr') {
      renderVRMode(ctx, w, h);
    } else if (currentMode === 'mr') {
      renderMRMode(ctx, w, h);
    }

    // Actualizar datos del HUD simulado
    const tempVal = (3.8 + Math.sin(Date.now() / 1000) * 0.4).toFixed(1);
    hudTempText.textContent = `${tempVal} °C`;

    animationFrameId = requestAnimationFrame(render);
  }

  // MODO AR: Inspección en Banda Transportadora
  function renderARMode(ctx, w, h) {
    // Fondo de Banda Transportadora
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Dibujar líneas de la banda transportadora en movimiento
    beltOffset = (beltOffset + 2) % 40;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    for (let x = -40 + beltOffset; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.7);
      ctx.lineTo(x + 20, h);
      ctx.stroke();
    }

    // Plataforma de Cinta
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, h * 0.65, w, h * 0.35);

    // Alimentos / Cajas pasando
    const boxWidth = 140;
    const boxHeight = 90;
    const boxY = h * 0.5;

    for (let i = 0; i < 3; i++) {
      const boxX = ((Date.now() / 15) + (i * 280)) % (w + boxWidth) - boxWidth;

      // Caja / Alimento
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
      ctx.fill();

      // Cuadrícula Térmica AR superpuesta
      const gradient = ctx.createLinearGradient(boxX, boxY, boxX + boxWidth, boxY + boxHeight);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.6)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.4)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(boxX + 5, boxY + 5, boxWidth - 10, boxHeight - 10, 8);
      ctx.fill();

      // Etiqueta AR flotante
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.fillText(`LOTE #${104 + i} | PASS`, boxX + 10, boxY - 12);
      ctx.fillText(`TEMP: 3.9°C`, boxX + 10, boxY + 25);

      // Marco HUD alrededor de la caja elegida por ratón
      if (mouseX > boxX && mouseX < boxX + boxWidth) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX - 5, boxY - 5, boxWidth + 10, boxHeight + 10);
      }
    }

    // Línea Láser de Escáner AR
    scanLineY = (scanLineY + 3) % (h * 0.7);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, scanLineY);
    ctx.lineTo(w, scanLineY);
    ctx.stroke();

    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(0, scanLineY - 15, w, 30);
  }

  // MODO VR: Simulación de Planta UHT (Tuberías e Hidráulica)
  function renderVRMode(ctx, w, h) {
    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, w, h);

    // Rejilla de Fondo VR
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Tanque Pasteurizador Principal
    const tankX = w * 0.5 - 90;
    const tankY = h * 0.2;
    const tankW = 180;
    const tankH = 240;

    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(tankX, tankY, tankW, tankH, 20);
    ctx.fill();
    ctx.stroke();

    // Fluido dentro del tanque (animado)
    const level = (Math.sin(Date.now() / 800) * 0.1 + 0.65) * tankH;
    ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.fillRect(tankX + 5, tankY + tankH - level, tankW - 10, level - 5);

    // Tuberías de Conexión
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 14;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(tankX, h * 0.5);
    ctx.moveTo(tankX + tankW, h * 0.5);
    ctx.lineTo(w, h * 0.5);
    ctx.stroke();

    // Indicador interactivo VR cerca del ratón
    ctx.fillStyle = '#3b82f6';
    ctx.font = '14px Outfit';
    ctx.fillText(`PRESION: 2.4 BAR`, tankX + 25, tankY - 15);
    ctx.fillText(`TEMP PASTEURIZACION: 72.5°C`, tankX + 5, tankY + tankH + 30);
  }

  // MODO MR: Estructura Molecular 3D Interactivas
  function renderMRMode(ctx, w, h) {
    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(0, 0, w, h);

    const centerX = w * 0.5;
    const centerY = h * 0.5;

    angle += 0.015;

    // Conectar partículas con líneas si están cerca
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        // Rotación básica en 3D alrededor de Y
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const x1 = p1.x * cosA - p1.z * sinA + centerX;
        const y1 = p1.y + centerY;
        const x2 = p2.x * cosA - p2.z * sinA + centerX;
        const y2 = p2.y + centerY;

        const dist = Math.hypot(x1 - x2, y1 - y2);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 110})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }

    // Dibujar nodos/átomos moleculares
    particles.forEach(p => {
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Efecto interactivo con el ratón
      const dx = (mouseX - centerX) * 0.05;
      const dy = (mouseY - centerY) * 0.05;

      const px = p.x * cosA - p.z * sinA + centerX + dx;
      const py = p.y + centerY + dy;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Brillo Neón MR
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
    });

    ctx.shadowBlur = 0; // Reset
  }

  // Iniciar bucle
  render();
}

/* --------------------------------------------------------------------------
   7. FORMULARIO DE CONTACTO E INTERACCIÓN DE ENVÍO
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const company = document.getElementById('contactCompany').value;

    // Mostrar mensaje de éxito minimalista
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    button.disabled = true;
    button.style.background = '#10b981';
    button.innerHTML = `<span>✔ Solicitud Enviada para ${company}</span>`;

    setTimeout(() => {
      alert(`¡Gracias, ${name}! Tu solicitud de demo inmersiva para ${company} ha sido recibida correctamente. Nos pondremos en contacto contigo en breve.`);
      form.reset();
      button.disabled = false;
      button.style.background = '';
      button.innerHTML = originalText;
    }, 1000);
  });
}
