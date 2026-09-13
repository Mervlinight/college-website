
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
        id: "additional",
        title: "Дополнительно",
        content: renderAdditional
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
          История, направления подготовки, возможности для студентов
          и контактные сведения колледжа Крымского федерального университета
          имени В. И. Вернадского.
        </p>
      </section>


      <!-- Краткие факты -->
      <section class="additional-facts">
        <article class="additional-fact">
          <strong>1995</strong>
          <span>Год основания</span>
        </article>

        <article class="additional-fact">
          <strong>900+</strong>
          <span>Студентов</span>
        </article>

        <article class="additional-fact">
          <strong>30+</strong>
          <span>Преподавателей</span>
        </article>

        <article class="additional-fact">
          <strong>СПО</strong>
          <span>Уровень образования</span>
        </article>
      </section>


      <!-- История колледжа -->
      <section class="additional-section">
        <div class="additional-section-heading">
          <span class="additional-label">ИСТОРИЯ</span>
          <h2>История развития</h2>
          <p>
            Колледж прошёл несколько этапов становления и развития,
            сохранив направленность на подготовку востребованных специалистов.
          </p>
        </div>

        <div class="additional-history">

          <article class="additional-history-item">
            <div class="additional-history-year">1995</div>

            <div class="additional-history-card">
              <span>01</span>
              <h3>Основание колледжа</h3>
              <p>
                Колледж был создан как «Открытый Таврический колледж»
                при Университете экономики и управления.
              </p>
            </div>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">2000-е</div>

            <div class="additional-history-card">
              <span>02</span>
              <h3>Расширение образовательных возможностей</h3>
              <p>
                Развивались образовательные программы, направления подготовки
                и сотрудничество с организациями региона.
              </p>
            </div>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">2014–2015</div>

            <div class="additional-history-card">
              <span>03</span>
              <h3>Вхождение в структуру КФУ</h3>
              <p>
                Колледж прошёл этап реорганизации и вошёл в структуру
                Крымского федерального университета имени В. И. Вернадского
                как подразделение среднего профессионального образования.
              </p>
            </div>
          </article>

          <article class="additional-history-item">
            <div class="additional-history-year">Сегодня</div>

            <div class="additional-history-card">
              <span>04</span>
              <h3>Современное образование</h3>
              <p>
                Сегодня колледж предлагает направления подготовки,
                ориентированные на получение профессиональных знаний
                и практических компетенций.
              </p>
            </div>
          </article>

        </div>
      </section>


      <!-- Направления подготовки -->
      <section class="additional-section">
        <div class="additional-section-heading">
          <span class="additional-label">НАПРАВЛЕНИЯ</span>
          <h2>Основные области подготовки</h2>
          <p>
            В колледже представлены различные направления, связанные
            с медициной, технологиями, экономикой, сервисом и творчеством.
          </p>
        </div>

        <div class="additional-directions">

          <article class="additional-direction-card">
            <div class="additional-card-number">01</div>
            <h3>Информационные технологии</h3>
            <p>
              Компьютерные системы, программирование и цифровые технологии.
            </p>
          </article>

          <article class="additional-direction-card">
            <div class="additional-card-number">02</div>
            <h3>Экономика и финансы</h3>
            <p>
              Финансы, страхование, управление и экономическая деятельность.
            </p>
          </article>

          <article class="additional-direction-card">
            <div class="additional-card-number">03</div>
            <h3>Логистика</h3>
            <p>
              Организация перевозок, управление поставками
              и операционная деятельность.
            </p>
          </article>

          <article class="additional-direction-card">
            <div class="additional-card-number">04</div>
            <h3>Творческие направления</h3>
            <p>
              Дизайн, издательское дело и развитие творческих навыков.
            </p>
          </article>

          <article class="additional-direction-card">
            <div class="additional-card-number">05</div>
            <h3>Туризм и гостеприимство</h3>
            <p>
              Организация путешествий, гостиничное дело и сервис.
            </p>
          </article>

          <article class="additional-direction-card">
            <div class="additional-card-number">06</div>
            <h3>Медицина</h3>
            <p>
              Сестринское дело, фармация и стоматологическое направление.
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
    category: "Подготовка специалистов | Очная",
    qualification: "Техник по компьютерным системам",
    cost: "от 79 500 ₽",
    duration: "3 года 10 мес.",
    description:
        "Подготовка специалистов в области IT и обслуживания компьютерной техники. Студенты изучают строение персональных компьютеров, периферийных устройств, компьютерных сетей, основы программирования, диагностику неисправностей и техническое обслуживание компьютерных систем."
  },
  {
    number: "02",
    code: "09.02.07",
    title: "Информационные системы и программирование",
    category: "Не задано",
    qualification: "Программист",
    cost: "Не задано",
    duration: "3 года 10 мес.",
    description: "Не задано"
  },
  {
    number: "03",
    code: "09.02.11",
    title: "Разработка и управление программным обеспечением",
    category: "Подготовка специалистов | Очная",
    qualification: "Программист",
    cost: "Уточняется",
    duration: "3 года 10 мес.",
    description:
        "Подготовка специалистов в области создания, сопровождения и управления программным обеспечением. Студенты изучают языки программирования, базы данных, алгоритмы, тестирование, проектирование информационных систем и основы управления IT-проектами. Выпускники могут работать программистами, администраторами баз данных и специалистами по компьютерным системам."
  },
  {
    number: "04",
    code: "38.02.02",
    title: "Страховое дело (по отраслям)",
    category: "Подготовка специалистов | Очная",
    qualification: "Специалист страхового дела",
    cost: "от 76 200 ₽",
    duration: "2 года 10 мес.",
    description:
        "Подготовка специалистов для работы в страховых компаниях. Выпускники могут заниматься оформлением страховых договоров, консультированием клиентов, сопровождением страховых продуктов, расчетом страховых выплат и организацией работы с документацией."
  },
  {
    number: "05",
    code: "38.02.03",
    title: "Операционная деятельность в логистике",
    category: "Подготовка специалистов | Очная",
    qualification: "Операционный логист",
    cost: "от 76 200 ₽",
    duration: "2 года 10 мес.",
    description:
        "Подготовка специалистов для операционной деятельности логистических компаний. Студенты знакомятся с особенностями перевозок, складской деятельности, транспортировки и хранения товаров, оформлением документации, планированием поставок и организацией движения материальных потоков."
  },
  {
    number: "06",
    code: "38.02.06",
    title: "Финансы",
    category: "Подготовка специалистов | Очная",
    qualification: "Финансист",
    cost: "от 76 200 ₽",
    duration: "2 года 10 мес.",
    description:
        "Подготовка специалистов, которые будут заниматься организацией и осуществлением деятельности финансовых, планово-экономических и контрольных подразделений организаций. В процессе обучения изучаются финансовое планирование, бюджетирование, налогообложение, бухгалтерский учет и анализ финансовых показателей."
  },
  {
    number: "07",
    code: "42.02.02",
    title: "Издательское дело",
    category: "Подготовка специалистов | Очная",
    qualification: "Специалист издательского дела",
    cost: "от 79 500 ₽",
    duration: "2 года 10 мес.",
    description:
        "Специалисты издательского дела среднего звена применяют профессиональные умения и навыки в сфере распространения электронной и печатной продукции. Студенты изучают подготовку текстов и изображений, верстку, редакторскую работу, издательские процессы и современные цифровые технологии."
  },
  {
    number: "08",
    code: "43.02.10",
    title: "Туризм",
    category: "Не задано",
    qualification: "Специалист по туризму",
    cost: "Не задано",
    duration: "3 года 10 мес.",
    description: "Не задано"
  },
  {
    number: "09",
    code: "43.02.16",
    title: "Туризм и гостеприимство",
    category: "Подготовка специалистов | Очная",
    qualification: "Специалист по туризму и гостеприимству",
    cost: "от 76 200 ₽",
    duration: "2 года 10 мес.",
    description:
        "Программа готовит специалистов для сферы туризма, гостиничного бизнеса и гостеприимства. После обучения выпускники могут работать специалистами по гостеприимству, менеджерами по туризму, организаторами путешествий, администраторами гостиниц и экскурсоводами."
  },
  {
    number: "10",
    code: "54.02.01",
    title: "Дизайн (по отраслям)",
    category: "Подготовка специалистов | Очная",
    qualification: "Дизайнер",
    cost: "от 125 400 ₽",
    duration: "3 года 10 мес.",
    description:
        "Подготовка специалистов со знанием прикладных компьютерных программ, которые будут заниматься дизайном в различных его проявлениях и отраслях. Студенты осваивают композицию, цветоведение, проектирование, графические редакторы и разработку визуальных решений."
  }
];

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
                  <strong>Срок обучения</strong>
                  <span>${item.duration}</span>
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
