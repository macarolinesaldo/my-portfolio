// --- MOBILE NAV ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// --- NAVBAR SHADOW ON SCROLL ---
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('load', handleNavbarScroll);

// --- REVEAL ON SCROLL ---
const revealElements = document.querySelectorAll(
  '.section, .experience-card, .skill-card, .cert-item, .project-card'
);

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

revealElements.forEach(el => el.classList.add('reveal'));
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      link.style.color = 'var(--pink)';
    } else {
      link.style.color = '';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// --- CERTIFICATES CAROUSEL ---
const certTrack = document.getElementById('cert-track');
const certItems = document.querySelectorAll('.cert-item');
const certPrev = document.getElementById('cert-prev');
const certNext = document.getElementById('cert-next');
const certDots = document.getElementById('cert-dots');

let certIndex = 0;

function updateCertCarousel() {
  if (!certTrack || !certItems.length) return;

  certTrack.style.transform = `translateX(-${certIndex * 100}%)`;

  if (certDots) {
    certDots.innerHTML = '';

    certItems.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `dot ${i === certIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
      dot.addEventListener('click', () => {
        certIndex = i;
        updateCertCarousel();
      });
      certDots.appendChild(dot);
    });
  }
}

if (certPrev) {
  certPrev.addEventListener('click', () => {
    certIndex = (certIndex - 1 + certItems.length) % certItems.length;
    updateCertCarousel();
  });
}

if (certNext) {
  certNext.addEventListener('click', () => {
    certIndex = (certIndex + 1) % certItems.length;
    updateCertCarousel();
  });
}

updateCertCarousel();

// --- PROJECTS CAROUSEL ---
const projTrack = document.getElementById('proj-track');
const projItems = document.querySelectorAll('.project-card');
const projPrev = document.getElementById('proj-prev');
const projNext = document.getElementById('proj-next');
const projDots = document.getElementById('proj-dots');

let projIndex = 0;

function updateProjCarousel() {
  if (!projTrack || !projItems.length) return;

  projTrack.style.transform = `translateX(-${projIndex * 100}%)`;

  if (projDots) {
    projDots.innerHTML = '';

    projItems.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `dot ${i === projIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.addEventListener('click', () => {
        projIndex = i;
        updateProjCarousel();
      });
      projDots.appendChild(dot);
    });
  }
}

if (projPrev) {
  projPrev.addEventListener('click', () => {
    projIndex = (projIndex - 1 + projItems.length) % projItems.length;
    updateProjCarousel();
  });
}

if (projNext) {
  projNext.addEventListener('click', () => {
    projIndex = (projIndex + 1) % projItems.length;
    updateProjCarousel();
  });
}

updateProjCarousel();

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxOverlay = document.getElementById('lightbox-overlay');

document.querySelectorAll('.cert-item img, .cert-thumb').forEach(img => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Certificate preview';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', closeLightbox);
}

// --- PROJECT MODAL ---
const projModal = document.getElementById('proj-modal');
const projModalOverlay = document.getElementById('proj-modal-overlay');
const projModalClose = document.getElementById('proj-modal-close');

function openProjModal(btn) {
  if (!projModal) return;

  const title = document.getElementById('proj-modal-title');
  const role = document.getElementById('proj-modal-role');
  const duration = document.getElementById('proj-modal-duration');
  const tools = document.getElementById('proj-modal-tools');
  const situation = document.getElementById('proj-modal-situation');
  const task = document.getElementById('proj-modal-task');
  const action = document.getElementById('proj-modal-action');
  const result = document.getElementById('proj-modal-result');
  const imgWrapper = document.getElementById('proj-modal-img-wrapper');
  const modalImg = document.getElementById('proj-modal-img');
  const figmaLink = document.getElementById('proj-modal-figma');

  if (title) title.textContent = btn.dataset.title || '';
  if (role) role.textContent = btn.dataset.role || '';
  if (duration) duration.textContent = btn.dataset.duration || '';
  if (tools) tools.textContent = btn.dataset.tools ? '🛠 ' + btn.dataset.tools : '';
  if (situation) situation.textContent = btn.dataset.situation || '';
  if (task) task.textContent = btn.dataset.task || '';
  if (action) action.textContent = btn.dataset.action || '';
  if (result) result.textContent = btn.dataset.result || '';

  if (imgWrapper && modalImg) {
    imgWrapper.classList.remove('hidden', 'logo', 'screenshot');

    if (btn.dataset.img) {
      modalImg.src = btn.dataset.img;
      modalImg.alt = (btn.dataset.title || 'Project') + ' preview';

      if (btn.dataset.type === 'logo') {
        imgWrapper.classList.add('logo');
      } else {
        imgWrapper.classList.add('screenshot');
      }
    } else {
      modalImg.src = '';
      modalImg.alt = '';
      imgWrapper.classList.add('hidden');
    }
  }

  if (figmaLink) {
    if (btn.dataset.figma) {
      figmaLink.href = btn.dataset.figma;
      figmaLink.style.display = 'inline-block';
    } else {
      figmaLink.style.display = 'none';
    }
  }

  projModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjModal() {
  if (!projModal) return;
  projModal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.view-project-btn').forEach(btn => {
  btn.addEventListener('click', () => openProjModal(btn));
});

if (projModalClose) {
  projModalClose.addEventListener('click', closeProjModal);
}

if (projModalOverlay) {
  projModalOverlay.addEventListener('click', closeProjModal);
}

// --- ESC KEY CLOSE FOR MODALS ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeProjModal();
  }
});
const logo = document.querySelector('.nav-logo');

if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}