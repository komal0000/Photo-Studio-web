const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const videoModal = document.querySelector("[data-video-modal]");
const openVideoButtons = document.querySelectorAll("[data-open-video]");
const closeVideoButton = document.querySelector("[data-close-video]");
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll("[data-category]");
const subscribeForm = document.querySelector("[data-subscribe-form]");
const formStatus = document.querySelector("[data-form-status]");

const closeMenu = () => {
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
  document.documentElement.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", willOpen);
  document.documentElement.classList.toggle("menu-open", willOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu();
    menuToggle.focus();
  }
});

const mobileMenuQuery = window.matchMedia("(max-width: 760px)");
const handleMenuBreakpoint = (event) => {
  if (!event.matches) closeMenu();
};
if (typeof mobileMenuQuery.addEventListener === "function") {
  mobileMenuQuery.addEventListener("change", handleMenuBreakpoint);
} else {
  mobileMenuQuery.addListener(handleMenuBreakpoint);
}

const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((candidate) => {
      const isSelected = candidate === button;
      candidate.classList.toggle("is-active", isSelected);
      candidate.setAttribute("aria-pressed", String(isSelected));
    });

    portfolioItems.forEach((item) => {
      const categories = item.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      item.hidden = !shouldShow;

      if (shouldShow) {
        item.animate(
          [
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 300, easing: "cubic-bezier(.16, 1, .3, 1)" },
        );
      }
    });
  });
});

openVideoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof videoModal.showModal === "function") {
      videoModal.showModal();
    } else {
      videoModal.setAttribute("open", "");
    }
  });
});

closeVideoButton.addEventListener("click", () => videoModal.close());
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) videoModal.close();
});

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(subscribeForm).get("email");
  formStatus.textContent = `Thank you — studio notes will be sent to ${email}.`;
  subscribeForm.reset();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

// Reference-matched hero and gallery carousels
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroSlides = Array.from(document.querySelectorAll("[data-hero-slide]"));
const heroNumber = document.querySelector("[data-hero-number]");
const heroNextButton = document.querySelector("[data-hero-next]");
const heroAutoplayButton = document.querySelector("[data-hero-autoplay]");

if (heroCarousel && heroSlides.length > 1) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = reducedMotion ? 40 : 2200;
  const autoplayDelay = 7200;
  let heroIndex = 0;
  let transitionLocked = false;
  let autoplayPaused = false;
  let autoplayTimer;
  let pointerStartX = null;
  let pointerId = null;

  const scheduleAutoplay = () => {
    window.clearTimeout(autoplayTimer);
    if (autoplayPaused || document.hidden) return;
    autoplayTimer = window.setTimeout(() => showHeroSlide(heroIndex + 1), autoplayDelay);
  };

  const updateHeroNumber = (nextIndex) => {
    heroNumber.textContent = String(nextIndex + 1).padStart(2, "0");
    heroNextButton.setAttribute(
      "aria-label",
      "Slide " + (nextIndex + 1) + " of " + heroSlides.length + ". Show next photograph",
    );
  };

  const showHeroSlide = (requestedIndex, manual = false) => {
    if (transitionLocked) return;

    const nextIndex = (requestedIndex + heroSlides.length) % heroSlides.length;
    if (nextIndex === heroIndex) {
      scheduleAutoplay();
      return;
    }

    transitionLocked = true;
    window.clearTimeout(autoplayTimer);

    const currentSlide = heroSlides[heroIndex];
    const nextSlide = heroSlides[nextIndex];

    currentSlide.classList.remove("is-active");
    currentSlide.classList.add("is-leaving");
    currentSlide.setAttribute("aria-hidden", "true");

    nextSlide.classList.remove("is-leaving");
    nextSlide.classList.add("is-entering");
    nextSlide.setAttribute("aria-hidden", "false");

    heroNextButton.classList.add("is-changing");
    window.setTimeout(() => updateHeroNumber(nextIndex), reducedMotion ? 0 : 560);
    window.setTimeout(
      () => heroNextButton.classList.remove("is-changing"),
      reducedMotion ? 10 : 880,
    );

    window.setTimeout(() => {
      currentSlide.classList.remove("is-leaving");
      nextSlide.classList.remove("is-entering");
      nextSlide.classList.add("is-active");
      heroIndex = nextIndex;
      transitionLocked = false;
      scheduleAutoplay();
    }, transitionDuration);

    if (manual && navigator.vibrate) navigator.vibrate(8);
  };

  const setAutoplayPaused = (paused) => {
    autoplayPaused = paused;
    heroAutoplayButton.setAttribute("aria-pressed", String(paused));
    heroAutoplayButton.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");

    if (paused) {
      window.clearTimeout(autoplayTimer);
    } else {
      scheduleAutoplay();
    }
  };

  heroNextButton.addEventListener("click", () => showHeroSlide(heroIndex + 1, true));
  heroAutoplayButton.addEventListener("click", () => setAutoplayPaused(!autoplayPaused));

  heroCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showHeroSlide(heroIndex + 1, true);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showHeroSlide(heroIndex - 1, true);
    }
  });

  heroCarousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a, button")) return;
    pointerStartX = event.clientX;
    pointerId = event.pointerId;
    heroCarousel.classList.add("is-dragging");
    heroCarousel.setPointerCapture(pointerId);
    window.clearTimeout(autoplayTimer);
  });

  const finishHeroDrag = (event) => {
    if (pointerStartX === null || pointerId !== event.pointerId) return;

    const dragDistance = event.clientX - pointerStartX;
    heroCarousel.classList.remove("is-dragging");

    if (heroCarousel.hasPointerCapture(pointerId)) {
      heroCarousel.releasePointerCapture(pointerId);
    }

    pointerStartX = null;
    pointerId = null;

    if (Math.abs(dragDistance) >= 48) {
      showHeroSlide(heroIndex + (dragDistance < 0 ? 1 : -1), true);
    } else {
      scheduleAutoplay();
    }
  };

  heroCarousel.addEventListener("pointerup", finishHeroDrag);
  heroCarousel.addEventListener("pointercancel", finishHeroDrag);
  document.addEventListener("visibilitychange", scheduleAutoplay);
  scheduleAutoplay();
}

