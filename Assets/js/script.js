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

// Close mobile menu when a link is clicked
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

  // Build dots
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

  // Auto-advance every 4 seconds
  setInterval(() => goTo(current + 1), 4000);
}

// Init both carousels
initCarousel('cert-track',  'cert-prev',  'cert-next',  'cert-dots');
initCarousel('proj-track',  'proj-prev',  'proj-next',  'proj-dots');


// --- CONTACT FORM: basic validation + feedback ---
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const inputs   = document.querySelectorAll('.form-input');
  let   allFilled = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e57373';
      allFilled = false;
    } else {
      input.style.borderColor = '';
    }
  });

  if (allFilled) {
    sendBtn.textContent = 'Message Sent! 💕';
    sendBtn.style.background = 'linear-gradient(135deg, #c2718f, #e8a0b8)';
    sendBtn.disabled = true;
    inputs.forEach(input => input.value = '');

    setTimeout(() => {
      sendBtn.textContent = 'Send Message';
      sendBtn.style.background = '';
      sendBtn.disabled = false;
    }, 3000);
  }
});


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
