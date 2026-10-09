/* ==========================================================================
   MUKESH PHOTOGRAPHY & RETOUCH PORTFOLIO — JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Splash Screen & Entrance Experience
  const splashScreen = document.getElementById('splash-screen');
  const enterBtn = document.getElementById('enter-btn');

  if (enterBtn && splashScreen) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      splashScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
      
      // Smooth scroll to top of main section
      const target = document.querySelector('#home');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. Header Scroll Effect & Active Nav Link Highlight
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy: Update active navigation item
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (mainNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 4. Hero Background Cross-fade Slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5500);
  }

  // 5. Filterable Portfolio Gallery
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // 6. Interactive Before / After Retouching Slider
  const sliderRange = document.getElementById('slider-range');
  const imgAfter = document.querySelector('.img-wrapper-after');
  const sliderHandle = document.querySelector('.slider-handle');

  if (sliderRange && imgAfter && sliderHandle) {
    sliderRange.addEventListener('input', (e) => {
      const val = e.target.value;
      imgAfter.style.width = `${val}%`;
      sliderHandle.style.left = `${val}%`;
    });
  }

  // 7. Testimonials Carousel
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonials.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  }

  function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'));
      showTestimonial(idx);
      resetTestimonialTimer();
    });
  });

  function startTestimonialTimer() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
  }

  function resetTestimonialTimer() {
    clearInterval(testimonialInterval);
    startTestimonialTimer();
  }

  if (testimonials.length > 0) {
    startTestimonialTimer();
  }

  // 8. Fullscreen Lightbox Modal
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const viewButtons = Array.from(document.querySelectorAll('.view-btn'));
  let activeLightboxIndex = 0;

  function openLightbox(index) {
    activeLightboxIndex = index;
    const btn = viewButtons[index];
    const src = btn.getAttribute('data-src');
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-desc');

    lightboxImg.src = src;
    lightboxTitle.textContent = title || '';
    lightboxDesc.textContent = desc || '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  viewButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex - 1 + viewButtons.length) % viewButtons.length;
      openLightbox(activeLightboxIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex + 1) % viewButtons.length;
      openLightbox(activeLightboxIndex);
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // 9. Dynamic Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// 10. Form Submission & WhatsApp Link Generator
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('client-name').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const date = document.getElementById('event-date').value;
  const venue = document.getElementById('event-venue').value.trim();
  const service = document.getElementById('service-type').value;
  const message = document.getElementById('event-message').value.trim();

  const feedback = document.getElementById('form-feedback');
  
  // Format WhatsApp message
  const waText = encodeURIComponent(
    `*New Wedding Photography Inquiry*\n\n` +
    `*Names:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Date:* ${date}\n` +
    `*Venue/City:* ${venue}\n` +
    `*Service:* ${service}\n` +
    `*Notes:* ${message}`
  );

  // Update quick WhatsApp button link
  const waBtn = document.getElementById('whatsapp-quick-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/919999999999?text=${waText}`;
  }

  // Show feedback
  feedback.className = 'form-feedback success';
  feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been recorded. Redirecting to WhatsApp to send your details directly...`;

  setTimeout(() => {
    window.open(`https://wa.me/919999999999?text=${waText}`, '_blank');
  }, 1200);

  return false;
}