const shotsCarousel = document.querySelector("[data-shots-carousel]");
const shotsTrack = document.querySelector("[data-shots-track]");
const shots = Array.from(document.querySelectorAll("[data-shot]"));
const shotsPrevButton = document.querySelector("[data-shots-prev]");
const shotsNextButton = document.querySelector("[data-shots-next]");

if (shotsCarousel && shotsTrack && shots.length > 1) {
  let shotIndex = 0;
  let galleryPointerStartX = null;
  let galleryPointerId = null;

  const positionShots = () => {
    const firstShot = shots[0];
    const trackStyles = window.getComputedStyle(shotsTrack);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    const step = firstShot.getBoundingClientRect().width + gap;

    shotsTrack.style.transform = "translate3d(" + (-shotIndex * step) + "px, 0, 0)";
    shots.forEach((shot, index) => {
      const active = index === shotIndex;
      shot.classList.toggle("is-active", active);
      shot.setAttribute("aria-hidden", String(!active));
    });

    shotsCarousel.setAttribute(
      "aria-label",
      "Featured photograph " + (shotIndex + 1) + " of " + shots.length,
    );
  };

  const showShot = (requestedIndex) => {
    shotIndex = (requestedIndex + shots.length) % shots.length;
    positionShots();
  };

  shotsPrevButton.addEventListener("click", () => showShot(shotIndex - 1));
  shotsNextButton.addEventListener("click", () => showShot(shotIndex + 1));

  shotsCarousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    galleryPointerStartX = event.clientX;
    galleryPointerId = event.pointerId;
    shotsCarousel.setPointerCapture(galleryPointerId);
  });

  const finishGalleryDrag = (event) => {
    if (galleryPointerStartX === null || galleryPointerId !== event.pointerId) return;

    const dragDistance = event.clientX - galleryPointerStartX;
    if (shotsCarousel.hasPointerCapture(galleryPointerId)) {
      shotsCarousel.releasePointerCapture(galleryPointerId);
    }

    galleryPointerStartX = null;
    galleryPointerId = null;

    if (Math.abs(dragDistance) >= 45) {
      showShot(shotIndex + (dragDistance < 0 ? 1 : -1));
    }
  };

  shotsCarousel.addEventListener("pointerup", finishGalleryDrag);
  shotsCarousel.addEventListener("pointercancel", finishGalleryDrag);

  if ("ResizeObserver" in window) {
    new ResizeObserver(positionShots).observe(shotsCarousel);
  } else {
    window.addEventListener("resize", positionShots);
  }

  positionShots();
}