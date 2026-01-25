/**
 * Template Name: Craftivo
 * Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
 * Updated: Oct 04 2025 with Bootstrap v5.3.8
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /* ===============================
     Body Scrolled State
  =============================== */
  function toggleScrolled() {
    document.body.classList.toggle('scrolled', window.scrollY > 100);
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ===============================
     Preloader
  =============================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /* ===============================
     Scroll to Top Button
  =============================== */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('load', toggleScrollTop);

  /* ===============================
     AOS Init
  =============================== */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', aosInit);

  /* ===============================
     Typed.js
  =============================== */
  const typedEl = document.querySelector('.typed');
const articleEl = document.getElementById('article');

if (typedEl && articleEl) {
  const roles = typedEl.getAttribute('data-typed-items').split(',');

  new Typed('.typed', {
    strings: roles,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    preStringTyped: (arrayPos) => {
      const text = roles[arrayPos].trim();

      // Use "an" only for AI roles
      if (text.startsWith('AI')) {
        articleEl.textContent = 'an';
      } else {
        articleEl.textContent = 'a';
      }
    }
  });
}


  /* ===============================
     Skills Animation
  =============================== */
  document.querySelectorAll('.skills-animation').forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: () => {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });




  /* ===============================
     GLightbox
  =============================== */
  GLightbox({ selector: '.glightbox' });

  /* ===============================
     Isotope Portfolio
  =============================== */
  document.querySelectorAll('.isotope-layout').forEach(layout => {
    let iso;

    imagesLoaded(layout.querySelector('.isotope-container'), () => {
      iso = new Isotope(layout.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout.dataset.layout || 'masonry',
        filter: layout.dataset.defaultFilter || '*',
        sortBy: layout.dataset.sort || 'original-order'
      });
    });

    layout.querySelectorAll('.isotope-filters li').forEach(filter => {
      filter.addEventListener('click', () => {
        layout.querySelector('.filter-active').classList.remove('filter-active');
        filter.classList.add('filter-active');
        iso.arrange({ filter: filter.dataset.filter });
        aosInit();
      });
    });
  });

  /* ===============================
     Swiper
  =============================== */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(swiperEl => {
      const config = JSON.parse(
        swiperEl.querySelector('.swiper-config').innerHTML.trim()
      );
      new Swiper(swiperEl, config);
    });
  }

  window.addEventListener('load', initSwiper);

  /* ===============================
     Hash Scroll Fix
  =============================== */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /* ===============================
     SIDE NAVIGATION (ONLY NAV)
     - Smooth Scroll
     - Active Section
  =============================== */
  const sideLinks = document.querySelectorAll('.side-nav a');
  const sections = document.querySelectorAll('section[id]');

  /* Smooth Scroll */
  sideLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  /* Active State */
  function updateSideNav() {
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.side-nav li').forEach(li =>
          li.classList.remove('active')
        );

        document
          .querySelector(`.side-nav a[href="#${id}"]`)
          ?.parentElement.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateSideNav);
  window.addEventListener('load', updateSideNav);

})();
