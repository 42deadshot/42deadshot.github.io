// fretistan/static/fretistan/js/lightbox.js
(function () {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbVideoContainerId = 'lb-video-container';
  const closeBtn = document.getElementById('lb-close');
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');

  let gallery = []; // objects {type:'image'|'video', src:..., el:DOM}
  let idx = 0;
  let lastActive = null;

  // build gallery from images and videos on the page
  function refreshGallery() {
    gallery = [];
    document.querySelectorAll('.gallery img').forEach(img => {
      gallery.push({type:'image', src: img.dataset.large || img.src, el: img});
    });
    // videos in gallery (.gallery video)
    document.querySelectorAll('.gallery video').forEach(v => {
      gallery.push({type:'video', src: v.dataset-src || v.currentSrc || v.src, el: v});
    });
    // also include floating thumbs (if they have data-large/data-video attr)
    document.querySelectorAll('.floating-thumb').forEach((el) => {
      const dataImg = el.dataset.large || el.style.backgroundImage?.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      const dataVideo = el.datasetVideo || el.dataset.video;
      if (dataVideo) gallery.push({type:'video', src: dataVideo, el});
      else if (dataImg) gallery.push({type:'image', src: dataImg, el});
    });
  }

  function isVideoItem(item) {
    return item && item.type === 'video';
  }

  function openAt(i) {
    if (!gallery.length || i == null) return;
    lastActive = document.activeElement;
    idx = i;
    const item = gallery[idx];
    if (!item) return;

    // hide any existing video container
    const existing = document.getElementById(lbVideoContainerId);
    if (existing) existing.remove();

    if (item.type === 'image') {
      // show image
      lbImg.style.display = '';
      lbImg.src = item.src;
      // if video container exists, remove it
    } else {
      // show video element in lightbox
      lbImg.style.display = 'none';
      const container = document.createElement('div');
      container.id = lbVideoContainerId;
      container.className = 'max-w-[90vw] max-h-[85vh]';
      container.innerHTML = `<video id="lb-video" src="${item.src}" controls playsinline style="max-width:100%;max-height:85vh;border-radius:6px;"></video>`;
      lb.appendChild(container);
      // autoplay? do not autoplay to respect user
    }

    lb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    // pause video if playing
    const v = document.getElementById('lb-video');
    if (v && !v.paused) try { v.pause(); } catch (e) {}
    // remove video container if exists
    const existing = document.getElementById(lbVideoContainerId);
    if (existing) existing.remove();

    lb.classList.add('hidden');
    document.body.style.overflow = '';
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
  }

  function openPrev() {
    openAt((idx - 1 + gallery.length) % gallery.length);
  }
  function openNext() {
    openAt((idx + 1) % gallery.length);
  }

  document.addEventListener('DOMContentLoaded', () => {
    refreshGallery();

    // make floating thumbs clickable to open lightbox (if they carry image/video src)
    document.querySelectorAll('.floating-thumb').forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (ev) => {
        refreshGallery();
        // find index of the gallery item related to this el
        const targetSrc = el.dataset.large || el.dataset.video || el.style.backgroundImage?.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        const idxFound = gallery.findIndex(g => g.src && g.src.includes(targetSrc));
        openAt(idxFound >= 0 ? idxFound : 0);
      });
    });
  });

  // click on gallery items (images and videos)
  document.addEventListener('click', function (e) {
    if (e.target && e.target.matches && e.target.matches('.gallery img')) {
      refreshGallery();
      const i = gallery.findIndex(g => g.src === (e.target.dataset.large || e.target.src));
      openAt(i >= 0 ? i : 0);
      return;
    }
    if (e.target && e.target.matches && e.target.matches('.gallery video')) {
      refreshGallery();
      const i = gallery.findIndex(g => g.src === (e.target.dataset.src || e.target.currentSrc || e.target.src));
      openAt(i >= 0 ? i : 0);
      return;
    }
    if (e.target === lb) {
      closeLightbox();
      return;
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', openPrev);
  if (nextBtn) nextBtn.addEventListener('click', openNext);

  window.addEventListener('keydown', function (e) {
    if (!lb || lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openPrev();
    if (e.key === 'ArrowRight') openNext();
  });

  // close on background click (but not when clicking children)
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // observe gallery changes
  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer) {
    const obs = new MutationObserver(() => refreshGallery());
    obs.observe(galleryContainer, { childList: true, subtree: true });
  }

  window.GazeLightbox = { openAt, openNext, openPrev, closeLightbox, refreshGallery };
})();
