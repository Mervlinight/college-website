
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
        id: "campus-map",
        title: "Карта колледжа",
        content: renderMap
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
}

// =========================================
// 8. ГЛАВНАЯ / О КОЛЛЕДЖЕ
// =========================================

function renderAbout() {
  return `
    <section class="hero-section">
      <div class="hero-content">
        <span class="hero-label">ИНФОРМАЦИОННЫЙ ПОРТАЛ КОЛЛЕДЖА</span>

        <h1>Добро пожаловать<br>на сайт колледжа</h1>

        <p>
          Здесь собрана информация об учебной жизни, преподавателях,
          расписании, мероприятиях и возможностях для студентов.
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

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">25+</span>
          <span class="stat-label">Образовательных направлений</span>
        </div>

        <div class="stat-card">
          <span class="stat-number">1000+</span>
          <span class="stat-label">Студентов</span>
        </div>

        <div class="stat-card">
          <span class="stat-number">50+</span>
          <span class="stat-label">Преподавателей</span>
        </div>
      </div>
    </section>
  `;
}

// =========================================
// 9. СПЕЦИАЛЬНОСТИ
// =========================================

function renderSpecialties() {
  const specialties = [
    {
      number: "01",
      title: "Информационные системы и программирование",
      description:
        "Разработка программного обеспечения, веб-приложений и информационных систем."
    },
    {
      number: "02",
      title: "Сетевое и системное администрирование",
      description:
        "Настройка компьютерных сетей, серверов и обеспечение информационной безопасности."
    },
    {
      number: "03",
      title: "Дизайн и компьютерная графика",
      description:
        "Создание визуальных материалов, интерфейсов и цифрового контента."
    },
    {
      number: "04",
      title: "Экономика и бухгалтерский учёт",
      description:
        "Работа с финансовой информацией, учётом и экономическими процессами."
    }
  ];

  return `
    <div class="text-block">
      <span class="pill">ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ</span>
      <h1>Специальности</h1>
      <p>
        В колледже представлены различные направления подготовки.
        Ниже приведён пример оформления списка специальностей.
      </p>
    </div>

    <div class="specialties-list">
      ${specialties
        .map(
          (item) => `
            <article class="specialty-item">
              <div class="specialty-number">${item.number}</div>
              <div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </article>
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

function renderMap() {
  return `
    <div class="text-block">
      <span class="pill">НАВИГАЦИЯ</span>
      <h1>Карта колледжа</h1>
      <p>
        В будущем здесь будет интерактивная схема колледжа
        с кабинетами, этажами и важными объектами.
      </p>
    </div>

    <div class="placeholder-panel">
      <div class="placeholder-icon">🗺️</div>
      <h3>Интерактивная карта</h3>
      <p>
        На следующем этапе здесь появится схема здания
        с интерактивными кабинетами и объектами.
      </p>
    </div>
  `;
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