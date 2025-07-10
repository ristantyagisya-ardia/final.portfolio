document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target); // hanya sekali tampil
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

const flipSection = document.getElementById("flip-section");
const cards = document.querySelectorAll(".flip-card");

let flipObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Reset animasi
        cards.forEach((card) => {
          card.classList.remove("flip-final", "flip-start");
          void card.offsetWidth; // force reflow
          card.classList.add("flip-start");

          setTimeout(() => {
            card.classList.remove("flip-start");
            card.classList.add("flip-final");
          }, 2000);
        });
      } else {
        cards.forEach((card) => {
          card.classList.remove("flip-start", "flip-final");
          card.querySelector(".flip-card-inner").style.transform =
            "rotateY(0deg)";
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

flipObserver.observe(flipSection);

const counters = document.querySelectorAll(".number");

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const isNegative = counter.hasAttribute("data-negative");
    const endValue = isNegative ? -target : target;
    const step = endValue / 100;
    let current = 0;

    const updateCount = () => {
      current += step;
      if (
        (isNegative && current > endValue) ||
        (!isNegative && current < endValue)
      ) {
        counter.textContent = Math.round(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = endValue;
      }
    };

    updateCount();
  });
}

const counterSection = document.getElementById("counterSection");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      } else {
        counters.forEach((counter) => {
          counter.textContent = "0";
        });
      }
    });
  },
  { threshold: 0.5 }
);

if (counterSection) {
  counterObserver.observe(counterSection);
}

function duplicateContent(id) {
  const track = document.getElementById(id);
  const clone = track.cloneNode(true);
  track.parentNode.appendChild(clone);
}

duplicateContent("track1");
duplicateContent("track2");

function duplicateTrack(id) {
  const track = document.getElementById(id);
  const clone = track.cloneNode(true);
  Array.from(clone.children).forEach((child) =>
    track.appendChild(child.cloneNode(true))
  );
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function bukaProyek(kategori) {
  document.querySelectorAll(".halaman-proyek").forEach((sec) => {
    sec.classList.remove("active");
  });
  const id = "halaman-" + kategori;
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function kembali() {
  document.querySelectorAll(".halaman-proyek").forEach((sec) => {
    sec.classList.remove("active");
  });

  const proyekKotak = document.querySelector(".kotak-container");
  if (proyekKotak) {
    proyekKotak.scrollIntoView({ behavior: "smooth" });
  }
}

const video = document.getElementById("myVideo");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", function () {
  video
    .play()
    .then(() => {
      playBtn.classList.add("hidden");
    })
    .catch((err) => {
      console.error("Gagal memulai video:", err);
    });
});

video.addEventListener("pause", function () {
  playBtn.classList.remove("hidden");
});

video.addEventListener("ended", function () {
  video.currentTime = 0;
  video.load(); // jika kamu ingin poster muncul kembali
  playBtn.classList.remove("hidden");
});

const textElements = document.querySelectorAll(".fade-in-text");

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // agar bisa muncul lagi saat kembali
      }
    });
  },
  {
    threshold: 0.2,
  }
);

textElements.forEach((el) => textObserver.observe(el));

const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
