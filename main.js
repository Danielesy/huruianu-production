document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll: darken header when user scrolls down ──
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const navDrawer = document.getElementById('navDrawer');

  hamburger.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      hamburger.classList.add('open');
      navDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  window.closeDrawer = function () {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close drawer on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (navDrawer.classList.contains('open')) closeDrawer();
      if (document.getElementById('lightbox').classList.contains('active')) closeLightbox();
    }
  });

  // ── Lightbox ──
  let backstageImgs = [];
  let currentPhoto = 0;

  document.querySelectorAll('.backstage-item').forEach((item) => {
    item.addEventListener('click', () => {
      
      const sortedItems = Array.from(document.querySelectorAll('.backstage-item')).sort((a, b) => {
        const rowDiff = a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        
        if (Math.abs(rowDiff) < 50) {
          return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
        }
        return rowDiff;
      });

      backstageImgs = sortedItems.map(el => {
        const img = el.querySelector('img');
        return { src: img.src, alt: img.alt };
      });

      const sortedIndex = sortedItems.indexOf(item);

      openLightbox(sortedIndex);
    });
  });

  function openLightbox(index) {
    currentPhoto = index;
    document.getElementById('lightboxImg').src = backstageImgs[index].src;
    document.getElementById('lightboxImg').alt = backstageImgs[index].alt;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.closeLightboxOnBg = function (e) {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  };

  window.changePhoto = function (dir) {
    currentPhoto = (currentPhoto + dir + backstageImgs.length) % backstageImgs.length;
    document.getElementById('lightboxImg').src = backstageImgs[currentPhoto].src;
    document.getElementById('lightboxImg').alt = backstageImgs[currentPhoto].alt;
  };

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'ArrowRight') changePhoto(1);
    if (e.key === 'ArrowLeft') changePhoto(-1);
  });


  // ── Fade-in on scroll ──
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => fadeObserver.observe(el));

});





