
// =========================================
// 1. ДАННЫЕ НАВИГАЦИИ
// =========================================

const navigationData = {
  home: {
    title: "Главная",
    label: "ОБЗОР",
    subcategories: [
      {
        id: "about",
        title: "О колледже",
        content: renderAbout
      },
      {
        id: "specialties",
        title: "Специальности",
        content: renderSpecialties
      },
      {
        id: "admission",
        title: "Поступление",
        content: renderAdmission
      },
      {
        id: "additional",
        title: "Дополнительно",
        content: renderAdditional
      },
      {
        id: "album",
        title: "Альбом",
        content: renderAlbum
      }
    ]
  },

  education: {
    title: "Учёба",
    label: "ОБРАЗОВАНИЕ",
    subcategories: [
      {
        id: "schedule",
        title: "Расписание",
        content: renderSchedule
      },
      {
        id: "teachers",
        title: "Преподаватели",
        content: renderTeachers
      },
      {
        id: "practice",
        title: "Практические работы",
        content: renderPractice
      },
      {
        id: "library",
        title: "Библиотека",
        content: renderLibrary
      }
    ]
  },

  news: {
    title: "Новости",
    label: "ИНФОРМАЦИЯ",
    subcategories: [
      {
        id: "all-news",
        title: "Все новости",
        content: renderAllNews
      },
      {
        id: "events",
        title: "Мероприятия",
        content: renderEvents
      },
      {
        id: "announcements",
        title: "Объявления",
        content: renderAnnouncements
      }
    ]
  },

  map: {
    title: "Карта",
    label: "НАВИГАЦИЯ",
    subcategories: [
      {
        id: "yandex-maps",
        title: "Яндекс карты",
        content: renderYandexMapsPage
      },
      {
        id: "campus-plans",
        title: "Карта корпусов",
        content: renderCampusPlansPage
      }
    ]
  },

  login: {
    title: "Войти",
    label: "ЛИЧНЫЙ ДОСТУП",
    subcategories: [
      {
        id: "login-page",
        title: "Авторизация",
        content: renderLoginPage
      }
    ]
  }
};

// =========================================
// 2. DOM-ЭЛЕМЕНТЫ
// =========================================

const topNavigation = document.getElementById("topNavigation");
const subNavigation = document.getElementById("subNavigation");
const sidebarTitle = document.getElementById("sidebarTitle");
const pageContent = document.getElementById("pageContent");
const breadcrumbs = document.getElementById("breadcrumbs");

const sidebar = document.getElementById("sidebar");
const mobileMenuButton = document.getElementById("mobileMenuButton");

const searchModal = document.getElementById("searchModal");
const loginModal = document.getElementById("loginModal");

let currentCategory = "home";
let currentSubcategory = "about";

// =========================================
// 3. СОЗДАНИЕ ВЕРХНЕГО МЕНЮ
// =========================================

function renderTopNavigation() {
  topNavigation.innerHTML = "";

  Object.entries(navigationData).forEach(([categoryId, category]) => {
    const button = document.createElement("button");

    button.className = "top-nav-button";
    button.textContent = category.title;
    button.dataset.category = categoryId;

    if (categoryId === currentCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectCategory(categoryId);
    });

    topNavigation.appendChild(button);
  });
}

// =========================================
// 4. СОЗДАНИЕ БОКОВОГО МЕНЮ
// =========================================

function renderSubNavigation() {
  const category = navigationData[currentCategory];

  sidebarTitle.textContent = category.title;
  subNavigation.innerHTML = "";

  category.subcategories.forEach((subcategory, index) => {
    const button = document.createElement("button");

    button.className = "sub-nav-button";
    button.dataset.subcategory = subcategory.id;

    button.innerHTML = `
      <span>${subcategory.title}</span>
      <span class="sub-arrow">→</span>
    `;

    if (subcategory.id === currentSubcategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectSubcategory(subcategory.id);
    });

    subNavigation.appendChild(button);
  });
}

// =========================================
// 5. ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИИ
// =========================================

function selectCategory(categoryId) {
  currentCategory = categoryId;

  const category = navigationData[categoryId];

  // При смене категории выбираем первую подкатегорию
  currentSubcategory = category.subcategories[0].id;

  renderTopNavigation();
  renderSubNavigation();
  renderCurrentContent();

  // На мобильном после выбора закрываем меню
  sidebar.classList.remove("mobile-open");
}

// =========================================
// 6. ПЕРЕКЛЮЧЕНИЕ ПОДКАТЕГОРИИ
// =========================================

function selectSubcategory(subcategoryId) {
  currentSubcategory = subcategoryId;

  renderSubNavigation();
  renderCurrentContent();

  sidebar.classList.remove("mobile-open");
}

// =========================================
// 7. ВЫВОД ТЕКУЩЕГО КОНТЕНТА
// =========================================

function renderCurrentContent() {
  const category = navigationData[currentCategory];

  const subcategory = category.subcategories.find(
    (item) => item.id === currentSubcategory
  );

  if (!subcategory) return;

  breadcrumbs.innerHTML = `
    ${category.title}
    <span>/</span>
    ${subcategory.title}
  `;

  // Анимация перерисовки
  pageContent.style.animation = "none";
  pageContent.offsetHeight;
  pageContent.style.animation = "pageFadeIn 0.35s ease";

  pageContent.innerHTML = subcategory.content();

  if (currentSubcategory === "admission") {
    initAdmissionCalculator();
  }
  if (currentSubcategory === "campus-plans") {
    initCampusPlansInteractivity();
  }
}

// =========================================
// 8. ГЛАВНАЯ / О КОЛЛЕДЖЕ
// =========================================


// =========================================
// 8.1. АЛЬБОМ — ДАННЫЕ ИНТЕРАКТИВНОЙ ГАЛЕРЕИ
// =========================================

const collegeAlbumData = {
  college: {
    title: "Жизнь колледжа",
    eyebrow: "КОЛЛЕДЖ В КАДРЕ",
    description:
      "Фотографии мероприятий, студенческой жизни, встреч, праздников и других моментов, которые рассказывают о колледже через его людей.",
    cover: "assets/images/albums/college/01.jpg",
    accent: "campus",
    photos: Array.from({ length: 12 }, (_, index) => ({
      src: `assets/images/albums/college/${String(index + 1).padStart(2, "0")}.jpg`,
      title: `Жизнь колледжа — кадр ${index + 1}`,
      caption: "Мероприятия, встречи, студенческие проекты и яркие события колледжа."
    }))
  },
  interior: {
    title: "Колледж изнутри",
    eyebrow: "ПРОСТРАНСТВО КОЛЛЕДЖА",
    description:
      "Фотографии учебных кабинетов, лабораторий, коридоров, зон для студентов и других пространств Таврического колледжа.",
    cover: "assets/images/albums/interior/01.jpg",
    accent: "interior",
    photos: Array.from({ length: 12 }, (_, index) => ({
      src: `assets/images/albums/interior/${String(index + 1).padStart(2, "0")}.jpg`,
      title: `Колледж изнутри — кадр ${index + 1}`,
      caption: "Кабинеты, учебные пространства, коридоры и другие элементы внутренней жизни колледжа."
    }))
  }
};

let collegeAlbumCurrent = null;
let collegeAlbumPage = 1;
const collegeAlbumPerPage = 4;
let collegeAlbumLightboxIndex = 0;

