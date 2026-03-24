// --- NAVBAR: scroll shadow + hamburger ---
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll('.section-title, .divider, .about-text, .skills-list, .carousel-wrapper, .projects-carousel, .contact-form-wrapper, .footer');

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// --- CAROUSEL FACTORY ---
function initCarousel(trackId, prevBtnId, nextBtnId, dotsId) {
  const track   = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const dotsContainer = document.getElementById(dotsId);

  if (!track) return;

  const items = track.children;
  let current = 0;
  const total  = items.length;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  setInterval(() => goTo(current + 1), 4000);
}

initCarousel('cert-track', 'cert-prev', 'cert-next', 'cert-dots');
initCarousel('proj-track', 'proj-prev', 'proj-next', 'proj-dots');

// --- ACTIVE NAV LINK on scroll ---
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height)
        ? 'var(--pink)'
        : '';
    }
  });
});


// --- LIGHTBOX ---
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxClose   = document.getElementById('lightbox-close');
const lightboxOverlay = document.getElementById('lightbox-overlay');

document.querySelectorAll('.cert-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.img;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}


// --- PROJECT MODAL ---
const projModal        = document.getElementById('proj-modal');
const projModalOverlay = document.getElementById('proj-modal-overlay');
const projModalClose   = document.getElementById('proj-modal-close');

document.querySelectorAll('.view-project-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('proj-modal-title').textContent    = btn.dataset.title;
    document.getElementById('proj-modal-role').textContent     = btn.dataset.role;
    document.getElementById('proj-modal-duration').textContent = btn.dataset.duration;
    document.getElementById('proj-modal-tools').textContent    = '🛠 ' + btn.dataset.tools;
    document.getElementById('proj-modal-situation').textContent = btn.dataset.situation;
    document.getElementById('proj-modal-task').textContent     = btn.dataset.task;
    document.getElementById('proj-modal-action').textContent   = btn.dataset.action;
    document.getElementById('proj-modal-result').textContent   = btn.dataset.result;

    // Show or hide modal image
    const imgWrapper = document.getElementById('proj-modal-img-wrapper');
    const modalImg   = document.getElementById('proj-modal-img');
    if (btn.dataset.img) {
      modalImg.src = btn.dataset.img;
      imgWrapper.classList.remove('hidden');
    } else {
      modalImg.src = '';
      imgWrapper.classList.add('hidden');
    }

    // Show or hide Figma link
    const figmaLink = document.getElementById('proj-modal-figma');
    if (btn.dataset.figma) {
      figmaLink.href = btn.dataset.figma;
      figmaLink.style.display = 'inline-block';
    } else {
      figmaLink.style.display = 'none';
    }

    projModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

projModalClose.addEventListener('click', closeProjModal);
projModalOverlay.addEventListener('click', closeProjModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjModal();
});

function closeProjModal() {
  projModal.classList.remove('active');
  document.body.style.overflow = '';
}
if (btn.dataset.type === "logo") {
  imgWrapper.classList.add("logo");
} else {
  imgWrapper.classList.remove("logo");
}