function renderAlbum() {
  return `
    <section class="college-album-page">
      <div class="college-album-hero">
        <div class="college-album-hero-grid"></div>
        <div class="college-album-hero-content">
          <span class="college-album-eyebrow">ВИЗУАЛЬНАЯ ИСТОРИЯ</span>
          <h1>Альбом колледжа</h1>
          <p>
            Два визуальных пространства, чтобы увидеть Таврический колледж
            таким, какой он есть: в событиях и в деталях его ежедневной жизни.
          </p>
        </div>
        <div class="college-album-hero-mark">TK</div>
      </div>

      <div class="college-album-section-heading">
        <div>
          <span class="college-album-label">КОЛЛЕКЦИИ</span>
          <h2>Выберите альбом</h2>
        </div>
        <div class="college-album-count">2 коллекции</div>
      </div>

      <div class="college-album-collections">
        ${Object.entries(collegeAlbumData)
          .map(([id, album], index) => {
            const count = album.photos.length;
            return `
              <button
                type="button"
                class="college-album-collection-card ${album.accent}"
                onclick="openCollegeAlbum('${id}')"
                aria-label="Открыть альбом ${album.title}"
              >
                <div class="college-album-cover">
                  <div class="college-album-cover-fallback">
                    <span>${id === "college" ? "EVENTS" : "SPACE"}</span>
                  </div>
                  <img
                    src="${album.cover}"
                    alt="Обложка альбома «${album.title}»"
                    onerror="this.style.display='none'"
                  />
                  <div class="college-album-cover-shade"></div>
                  <span class="college-album-cover-number">0${index + 1}</span>
                  <span class="college-album-cover-count">${count} фото</span>
                </div>
                <div class="college-album-collection-body">
                  <div class="college-album-collection-meta">
                    <span>${album.eyebrow}</span>
                    <span>ОТКРЫТЬ ↗</span>
                  </div>
                  <h3>${album.title}</h3>
                  <p>${album.description}</p>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>

      <div class="college-album-note">
        <span class="college-album-note-icon">✦</span>
        <p>
          Внутри каждого альбома фотографии распределены по страницам —
          по 4 изображения на каждой. Нажмите на снимок, чтобы открыть его
          крупнее.
        </p>
      </div>
    </section>
  `;
}

function openCollegeAlbum(albumId) {
  if (!collegeAlbumData[albumId]) return;

  collegeAlbumCurrent = albumId;
  collegeAlbumPage = 1;
  collegeAlbumRenderGallery();
}

function backToCollegeAlbums() {
  collegeAlbumCurrent = null;
  collegeAlbumPage = 1;
  collegeAlbumCloseLightbox();
  renderCurrentContent();
}

function collegeAlbumRenderGallery() {
  const album = collegeAlbumData[collegeAlbumCurrent];
  if (!album) {
    renderCurrentContent();
    return;
  }

  const totalPages = Math.ceil(album.photos.length / collegeAlbumPerPage);
  const start = (collegeAlbumPage - 1) * collegeAlbumPerPage;
  const visiblePhotos = album.photos.slice(start, start + collegeAlbumPerPage);

  breadcrumbs.innerHTML = `
    Главная <span>/</span> Альбом <span>/</span> ${album.title}
  `;

  pageContent.style.animation = "none";
  pageContent.offsetHeight;
  pageContent.style.animation = "pageFadeIn 0.35s ease";

  pageContent.innerHTML = `
    <section class="college-album-gallery ${album.accent}">
      <div class="college-album-gallery-top">
        <button type="button" class="college-album-back" onclick="backToCollegeAlbums()">
          <span>←</span>
          Все альбомы
        </button>

        <div class="college-album-gallery-title-wrap">
          <span class="college-album-label">${album.eyebrow}</span>
          <h1>${album.title}</h1>
          <p>${album.description}</p>
        </div>

        <div class="college-album-page-indicator">
          <span>${String(collegeAlbumPage).padStart(2, "0")}</span>
          <i></i>
          <span>${String(totalPages).padStart(2, "0")}</span>
        </div>
      </div>

      <div class="college-album-progress" aria-hidden="true">
        <span style="width: ${(collegeAlbumPage / totalPages) * 100}%"></span>
      </div>

      <div class="college-album-gallery-grid">
        ${visiblePhotos
          .map((photo, offset) => {
            const absoluteIndex = start + offset;
            return `
              <button
                type="button"
                class="college-album-photo-card"
                onclick="collegeAlbumOpenLightbox(${absoluteIndex})"
              >
                <span class="college-album-photo-image">
                  <span class="college-album-photo-fallback">
                    <span>${String(absoluteIndex + 1).padStart(2, "0")}</span>
                  </span>
                  <img
                    src="${photo.src}"
                    alt="${photo.title}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                  />
                  <span class="college-album-photo-overlay"></span>
                  <span class="college-album-photo-zoom">↗</span>
                  <span class="college-album-photo-index">${String(absoluteIndex + 1).padStart(2, "0")}</span>
                </span>
                <span class="college-album-photo-info">
                  <strong>${photo.title}</strong>
                  <span>${photo.caption}</span>
                </span>
              </button>
            `;
          })
          .join("")}
      </div>

      <div class="college-album-gallery-bottom">
        <div class="college-album-page-caption">
          <strong>Страница ${collegeAlbumPage}</strong>
          <span>по 4 фотографии</span>
        </div>

        <div class="college-album-pagination">
          <button
            type="button"
            class="college-album-page-button"
            onclick="collegeAlbumGoToPage(${collegeAlbumPage - 1})"
            ${collegeAlbumPage === 1 ? "disabled" : ""}
            aria-label="Предыдущая страница"
          >
            ←
          </button>

          ${Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return `
              <button
                type="button"
                class="college-album-page-number ${pageNumber === collegeAlbumPage ? "active" : ""}"
                onclick="collegeAlbumGoToPage(${pageNumber})"
              >${pageNumber}</button>
            `;
          }).join("")}

          <button
            type="button"
            class="college-album-page-button"
            onclick="collegeAlbumGoToPage(${collegeAlbumPage + 1})"
            ${collegeAlbumPage === totalPages ? "disabled" : ""}
            aria-label="Следующая страница"
          >
            →
          </button>
        </div>
      </div>
    </section>

    <div class="college-album-lightbox" id="collegeAlbumLightbox" aria-hidden="true">
      <div class="college-album-lightbox-backdrop" onclick="collegeAlbumCloseLightbox()"></div>
      <div class="college-album-lightbox-window" role="dialog" aria-modal="true" aria-label="Просмотр фотографии">
        <button type="button" class="college-album-lightbox-close" onclick="collegeAlbumCloseLightbox()" aria-label="Закрыть">×</button>
        <button type="button" class="college-album-lightbox-arrow prev" onclick="collegeAlbumLightboxMove(-1)" aria-label="Предыдущая фотография">←</button>
        <figure>
          <div class="college-album-lightbox-image-wrap">
            <img id="collegeAlbumLightboxImage" src="" alt="" />
            <div class="college-album-lightbox-fallback" id="collegeAlbumLightboxFallback"></div>
          </div>
          <figcaption>
            <span class="college-album-lightbox-counter" id="collegeAlbumLightboxCounter"></span>
            <strong id="collegeAlbumLightboxTitle"></strong>
            <p id="collegeAlbumLightboxCaption"></p>
          </figcaption>
        </figure>
        <button type="button" class="college-album-lightbox-arrow next" onclick="collegeAlbumLightboxMove(1)" aria-label="Следующая фотография">→</button>
      </div>
    </div>
  `;

  document.querySelectorAll(".college-album-lightbox").forEach((node) => {
    node.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") collegeAlbumLightboxMove(-1);
      if (event.key === "ArrowRight") collegeAlbumLightboxMove(1);
    });
  });
}

function collegeAlbumGoToPage(page) {
  const album = collegeAlbumData[collegeAlbumCurrent];
  if (!album) return;

  const totalPages = Math.ceil(album.photos.length / collegeAlbumPerPage);
  if (page < 1 || page > totalPages) return;

  collegeAlbumPage = page;
  collegeAlbumCloseLightbox();
  collegeAlbumRenderGallery();
  pageContent.scrollIntoView({ behavior: "smooth", block: "start" });
}

function collegeAlbumOpenLightbox(index) {
  const album = collegeAlbumData[collegeAlbumCurrent];
  if (!album || !album.photos[index]) return;

  collegeAlbumLightboxIndex = index;
  const lightbox = document.getElementById("collegeAlbumLightbox");
  if (!lightbox) return;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("college-album-modal-open");
  collegeAlbumUpdateLightbox();
  lightbox.focus();
}

function collegeAlbumUpdateLightbox() {
  const album = collegeAlbumData[collegeAlbumCurrent];
  const photo = album?.photos[collegeAlbumLightboxIndex];
  if (!photo) return;

  const image = document.getElementById("collegeAlbumLightboxImage");
  const fallback = document.getElementById("collegeAlbumLightboxFallback");
  const counter = document.getElementById("collegeAlbumLightboxCounter");
  const title = document.getElementById("collegeAlbumLightboxTitle");
  const caption = document.getElementById("collegeAlbumLightboxCaption");

  if (image) {
    image.src = photo.src;
    image.alt = photo.title;
    image.style.display = "block";
    image.onerror = () => {
      image.style.display = "none";
      if (fallback) fallback.classList.add("visible");
    };
    image.onload = () => {
      if (fallback) fallback.classList.remove("visible");
    };
  }

  if (fallback) {
    fallback.textContent = String(collegeAlbumLightboxIndex + 1).padStart(2, "0");
  }

  if (counter) {
    counter.textContent = `${String(collegeAlbumLightboxIndex + 1).padStart(2, "0")} / ${String(album.photos.length).padStart(2, "0")}`;
  }
  if (title) title.textContent = photo.title;
  if (caption) caption.textContent = photo.caption;
}

function collegeAlbumLightboxMove(direction) {
  const album = collegeAlbumData[collegeAlbumCurrent];
  if (!album) return;

  collegeAlbumLightboxIndex =
    (collegeAlbumLightboxIndex + direction + album.photos.length) % album.photos.length;

  collegeAlbumUpdateLightbox();
}

function collegeAlbumCloseLightbox() {
  const lightbox = document.getElementById("collegeAlbumLightbox");
  if (!lightbox) {
    document.body.classList.remove("college-album-modal-open");
    return;
  }

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("college-album-modal-open");
}

function renderAbout() {
  return `
    <section class="hero-section">
      <div class="hero-content">
        <span class="hero-label">ИНФОРМАЦИОННЫЙ ПОРТАЛ КОЛЛЕДЖА</span>

        <h1>
          Добро пожаловать<br />
          на сайт Таврического колледжа КФУ им. Вернадского
          </h1>

        <p>
          Информационный портал Таврического колледжа
          Крымского федерального университета им. В. И. Вернадского.
          Здесь собрана информация об образовательных программах,
          учебном процессе, преподавателях, новостях и студенческой жизни.
        </p>

        <div class="hero-actions">
          <button class="primary-button" onclick="selectCategory('education')">
            Перейти к учёбе
            <span>→</span>
          </button>

          <button class="secondary-button" onclick="selectCategory('news')">
            Последние новости
          </button>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">О КОЛЛЕДЖЕ</span>
          <h2>Всё важное — в одном месте</h2>
        </div>

        <a href="#" class="text-link"
           onclick="selectSubcategory('specialties'); return false;">
          Специальности →
        </a>
      </div>

      <div class="card-grid">
        <article class="info-card">
          <div class="card-icon">🎓</div>
          <h3>Образование</h3>
          <p>
            Информация об учебных направлениях, дисциплинах
            и образовательных возможностях.
          </p>
          <a href="#" class="card-link"
             onclick="selectCategory('education'); return false;">
            Подробнее →
          </a>
        </article>

        <article class="info-card">
          <div class="card-icon">📰</div>
          <h3>Новости и события</h3>
          <p>
            Следите за последними новостями, объявлениями
            и мероприятиями колледжа.
          </p>
          <a href="#" class="card-link"
             onclick="selectCategory('news'); return false;">
            Смотреть новости →
          </a>
        </article>

        <article class="info-card">
          <div class="card-icon">🗺️</div>
          <h3>Навигация</h3>
          <p>
            Найдите нужный корпус, кабинет или другой объект
            на карте колледжа.
          </p>
          <a href="#" class="card-link"
             onclick="selectCategory('map'); return false;">
            Открыть карту →
          </a>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">КОЛЛЕДЖ В ЦИФРАХ</span>
          <h2>Немного о нас</h2>
        </div>
      </div>

        <div class="stat-card">
          <span class="stat-number">8</span>
          <span class="stat-label">Основных специальностей</span>
        </div>

        <div class="stat-card">
          <span class="stat-number">900+</span>
          <span class="stat-label">Студентов</span>
        </div>

        <div class="stat-card">
          <span class="stat-number">30+</span>
          <span class="stat-label">Преподавателей</span>
        </div>
      </div>
    </section>
  `;
}

function renderAdditional() {
  return `
    <div class="additional-page">

      <!-- Заголовок страницы -->
      <section class="additional-intro">
        <span class="additional-eyebrow">ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</span>

        <h1>Таврический колледж</h1>

        <p>
          История, актуальные направления подготовки, возможности для студентов
          и контактные сведения Таврического колледжа Крымского федерального
          университета имени В. И. Вернадского.
        </p>
      </section>


      <!-- Краткие факты -->
      <section class="additional-facts">
        <article class="additional-fact">
          <strong>2011</strong>
          <span>Год основания</span>
        </article>

        <article class="additional-fact">
          <strong>900+</strong>
          <span>Студентов</span>
        </article>

        <article class="additional-fact">
          <strong>45+</strong>
          <span>Преподавателей</span>
        </article>

        <article class="additional-fact">
          <strong>СПО</strong>
          <span>Уровень образования</span>
        </article>
      </section>


      <!-- История колледжа -->
      <section class="additional-section history-section">
        <div class="additional-section-heading">
          <span class="additional-label">ИСТОРИЯ</span>
          <h2>История Таврического колледжа</h2>
          <p>
            История колледжа берет начало в мае 2011 года и связана с развитием
            среднего профессионального образования в Крыму.
          </p>
        </div>

        <div class="additional-history">
          <article class="additional-history-item">
            <div class="additional-history-year">Май 2011</div>
            <details class="history-details">
              <summary class="additional-history-card">
                <div class="history-card-content">
                  <span class="history-number">01</span>
                  <h3>Основание колледжа</h3>
                  <p class="history-preview">Колледж был создан по инициативе руководства Таврического национального университета имени В. И. Вернадского.</p>
                </div>
                <span class="history-toggle" aria-hidden="true"></span>
              </summary>
              <div class="history-expanded">
                <p>История Таврического колледжа берет начало в мае 2011 года. Колледж был создан по инициативе ректора Таврического национального университета имени В. И. Вернадского Николая Васильевича Багрова и первого проректора университета Евгения Николаевича Чуяна.</p>
                <p>Создание колледжа было направлено на развитие среднего профессионального образования и предоставление выпускникам основного общего образования возможности получить профессиональную подготовку с перспективой дальнейшего обучения в университете.</p>
              </div>
            </details>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">2011</div>
            <details class="history-details">
              <summary class="additional-history-card">
                <div class="history-card-content">
                  <span class="history-number">02</span>
                  <h3>Первые направления подготовки</h3>
                  <p class="history-preview">На начальном этапе обучение велось по техническим, информационным, экономическим и туристическим направлениям.</p>
                </div>
                <span class="history-toggle" aria-hidden="true"></span>
              </summary>
              <div class="history-expanded">
                <p>На начальном этапе подготовка велась по техническим, информационным, экономическим и туристическим направлениям. Среди первых специальностей были «Компьютерные системы и комплексы», «Программирование в компьютерных системах», «Аналитический контроль качества химических соединений», «Операционная деятельность в логистике», «Финансы» и «Туризм».</p>
              </div>
            </details>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">2014</div>
            <details class="history-details">
              <summary class="additional-history-card">
                <div class="history-card-content">
                  <span class="history-number">03</span>
                  <h3>Вхождение в структуру КФУ</h3>
                  <p class="history-preview">Колледж вошел в структуру Крымского федерального университета имени В. И. Вернадского.</p>
                </div>
                <span class="history-toggle" aria-hidden="true"></span>
              </summary>
              <div class="history-expanded">
                <p>В 2014 году колледж являлся структурным подразделением Таврического национального университета имени В. И. Вернадского. В связи с созданием Крымского федерального университета имени В. И. Вернадского колледж вошел в структуру нового университета.</p>
              </div>
            </details>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">Сентябрь 2015</div>
            <details class="history-details">
              <summary class="additional-history-card">
                <div class="history-card-content">
                  <span class="history-number">04</span>
                  <h3>Объединение с техникумом</h3>
                  <p class="history-preview">Колледж был объединен с техникумом издательско-полиграфических технологий.</p>
                </div>
                <span class="history-toggle" aria-hidden="true"></span>
              </summary>
              <div class="history-expanded">
                <p>В сентябре 2015 года Таврический колледж был объединен с техникумом издательско-полиграфических технологий. В результате в образовательной структуре колледжа получили дальнейшее развитие направления, связанные с издательским делом, полиграфией и дизайном.</p>
              </div>
            </details>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">Сегодня</div>
            <details class="history-details">
              <summary class="additional-history-card">
                <div class="history-card-content">
                  <span class="history-number">05</span>
                  <h3>Современный этап</h3>
                  <p class="history-preview">Таврический колледж является структурным подразделением КФУ имени В. И. Вернадского.</p>
                </div>
                <span class="history-toggle" aria-hidden="true"></span>
              </summary>
              <div class="history-expanded">
                <p>В настоящее время Таврический колледж является структурным подразделением федерального государственного автономного образовательного учреждения высшего образования «Крымский федеральный университет имени В. И. Вернадского».</p>
              </div>
            </details>
          </article>
        </div>
      </section>

      <!-- Направления подготовки -->
      <section class="additional-section">
        <div class="additional-section-heading">
          <span class="additional-label">НАПРАВЛЕНИЯ</span>
          <h2>Основные области подготовки</h2>
          <p>
            В колледже представлены технические, экономические, логистические,
           издательские, туристические и творческие направления подготовки.
          </p>
        </div>

        <div class="additional-directions">

    <article class="additional-direction-card">
      <div class="additional-card-number">01</div>

      <h3>Информационные технологии</h3>

      <p>
        Компьютерные системы и комплексы, разработка программного
        обеспечения и управление цифровыми решениями.
      </p>
    </article>


    <article class="additional-direction-card">
      <div class="additional-card-number">02</div>

      <h3>Экономика и финансы</h3>

      <p>
        Финансы и страховое дело, экономические процессы
        и управление финансовыми ресурсами.
      </p>
    </article>


    <article class="additional-direction-card">
      <div class="additional-card-number">03</div>

      <h3>Логистика</h3>

      <p>
        Организация перевозок, управление операционной деятельностью
        и координация логистических процессов.
      </p>
    </article>


    <article class="additional-direction-card">
      <div class="additional-card-number">04</div>

      <h3>Издательское дело</h3>

      <p>
        Подготовка печатных и цифровых материалов, работа с текстами,
        публикациями и издательскими проектами.
      </p>
    </article>


    <article class="additional-direction-card">
      <div class="additional-card-number">05</div>

      <h3>Туризм и гостеприимство</h3>

      <p>
        Организация туристических услуг, обслуживание гостей,
        экскурсионная деятельность и сервис.
      </p>
    </article>


    <article class="additional-direction-card">
      <div class="additional-card-number">06</div>

      <h3>Дизайн</h3>

      <p>
        Разработка визуальных решений, работа с композицией,
        графикой и творческими проектами по различным отраслям.
      </p>
    </article>

  </div>

        <button
          class="additional-specialties-button"
          onclick="selectSubcategory('specialties')"
        >
          Перейти к специальностям
          <span>→</span>
        </button>
      </section>


      <!-- Студенческие возможности -->
      <section class="additional-section">
        <div class="additional-section-heading">
          <span class="additional-label">СТУДЕНЧЕСКАЯ ЖИЗНЬ</span>
          <h2>Возможности для студентов</h2>
          <p>
            Учёба в колледже включает не только освоение программы,
            но и участие в проектах, мероприятиях и общественной жизни.
          </p>
        </div>

        <div class="additional-benefits">

          <article class="additional-benefit-card">
            <div class="additional-benefit-icon">↗</div>
            <h3>Практические занятия</h3>
            <p>
              Получение профессиональных навыков и практического опыта.
            </p>
          </article>

          <article class="additional-benefit-card">
            <div class="additional-benefit-icon">✦</div>
            <h3>Проекты и конференции</h3>
            <p>
              Участие в образовательных, исследовательских и творческих проектах.
            </p>
          </article>

          <article class="additional-benefit-card">
            <div class="additional-benefit-icon">◌</div>
            <h3>Мероприятия</h3>
            <p>
              Экскурсии, встречи, конкурсы и другие события колледжа.
            </p>
          </article>

          <article class="additional-benefit-card">
            <div class="additional-benefit-icon">+</div>
            <h3>Общение и развитие</h3>
            <p>
              Развитие командных навыков, коммуникации и самостоятельности.
            </p>
          </article>

        </div>
      </section>


      <!-- Контакты -->
      <section class="additional-section additional-official-section">
        <div class="additional-section-heading">
          <span class="additional-label">КОНТАКТЫ</span>
          <h2>Официальные сведения</h2>
          <p>
            Контактная информация колледжа для студентов, родителей
            и абитуриентов.
          </p>
        </div>

        <div class="additional-official-layout">

          <div class="additional-contact-card">

            <div class="additional-contact-row">
              <span>Полное наименование</span>
              <strong>
                Таврический колледж Крымского федерального университета
                имени В. И. Вернадского
              </strong>
            </div>

            <div class="additional-contact-row">
              <span>Адрес</span>
              <strong>
                295034, Республика Крым, г. Симферополь,
                ул. Киевская, 116Б
              </strong>
            </div>

            <div class="additional-contact-row">
              <span>Руководитель</span>
              <strong>Гавриленко Юлия Михайловна</strong>
            </div>

            <div class="additional-contact-row">
              <span>Телефон</span>
              <a href="tel:+73652545286">
                +7 (3652) 54-52-86
              </a>
            </div>

            <div class="additional-contact-row">
              <span>Email</span>
              <a href="mailto:Kolledzh.tnu@mail.ru">
                Kolledzh.tnu@mail.ru
              </a>
            </div>

          </div>

          <div class="additional-links-card">
            <h3>Полезные ссылки</h3>

            <a
              href="https://college.cfuv.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Официальный сайт</span>
              <span>↗</span>
            </a>

            <a
              href="https://college.cfuv.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Сведения об организации</span>
              <span>↗</span>
            </a>

            <a
              href="https://college.cfuv.ru/abiturientam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Абитуриентам</span>
              <span>↗</span>
            </a>
          </div>

        </div>

        <div class="additional-note">
          Актуальные сведения о лицензии, государственной аккредитации,
          правилах приёма и образовательных программах рекомендуется
          уточнять на официальном сайте колледжа.
        </div>
      </section>

    </div>
  `;
}

// =========================================
// 9. СПЕЦИАЛЬНОСТИ
// =========================================

const specialtiesData = [
  {
    number: "01",
    code: "09.02.01",
    title: "Компьютерные системы и комплексы",
    category: "Информационные технологии",
    form: "Очная",
    qualification: "Техник по компьютерным системам",
    cost: "97 тыс. руб.",
    foreignCost: "107 тыс. руб.",
    description:
      "Подготовка специалистов по проектированию, настройке, обслуживанию и эксплуатации компьютерных систем и комплексов."
  },
  {
    number: "02",
    code: "09.02.11",
    title: "Разработка и управление программным обеспечением",
    category: "Информационные технологии",
    form: "Очная",
    qualification: "Программист",
    cost: "96 тыс. руб.",
    foreignCost: "Уточняется",
    description:
      "Подготовка специалистов в области разработки, тестирования, сопровождения и управления программным обеспечением."
  },
  {
    number: "03",
    code: "38.02.02",
    title: "Страховое дело (по отраслям)",
    category: "Экономика и финансы",
    form: "Очная",
    qualification: "Специалист страхового дела",
    cost: "95 тыс. руб.",
    foreignCost: "104 тыс. руб.",
    description:
      "Изучение организации страховой деятельности, страховых продуктов, оформления договоров и сопровождения клиентов."
  },
  {
    number: "04",
    code: "38.02.03",
    title: "Операционная деятельность в логистике",
    category: "Логистика",
    form: "Очная",
    qualification: "Операционный логист",
    cost: "95 тыс. руб.",
    foreignCost: "104 тыс. руб.",
    description:
      "Подготовка специалистов по организации поставок, транспортировке, хранению товаров и управлению логистическими процессами."
  },
  {
    number: "05",
    code: "38.02.06",
    title: "Финансы",
    category: "Экономика и финансы",
    form: "Очная",
    qualification: "Финансист",
    cost: "96 тыс. руб.",
    foreignCost: "104 тыс. руб.",
    description:
      "Подготовка специалистов по финансовому планированию, анализу денежных потоков, бюджетированию и работе с финансовой документацией."
  },
  {
    number: "06",
    code: "42.02.02",
    title: "Издательское дело",
    category: "Издательское дело",
    form: "Очная",
    qualification: "Специалист издательского дела",
    cost: "97 тыс. руб.",
    foreignCost: "107 тыс. руб.",
    description:
      "Изучение подготовки, редактирования, оформления и выпуска печатных и цифровых изданий."
  },
  {
    number: "07",
    code: "43.02.16",
    title: "Туризм и гостеприимство",
    category: "Туризм и сервис",
    form: "Очная",
    qualification: "Специалист по туризму и гостеприимству",
    cost: "95 тыс. руб.",
    foreignCost: "104 тыс. руб.",
    description:
      "Подготовка специалистов по организации туристических услуг, обслуживанию гостей, экскурсионной деятельности и гостиничному сервису."
  },
  {
    number: "08",
    code: "54.02.01",
    title: "Дизайн (по отраслям)",
    category: "Творческие направления",
    form: "Очная",
    qualification: "Дизайнер",
    cost: "245 тыс. руб.",
    foreignCost: "269 тыс. руб.",
    description:
      "Подготовка специалистов по разработке визуальных решений, композиции, графике, оформлению и созданию дизайн-проектов."
  }
];

// =========================================
// ПОСТУПЛЕНИЕ — ДАННЫЕ И КАЛЬКУЛЯТОР
// =========================================

const admissionData = [
  {
    code: "09.02.01",
    title: "Компьютерные системы и комплексы",
    minScore: 4.263,
    budgetSeats: 40,
    contractSeats: 10
  },
  {
    code: "09.02.07",
    title: "Информационные системы и программирование",
    minScore: 4.20,
    budgetSeats: 25,
    contractSeats: 25
  },
  {
    code: "38.02.02",
    title: "Страховое дело (по отраслям)",
    minScore: 4.20,
    budgetSeats: 15,
    contractSeats: 10
  },
  {
    code: "38.02.03",
    title: "Операционная деятельность в логистике",
    minScore: 4.650,
    budgetSeats: 15,
    contractSeats: 35
  },
  {
    code: "38.02.06",
    title: "Финансы",
    minScore: 4.61,
    budgetSeats: 30,
    contractSeats: 20
  },
  {
    code: "42.02.02",
    title: "Издательское дело",
    minScore: 4.45,
    budgetSeats: 15,
    contractSeats: 10
  },
  {
    code: "43.02.16",
    title: "Туризм и гостеприимство",
    minScore: 4.650,
    budgetSeats: 25,
    contractSeats: 25
  },
  {
    code: "54.02.01",
    title: "Дизайн (по отраслям)",
    minScore: 4.45,
    budgetSeats: 10,
    contractSeats: 15
  }
];


// Форматирование среднего балла
function formatAdmissionScore(value) {
  return Number(value)
    .toFixed(3)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", ",");
}


// Расчёт ориентировочной вероятности
function getAdmissionProbability(score, minScore) {
  /*
    ВАЖНО:
    Это ознакомительная модель, а не реальная статистика.

    При балле, равном минимальному ориентиру,
    вероятность составляет около 55%, а не 100%.

    Чем выше балл относительно ориентира,
    тем выше результат.
  */

  const difference = score - minScore;

  const probability = 55 + difference * 145;

  return Math.max(
    5,
    Math.min(95, Math.round(probability))
  );
}


// Определение цвета результата
function getProbabilityTone(probability) {
  if (probability >= 75) return "high";
  if (probability >= 45) return "medium";
  return "low";
}


// =========================================
// ОТРИСОВКА СТРАНИЦЫ «ПОСТУПЛЕНИЕ»
// =========================================

function renderAdmission() {
  return `
    <div class="admission-page">

      <!-- ================= HERO ================= -->

      <section class="admission-hero">

        <div class="admission-hero-content">

          <span class="admission-eyebrow">
            ПРИЁМНАЯ КАМПАНИЯ
          </span>

          <h1>
            Поступление<br />
            в колледж
          </h1>

          <p>
            Узнайте больше о поступлении, сравните свой средний
            балл аттестата с ориентировочными минимальными баллами
            и ознакомьтесь с количеством мест по специальностям.
          </p>

          <div class="admission-hero-points">
            <span>
              <b>01</b>
              Выберите образование
            </span>

            <span>
              <b>02</b>
              Укажите средний балл
            </span>

            <span>
              <b>03</b>
              Получите ориентир
            </span>
          </div>

        </div>

        <div class="admission-hero-orbit" aria-hidden="true">
          <span class="orbit orbit-one"></span>
          <span class="orbit orbit-two"></span>
        </div>

      </section>


      <!-- ================= КАЛЬКУЛЯТОР ================= -->

      <section class="admission-section admission-calculator-section">

        <div class="admission-section-heading">

          <div>
            <span class="pill">
              КАЛЬКУЛЯТОР
            </span>

            <h2>
              Оцените свои шансы
            </h2>

            <p>
              Введите средний балл аттестата и выберите специальность,
              чтобы получить ориентировочную вероятность поступления.
            </p>
          </div>

          <div class="admission-secure-badge">
            ⓘ Только для ознакомления
          </div>

        </div>


        <div class="admission-calculator-card">

          <form
            class="admission-form"
            id="admissionForm"
          >

            <!-- Тип аттестата -->

            <div class="admission-field">

              <label for="admissionEducation">
                Документ об образовании
              </label>

              <select id="admissionEducation">

                <option value="9">
                  Аттестат за 9 класс
                </option>

                <option value="11">
                  Аттестат за 11 класс
                </option>

              </select>

              <span class="admission-field-hint">
                Выберите класс, после которого планируете поступать.
              </span>

            </div>


            <!-- Средний балл -->

            <div class="admission-field">

              <label for="admissionScore">
                Средний балл аттестата
              </label>

              <div class="admission-score-input-wrap">

                <input
                  id="admissionScore"
                  type="number"
                  min="2"
                  max="5"
                  step="0.001"
                  placeholder="Например, 4.35"
                  required
                />

                <span>
                  из 5,00
                </span>

              </div>

              <span class="admission-field-hint">
                Укажите значение от 2,00 до 5,00.
              </span>

            </div>


            <!-- Специальность -->

            <div class="admission-field admission-field-wide">

              <label for="admissionSpecialty">
                Предполагаемая специальность
              </label>

              <select
                id="admissionSpecialty"
                required
              >

                <option value="">
                  Выберите специальность
                </option>

                ${admissionData
                  .map(
                    (item) => `
                      <option value="${item.code}">
                        ${item.code} — ${item.title}
                      </option>
                    `
                  )
                  .join("")}

              </select>

            </div>


            <!-- Кнопка -->

            <button
              type="submit"
              class="primary-button admission-submit-button"
            >
              Рассчитать вероятность
              <span>→</span>
            </button>

          </form>


          <!-- Предупреждение -->

          <div class="admission-disclaimer">

            <span class="admission-disclaimer-icon">
              i
            </span>

            <p>
              <strong>Важно:</strong>
              результаты являются приблизительным ориентиром
              для ознакомления. Они не гарантируют поступление
              в колледж и не заменяют официальную информацию
              приёмной комиссии.
            </p>

          </div>


          <!-- Результат -->

          <div
            class="admission-result"
            id="admissionResult"
            aria-live="polite"
          ></div>

        </div>

      </section>


      <!-- ================= ТАБЛИЦА ================= -->

      <section class="admission-section">

        <div class="admission-section-heading">

          <div>

            <span class="pill">
              КОНТРОЛЬНЫЕ ЦИФРЫ ПРИЁМА
            </span>

            <h2>
              Специальности и количество мест
            </h2>

            <p>
              Количество бюджетных и договорных мест
              по представленным направлениям.
            </p>

          </div>

        </div>


        <div class="admission-table-wrap">

          <table class="admission-table">

            <thead>
              <tr>
                <th>Код</th>
                <th>Специальность</th>
                <th>Ориентировочный<br />мин. балл</th>
                <th>Бюджетные<br />места</th>
                <th>Договорные<br />места</th>
                <th>Всего</th>
              </tr>
            </thead>

            <tbody>

              ${admissionData
                .map(
                  (item) => `
                    <tr>

                      <td>
                        <span class="admission-code">
                          ${item.code}
                        </span>
                      </td>

                      <td>
                        <strong>
                          ${item.title}
                        </strong>
                      </td>

                      <td>
                        <span class="admission-min-score">
                          ${formatAdmissionScore(item.minScore)}
                        </span>
                      </td>

                      <td>
                        ${item.budgetSeats}
                      </td>

                      <td>
                        ${item.contractSeats}
                      </td>

                      <td>
                        <strong>
                          ${item.budgetSeats + item.contractSeats}
                        </strong>
                      </td>

                    </tr>
                  `
                )
                .join("")}

            </tbody>

          </table>

        </div>

        <p class="admission-table-note">
          * Минимальные баллы указаны как ориентир на основе
          предоставленных данных и могут изменяться в зависимости
          от приёмной кампании.
        </p>

      </section>

    </div>
  `;
}


// =========================================
// ОБРАБОТКА КАЛЬКУЛЯТОРА
// =========================================

function initAdmissionCalculator() {

  const form = document.getElementById("admissionForm");
  const result = document.getElementById("admissionResult");

  if (!form || !result) return;


  form.addEventListener("submit", (event) => {

    event.preventDefault();


    const scoreInput =
      document.getElementById("admissionScore");

    const specialtyInput =
      document.getElementById("admissionSpecialty");


    const score = Number.parseFloat(
      String(scoreInput.value).replace(",", ".")
    );


    const specialty = admissionData.find(
      (item) => item.code === specialtyInput.value
    );


    scoreInput.classList.remove("invalid");


    // Проверка данных

    if (
      !Number.isFinite(score) ||
      score < 2 ||
      score > 5 ||
      !specialty
    ) {

      scoreInput.classList.add("invalid");

      result.innerHTML = `
        <div class="admission-result-error">
          Проверьте средний балл и выбранную специальность.
        </div>
      `;

      return;
    }


    // Расчёт

    const probability = getAdmissionProbability(
      score,
      specialty.minScore
    );

    const tone = getProbabilityTone(probability);

    const difference = score - specialty.minScore;


    const comparisonText = difference >= 0
      ? `Ваш балл выше ориентира на ${formatAdmissionScore(Math.abs(difference))}.`
      : `До ориентира не хватает ${formatAdmissionScore(Math.abs(difference))}.`;


    // Вывод результата

    result.innerHTML = `

      <div class="admission-result-card ${tone}">

        <div class="admission-result-topline">

          <span class="admission-result-label">
            ОРИЕНТИРОВОЧНЫЙ РЕЗУЛЬТАТ
          </span>

          <span class="admission-result-status">
            ${
              tone === "high"
                ? "Высокий ориентир"
                : tone === "medium"
                  ? "Средний ориентир"
                  : "Невысокий ориентир"
            }
          </span>

        </div>


        <div class="admission-result-main">

          <div>

            <span class="admission-result-specialty">
              ${specialty.code} · ${specialty.title}
            </span>

            <h3>
              Вероятность поступления
            </h3>

            <p>
              ${comparisonText}
              Минимальный ориентир:
              <strong>
                ${formatAdmissionScore(specialty.minScore)}
              </strong>.
            </p>

          </div>


          <div
            class="admission-probability"
            aria-label="Вероятность ${probability} процентов"
          >

            <strong>
              ${probability}%
            </strong>

          </div>

        </div>


        <div class="admission-progress">
          <span style="width: ${probability}%"></span>
        </div>


        <p class="admission-result-footnote">
          Расчёт носит ознакомительный характер
          и не является гарантией зачисления.
        </p>

      </div>

    `;

  });

}

function renderSpecialties() {
  return `
    <div class="text-block">
      <span class="pill">ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ</span>

      <h1>Специальности</h1>

      <p>
        Выберите интересующее направление подготовки, чтобы узнать
        подробнее о квалификации, содержании обучения и стоимости
        образовательной программы.
      </p>
    </div>

    <div class="specialties-list">
      ${specialtiesData
        .map(
          (item) => `
            <details class="specialty-details">
              <summary class="specialty-item">
                <div class="specialty-number">${item.number}</div>

                <div class="specialty-main-info">
                  <span class="specialty-code">${item.code}</span>

                  <h3>${item.title}</h3>

                  <p>${item.category}</p>
                </div>

                <div class="specialty-cost-preview">
                  <span>Стоимость</span>
                  <strong>${item.cost}</strong>
                </div>

                <span class="specialty-toggle">+</span>
              </summary>

              <div class="specialty-reference">
                <div class="reference-header">
                  <span class="eyebrow">
                    СПРАВКА О СПЕЦИАЛЬНОСТИ
                  </span>

                  <span class="reference-code">
                    ${item.code}
                  </span>
                </div>

                <h3>${item.title}</h3>

                <div class="reference-row">
                  <strong>Форма обучения</strong>
                  <span>Очная</span>
                </div>

                <div class="reference-row">
                  <strong>Квалификация</strong>
                  <span>${item.qualification}</span>
                </div>

                <div class="reference-row">
                  <strong>Стоимость обучения</strong>
                  <span class="reference-price">${item.cost}</span>
                </div>

                <div class="reference-description">
                  <strong>Описание направления</strong>
                  <p>${item.description}</p>
                </div>

              </div>
            </details>
          `
        )
        .join("")}
    </div>
  `;
}

// =========================================
// 10. НОВОСТИ
// =========================================

const newsData = [
  {
    day: "12",
    month: "СЕН",
    tag: "ОБЪЯВЛЕНИЯ",
    title: "Начало нового учебного года",
    text: "Информация для студентов о начале учебных занятий и организационных вопросах."
  },
  {
    day: "15",
    month: "СЕН",
    tag: "МЕРОПРИЯТИЯ",
    title: "День открытых дверей",
    text: "В колледже состоится мероприятие для будущих студентов и гостей."
  },
  {
    day: "18",
    month: "СЕН",
    tag: "УЧЁБА",
    title: "Обновление учебных материалов",
    text: "В разделе практических работ появились новые материалы для самостоятельной подготовки."
  }
];

function renderNewsList(items = newsData) {
  return `
    <div class="news-list">
      ${items
        .map(
          (item) => `
            <article class="news-card">
              <div class="news-date">
                <strong>${item.day}</strong>
                <span>${item.month}</span>
              </div>

              <div>
                <span class="news-tag">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAllNews() {
  return `
    <div class="text-block">
      <span class="pill">ИНФОРМАЦИОННАЯ ЛЕНТА</span>
      <h1>Все новости</h1>
      <p>
        Здесь будут отображаться новости колледжа, учебные объявления
        и важные события.
      </p>
    </div>

    <section class="content-section">
      ${renderNewsList()}
    </section>
  `;
}

function renderEvents() {
  const events = newsData.filter((item) => item.tag === "МЕРОПРИЯТИЯ");

  return `
    <div class="text-block">
      <span class="pill">СОБЫТИЯ</span>
      <h1>Мероприятия</h1>
      <p>
        Информация о предстоящих мероприятиях, конкурсах,
        встречах и других событиях колледжа.
      </p>
    </div>

    <section class="content-section">
      ${renderNewsList(events)}
    </section>
  `;
}

function renderAnnouncements() {
  const announcements = newsData.filter(
    (item) => item.tag === "ОБЪЯВЛЕНИЯ"
  );

  return `
    <div class="text-block">
      <span class="pill">ВАЖНАЯ ИНФОРМАЦИЯ</span>
      <h1>Объявления</h1>
      <p>
        Здесь будут размещаться важные объявления для студентов
        и преподавателей.
      </p>
    </div>

    <section class="content-section">
      ${renderNewsList(announcements)}
    </section>
  `;
}

// =========================================
// 11. УЧЕБНЫЕ РАЗДЕЛЫ — ЗАГЛУШКИ
// =========================================

function renderSchedule() {
  return `
    <div class="text-block">
      <span class="pill">УЧЕБНЫЙ ПРОЦЕСС</span>
      <h1>Расписание</h1>
      <p>
        В этом разделе будет реализована таблица расписания
        с выбором группы, дня недели и учебной недели.
      </p>
    </div>

    <div class="placeholder-panel">
      <div class="placeholder-icon">📅</div>
      <h3>Модуль расписания готовится</h3>
      <p>
        Здесь появится таблица занятий в формате,
        похожем на Excel: время, дисциплина, преподаватель и кабинет.
      </p>
    </div>
  `;
}

function renderTeachers() {
  return `
    <div class="text-block">
      <span class="pill">ПРЕПОДАВАТЕЛЬСКИЙ СОСТАВ</span>
      <h1>Преподаватели</h1>
      <p>
        В этом разделе будут представлены анкеты преподавателей,
        их дисциплины, кабинеты и контактная информация.
      </p>
    </div>

    <div class="placeholder-panel">
      <div class="placeholder-icon">👨‍🏫</div>
      <h3>Каталог преподавателей</h3>
      <p>
        Здесь появятся красивые карточки преподавателей
        с фотографиями и подробной информацией.
      </p>
    </div>
  `;
}

function renderPractice() {
  return `
    <div class="text-block">
      <span class="pill">УЧЕБНЫЕ МАТЕРИАЛЫ</span>
      <h1>Практические работы</h1>
      <p>
        В данном разделе будут собраны примеры выполнения практических
        работ по дисциплинам МПС и ПМК. Студенты смогут просматривать
        материалы и скачивать необходимые файлы.
      </p>
    </div>

    <div class="card-grid">
      <article class="info-card">
        <div class="card-icon">💻</div>
        <h3>МПС</h3>
        <p>
          Практические работы и учебные материалы по дисциплине МПС.
        </p>
        <a href="#" class="card-link">Открыть работы →</a>
      </article>

      <article class="info-card">
        <div class="card-icon">🧩</div>
        <h3>ПМК</h3>
        <p>
          Практические работы и учебные материалы по дисциплине ПМК.
        </p>
        <a href="#" class="card-link">Открыть работы →</a>
      </article>
    </div>
  `;
}

function renderLibrary() {
  return `
    <div class="text-block">
      <span class="pill">ЗНАНИЯ И РЕСУРСЫ</span>
      <h1>Библиотека</h1>
      <p>
        В библиотеке будут представлены учебники, методические пособия
        и полезные материалы, сгруппированные по специальностям.
      </p>
    </div>

    <div class="placeholder-panel">
      <div class="placeholder-icon">📚</div>
      <h3>Электронная библиотека</h3>
      <p>
        Здесь появится список специальностей с раскрывающимися
        списками книг и описаниями.
      </p>
    </div>
  `;
}

// =========================================
// 12. КАРТА
// =========================================

/* ---------- Страница «Яндекс.Карты» ---------- */

function renderYandexMapsPage() {
  const maps = [
    {
      title: "Основной корпус",
      address: "ул. Киевская, 116Б",
      link: "https://yandex.ru/maps/146/simferopol/house/kiyevskaya_ulitsa_116b/Z00Ydg5gSUYFQFpufXV2dXprZA==/?ll=34.090145%2C44.974536&z=19.2",
      src: "https://yandex.ru/map-widget/v1/?ll=34.090145%2C44.974536&z=19.2"
    },
    {
      title: "Железнодорожный корпус",
      address: "ул. Железнодорожная, 2",
      link: "https://yandex.ru/maps/146/simferopol/house/zheleznodorozhnaya_ulitsa_2/Z00Ydg5iSEcCQFpufXV2cXhhZA==/?indoorLevel=1&ll=34.092801%2C44.970823&z=18.87",
      src: "https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=34.092801%2C44.970823&z=18.87"
    }
  ];

  return `
    <div class="text-block">
      <span class="pill">НАВИГАЦИЯ ПО КОЛЛЕДЖУ</span>
      <h1>Местоположение на карте</h1>
      <p>
        Расположение корпусов колледжа на интерактивных картах.
        Нажмите «Открыть в Яндекс.Картах», чтобы построить маршрут.
      </p>
    </div>

    <div class="yandex-maps-grid">
      ${maps
      .map(
          (map) => `
        <article class="yandex-map-card">
          <div class="yandex-map-card-header">
            <h3>${map.title}</h3>
            <p>${map.address}</p>
          </div>

          <div class="yandex-map-frame">
            <iframe
              src="${map.src}"
              allowfullscreen
              loading="lazy"
              title="${map.title}"
            ></iframe>
          </div>

          <a
            class="yandex-map-link"
            href="${map.link}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Открыть в Яндекс.Картах</span>
            <span>↗</span>
          </a>
        </article>
      `
      )
      .join("")}
    </div>
  `;
}

/* ---------- Данные планов корпусов ----------
   bg   — путь к фоновой картинке плана
   imgW, imgH — размеры исходной картинки в пикселях
   x, y, w, h — координаты кабинета В ПИКСЕЛЯХ ОТНОСИТЕЛЬНО ИСХОДНОЙ КАРТИНКИ
--------------------------------------------- */

const campusPlansData = {
  /* ================= ОСНОВНОЙ КОРПУС ================= */
  maincampus: {
    title: "Основной корпус",
    address: "ул. Киевская, 116Б",
    floors: [
      /* ---------- 1 ЭТАЖ ---------- */
      {
        id: "floor-1",
        label: "1 этаж",
        bg: "assets/images/albums/map/map1.png",
        imgW: 1280,
        imgH: 960,
        rooms: [
          /* Верхний левый блок */
          { id: "6.4", number: "6.4", teacher: "", x: 90, y: 95, w: 75, h: 185 },
          { id: "6.3", number: "6.3", teacher: "", x: 170, y: 155, w: 75, h: 120 },
          { id: "gym", number: "Спортзал", teacher: "", x: 540, y: 95, w: 325, h: 190, small: true },

          /* Левый средний блок */
          { id: "5.1", number: "5.1", teacher: "", x: 95, y: 390, w: 82, h: 100 },
          { id: "5.2", number: "5.2", teacher: "", x: 183, y: 390, w: 80, h: 100 },
          { id: "5.3", number: "5.3", teacher: "", x: 265, y: 390, w: 90, h: 100 },

          /* Правый средний блок */
          { id: "2.4", number: "2.4", teacher: "", x: 850, y: 355, w: 60, h: 85 },
          { id: "2.3", number: "2.3", teacher: "", x: 910, y: 355, w: 60, h: 85 },
          { id: "2.2", number: "2.2", teacher: "", x: 980, y: 355, w: 60, h: 85 },
          { id: "2.1", number: "2.1", teacher: "", x: 1050, y: 355, w:65, h: 85 },

          /* Нижний правый блок */
          { id: "1.2", number: "1.2", teacher: "", x: 896, y: 656, w: 85, h: 95 },
          { id: "1.1", number: "1.1", teacher: "", x: 1034, y: 658, w: 60, h: 95 }
        ]
      },

      /* ---------- 2 ЭТАЖ ---------- */
      {
        id: "floor-2",
        label: "2 этаж",
        bg: "assets/images/albums/map/map2.png",
        imgW: 1280,
        imgH: 960,
        rooms: [
          /* Верхний левый блок */
          { id: "6.10", number: "6.10", teacher: "", x: 100, y: 155, w: 73, h: 125 },
          { id: "6.9", number: "6.9", teacher: "", x: 174, y: 155, w: 70, h: 125 },

          /* 6.7 / 6.6 */
          { id: "6.7", number: "6.7", teacher: "", x: 555, y: 132, w: 135, h: 148 },
          { id: "6.6", number: "6.6", teacher: "", x: 695, y: 132, w: 165, h: 148 },

          /* Левый средний блок */
          { id: "5.6", number: "5.6", teacher: "", x: 95, y: 390, w: 105, h: 100 },
          { id: "5.5", number: "5.5", teacher: "", x: 210, y: 390, w: 145, h: 100 },
          { id: "5.4", number: "5.4", teacher: "", x: 360, y: 285, w: 65, h: 135 },

          /* Правый средний блок */
          { id: "2.8", number: "2.8", teacher: "Федяев М.И.", x: 850, y: 355, w: 70, h: 85 },
          { id: "2.7", number: "2.7", teacher: "", x: 913, y: 355, w: 70, h: 85 },
          { id: "2.6", number: "2.6", teacher: "", x: 987, y: 355, w: 70, h: 85 },
          { id: "2.5", number: "2.5", teacher: "", x: 1060, y: 355, w: 70, h: 85 },

          /* Актовый зал */
          { id: "hall", number: "Актовый зал", teacher: "", x: 435, y: 500, w: 200, h: 140, small: true },
          { id: "3.5", number: "3.5", teacher: "", x: 630, y: 566, w: 60, h: 75 },
          { id: "3.6", number: "3.6", teacher: "", x: 695, y: 566, w: 60, h: 75 },

          /* Нижний левый блок */
          { id: "4.10", number: "4.10", teacher: "", x: 95, y: 685, w: 40, h: 110 },
          { id: "4.9", number: "4.9", teacher: "", x: 140, y: 685, w: 40, h: 110 },
          { id: "4.8", number: "4.8", teacher: "", x: 180, y: 685, w: 40, h: 110 },
          { id: "4.7", number: "4.7", teacher: "", x: 220, y: 685, w: 40, h: 110 },
          { id: "4.6", number: "4.6", teacher: "", x: 260, y: 685, w: 70, h: 40 },

          /* Нижний правый блок */
          { id: "1.7", number: "1.7", teacher: "", x: 895, y: 655, w: 50, h: 110 },
          { id: "1.6", number: "1.6", teacher: "", x: 945, y: 655, w: 50, h: 110 },
          { id: "1.5", number: "1.5", teacher: "", x: 995, y: 655, w: 50, h: 60 }
        ]
      }
    ]
  },

  /* ================= ЖЕЛЕЗНОДОРОЖНЫЙ КОРПУС ================= */
  ZhDCampus: {
    title: "Железнодорожный корпус",
    address: "ул. Железнодорожная, 2",
    floors: [
      /* ---------- 1 ЭТАЖ ---------- */
      {
        id: "floor-1",
        label: "1 этаж",
        bg: "assets/images/albums/map/map3.png",
        imgW: 1280,
        imgH: 640,
        rooms: [
          /* Верхний ряд */
          { id: "5", number: "5", teacher: "", x: 65, y: 180, w: 205, h: 128 },
          { id: "11", number: "11", teacher: "", x: 490, y: 180, w: 345, h: 128 },
          { id: "8", number: "8", teacher: "", x: 1040, y: 180, w: 175, h: 128 },

          /* Нижний ряд */
          { id: "4", number: "4", teacher: "", x: 65, y: 310, w: 130, h: 140 },
          { id: "1", number: "1", teacher: "", x: 260, y: 357, w: 85, h: 100, small: true },
          { id: "7", number: "7", teacher: "", x: 460, y: 357, w: 100, h: 95 },
          { id: "12", number: "12", teacher: "", x: 560, y: 357, w: 90, h: 95 },
          { id: "13", number: "13", teacher: "", x: 650, y: 357, w: 200, h: 95 },
          { id: "10", number: "10", teacher: "", x: 975, y: 357, w: 120, h: 95, small: true },
          { id: "9", number: "9", teacher: "", x: 1100, y: 310, w: 125, h: 140 }
        ]
      },

      /* ---------- 2 ЭТАЖ ---------- */
      {
        id: "floor-2",
        label: "2 этаж",
        bg: "assets/images/albums/map/map4.png",
        imgW: 1280,
        imgH: 640,
        rooms: [
          /* Верхний ряд */
          { id: "15", number: "15", teacher: "", x: 50, y: 175, w: 210, h: 130 },
          { id: "15a", number: "15а", teacher: "", x: 265, y: 175, w: 75, h: 90, small: true },
          { id: "16", number: "16", teacher: "-", x: 340, y: 175, w: 65, h: 90, small: true },
          { id: "17", number: "17", teacher: "", x: 405, y: 175, w: 240, h: 130 },
          { id: "23", number: "23", teacher: "", x: 650, y: 175, w: 220, h: 130 },
          { id: "22", number: "22", teacher: "", x: 870, y: 175, w: 75, h: 130, small: true },
          { id: "22a", number: "22а", teacher: "", x: 945, y: 175, w: 65, h: 95, small: true },
          { id: "21", number: "21", teacher: "", x: 1015, y: 175, w: 215, h: 130 },

          /* Нижний ряд */
          { id: "14", number: "14", teacher: "", x: 50, y: 310, w: 200, h: 120 },
          { id: "18", number: "18", teacher: "", x: 390, y: 310, w: 255, h: 120 },
          { id: "24", number: "24", teacher: "", x: 650, y: 310, w: 150, h: 120 },
          { id: "25", number: "25", teacher: "", x: 800, y: 350, w: 80, h: 80, small: true },
          { id: "19", number: "19", teacher: "", x: 930, y: 340, w: 85, h: 90 },
          { id: "20", number: "20", teacher: "", x: 1015, y: 310, w: 215, h: 120 }
        ]
      }
    ]
  }
};

/* ---------- Страница «Карта корпусов» ---------- */

function renderCampusPlansPage() {
  return `
    <div class="text-block">
      <span class="pill">ПЛАНЫ ЭТАЖЕЙ</span>
      <h1>Карта корпусов</h1>
      <p>
        Интерактивные схемы этажей. Наведите курсор на кабинет,
        чтобы увидеть его номер и закреплённого преподавателя.
      </p>
    </div>

    <div class="campus-plans">
      ${Object.entries(campusPlansData)
      .map(
          ([campusId, campus]) => `
        <section class="campus-plan-block" data-campus="${campusId}">
          <h3>${campus.title}</h3>
          <p>${campus.address}</p>

          <div class="floor-tabs">
            ${campus.floors
              .map(
                  (floor, index) => `
              <button
                class="floor-tab-button ${index === 0 ? "active" : ""}"
                data-floor-tab="${campusId}-${floor.id}"
              >
                ${floor.label}
              </button>
            `
              )
              .join("")}
          </div>

          ${campus.floors
              .map(
                  (floor, index) => `
            <div
              class="floor-panel ${index === 0 ? "active" : ""}"
              data-floor-panel="${campusId}-${floor.id}"
            >
              ${renderFloorPlan(floor)}
            </div>
          `
              )
              .join("")}
        </section>
      `
      )
      .join("")}
    </div>
  `;
}

/* ---------- Отрисовка плана этажа ---------- */

function renderFloorPlan(floor) {
  /* Преобразуем пиксели в проценты относительно исходного размера картинки */
  const pxToPercentX = (value) => (value / floor.imgW) * 100;
  const pxToPercentY = (value) => (value / floor.imgH) * 100;

  /* padding-top задаёт пропорции контейнера = пропорции картинки */
  const paddingTop = (floor.imgH / floor.imgW) * 100;

  const roomsHtml = floor.rooms
      .map((room) => {
        const classes = ["room"];
        if (room.small) classes.push("room--small");
        if (room.vertical) classes.push("room--vertical");

        const style = `
        left:${pxToPercentX(room.x)}%;
        top:${pxToPercentY(room.y)}%;
        width:${pxToPercentX(room.w)}%;
        height:${pxToPercentY(room.h)}%;
      `.replace(/\s+/g, " ");

        return `
        <div class="${classes.join(" ")}" style="${style}">
          <span>${room.number}</span>

          <div class="room-tooltip">
            <strong>Кабинет ${room.number}</strong>
            <div class="tooltip-teacher">
              Закреплён за: <span>${room.teacher || "не назначен"}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

  return `
    <div
      class="floor-plan"
      style="background-image:url('${floor.bg}');"
    >
      <div class="floor-plan-inner" style="padding-top:${paddingTop}%;">
        ${roomsHtml}
      </div>
    </div>

    <div class="floor-legend">
      <div class="floor-legend-item">
        <span class="floor-legend-swatch floor-legend-swatch--room"></span>
        Учебный кабинет
      </div>
      <div class="floor-legend-item">
        <span class="floor-legend-swatch floor-legend-swatch--wc"></span>
        Санузел
      </div>
      <div class="floor-legend-item">
        <span class="floor-legend-swatch floor-legend-swatch--stairs"></span>
        Лестница
      </div>
      <div class="floor-legend-item">
        <span class="floor-legend-swatch floor-legend-swatch--tech"></span>
        Техническое помещение
      </div>
    </div>
  `;
}

/* ---------- Интерактивность вкладок этажей ---------- */

function initCampusPlansInteractivity() {
  document.querySelectorAll("[data-floor-tab]").forEach((tab) => {
    if (tab.dataset.bound === "true") return;
    tab.dataset.bound = "true";

    tab.addEventListener("click", () => {
      const target = tab.dataset.floorTab;
      const block = tab.closest(".campus-plan-block");
      if (!block) return;

      block
          .querySelectorAll("[data-floor-tab]")
          .forEach((t) => t.classList.remove("active"));
      block
          .querySelectorAll("[data-floor-panel]")
          .forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const panel = block.querySelector(
          `[data-floor-panel="${target}"]`
      );
      if (panel) panel.classList.add("active");
    });
  });
}

// =========================================
// 13. ВХОД
// =========================================

function renderLoginPage() {
  return `
    <div class="text-block">
      <span class="pill">ЛИЧНЫЙ ДОСТУП</span>
      <h1>Вход в портал</h1>
      <p>
        Авторизация понадобится для персональных функций,
        избранного и административной панели.
      </p>
    </div>

    <div class="placeholder-panel">
      <div class="placeholder-icon">🔐</div>
      <h3>Форма входа</h3>
      <p>
        Нажмите кнопку «Войти» в правом верхнем углу,
        чтобы открыть демонстрационную форму авторизации.
      </p>
      <br>
      <button class="primary-button" onclick="openModal('loginModal')">
        Открыть форму входа →
      </button>
    </div>
  `;
}

// =========================================
// 14. МОДАЛЬНЫЕ ОКНА
// =========================================

function openModal(modalId) {
  document.getElementById(modalId).classList.add("open");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("open");
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.dataset.closeModal);
  });
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("open");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.classList.remove("open");
    });
    collegeAlbumCloseLightbox();
  }

  if (collegeAlbumCurrent && event.key === "ArrowLeft") {
    const lightbox = document.getElementById("collegeAlbumLightbox");
    if (lightbox?.classList.contains("open")) collegeAlbumLightboxMove(-1);
  }

  if (collegeAlbumCurrent && event.key === "ArrowRight") {
    const lightbox = document.getElementById("collegeAlbumLightbox");
    if (lightbox?.classList.contains("open")) collegeAlbumLightboxMove(1);
  }
});

// =========================================
// 15. КНОПКИ HEADER
// =========================================

document.getElementById("headerLoginButton").addEventListener("click", () => {
  openModal("loginModal");
});

document.getElementById("searchButton").addEventListener("click", () => {
  openModal("searchModal");
  setTimeout(() => {
    document.getElementById("globalSearchInput").focus();
  }, 100);
});

document.getElementById("logoButton").addEventListener("click", (event) => {
  event.preventDefault();
  selectCategory("home");
  selectSubcategory("about");
});

mobileMenuButton.addEventListener("click", () => {
  sidebar.classList.toggle("mobile-open");
});

// =========================================
// 16. ПОИСК
// =========================================

const searchableContent = [
  {
    title: "О колледже",
    category: "Главная",
    keywords: "колледж история информация"
  },
  {
    title: "Специальности",
    category: "Главная",
    keywords: "специальность образование направление"
  },
  {
    title: "Расписание",
    category: "Учёба",
    keywords: "пары расписание занятия группа"
  },
  {
    title: "Преподаватели",
    category: "Учёба",
    keywords: "преподаватель учитель анкета"
  },
  {
    title: "Практические работы",
    category: "Учёба",
    keywords: "мпс пмк практика файлы"
  },
  {
    title: "Библиотека",
    category: "Учёба",
    keywords: "книги учебники материалы"
  },
  {
    title: "Новости",
    category: "Новости",
    keywords: "новости объявления мероприятия"
  },
  {
    title: "Карта колледжа",
    category: "Карта",
    keywords: "карта кабинет корпус этаж"
  },
  {
    title: "Яндекс карты",
    category: "Карта",
    keywords: "карта город маршрут путь яндекс"
  },
  {
    title: "Альбом",
    category: "Главная",
    keywords: "фото фотографии фотогалерея альбом колледж аудитории внутри"
  }
];

const globalSearchInput = document.getElementById("globalSearchInput");
const searchResults = document.getElementById("searchResults");

globalSearchInput.addEventListener("input", () => {
  const query = globalSearchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.textContent =
      "Начните вводить запрос, чтобы выполнить поиск.";
    return;
  }

  const results = searchableContent.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.keywords.includes(query)
    );
  });

  if (results.length === 0) {
    searchResults.innerHTML = "Ничего не найдено. Попробуйте другой запрос.";
    return;
  }

  searchResults.innerHTML = results
    .map(
      (item) => `
        <div style="
          padding: 12px 0;
          border-bottom: 1px solid #e5eaf2;
        ">
          <strong style="color: #182230;">${item.title}</strong>
          <div style="font-size: 11px; color: #9aa5b5; margin-top: 4px;">
            Раздел: ${item.category}
          </div>
        </div>
      `
    )
    .join("");
});

// =========================================
// 17. ФОРМА ВХОДА
// =========================================

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  alert(
    "Демонстрация: форма отправлена. Настоящая авторизация будет подключена позже."
  );

  closeModal("loginModal");
});

document.getElementById("guestLoginButton").addEventListener("click", () => {
  closeModal("loginModal");
  alert("Вы продолжаете как гость.");
});

// =========================================
// 18. ЗАПУСК ПРИЛОЖЕНИЯ
// =========================================

renderTopNavigation();
renderSubNavigation();
renderCurrentContent();
