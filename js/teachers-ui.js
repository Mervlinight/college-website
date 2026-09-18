/* =========================================================
   МОДУЛЬ «ПРЕПОДАВАТЕЛИ»
   Требует teachers-data.js с переменной teachersData.
   ========================================================= */

(function () {
  const teacherStyles = `
    .teachers-page { display: flex; flex-direction: column; gap: 30px; }
    .teachers-intro { max-width: 850px; }
    .teachers-intro h1 { margin: 10px 0 12px; }
    .teachers-intro p { margin: 0; color: #687386; line-height: 1.7; }
    .teachers-toolbar { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
    .teachers-search { flex:1 1 280px; min-width:220px; padding:13px 16px; border:1px solid #dfe5ee; border-radius:12px; background:#fff; color:#182230; outline:none; }
    .teachers-search:focus { border-color:#9aa8ba; box-shadow:0 0 0 3px rgba(100,120,145,.10); }
    .teachers-counter { color:#8994a4; font-size:13px; }
    .teacher-department { border:1px solid #e5eaf2; border-radius:18px; background:#fff; overflow:hidden; }
    .teacher-department-head { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; padding:22px 24px 16px; }
    .teacher-department-head h2 { margin:4px 0 0; font-size:clamp(20px,2.5vw,30px); }
    .teacher-department-head p { margin:0; color:#8994a4; font-size:13px; }
    .teacher-slider { position:relative; padding:0 18px 22px; }
    .teacher-track { display:flex; gap:16px; overflow-x:auto; scroll-behavior:smooth; scrollbar-width:none; padding:4px 2px 10px; }
    .teacher-track::-webkit-scrollbar { display:none; }
    .teacher-card { flex:0 0 min(330px, 78vw); min-height:360px; display:flex; flex-direction:column; border:1px solid #e7ebf1; border-radius:16px; background:#fbfcfe; padding:20px; box-sizing:border-box; }
    .teacher-avatar { width:54px; height:54px; border-radius:14px; display:grid; place-items:center; background:#68befc; color:#536174; font-weight:700; font-size:18px; margin-bottom:16px; }
    .teacher-card h3 { margin:0 0 7px; font-size:19px; line-height:1.25; color:#182230; }
    .teacher-position { margin:0 0 14px; color:#697588; font-size:13px; line-height:1.45; }
    .teacher-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
    .teacher-tag { padding:5px 8px; border-radius:999px; background: #eef2f7; color:#5d6878; font-size:11px; }
    .teacher-card-info { display:grid; gap:8px; margin-top:auto; }
    .teacher-info-row { padding-top:9px; border-top:1px solid #eef2f7; }
    .teacher-info-label { display:block; font-weight:700; font-size:10px; text-transform:uppercase; letter-spacing:.08em; color: #68befc; margin-bottom:3px; }
    .teacher-info-value { display:block; color: #3c4757;  font-size:12px; line-height:1.45; }
    .teacher-details-button { margin-top:15px; border:0; background:transparent; color:#182230; font-weight:600; cursor:pointer; text-align:left; padding:8px 0 0; }
    .teacher-slider-button { position:absolute; top:50%; transform:translateY(-50%); z-index:2; width:38px; height:38px; border:1px solid #dfe5ee; border-radius:50%; background:#fff; box-shadow:0 5px 18px rgba(20,35,55,.10); cursor:pointer; color:#182230; }
    .teacher-slider-button.left { left:0; }
    .teacher-slider-button.right { right:0; }
    .teacher-empty { padding:25px; color:#8994a4; text-align:center; border:1px dashed #dfe5ee; border-radius:14px; }
    .teacher-modal-overlay { position:fixed; inset:0; z-index:1000; display:none; align-items:center; justify-content:center; padding:20px; background:rgba(14,24,36,.58); }
    .teacher-modal-overlay.open { display:flex; }
    .teacher-modal { width:min(760px,100%); max-height:min(820px,90vh); overflow:auto; border-radius:20px; background:#fff; padding:28px; position:relative; box-shadow:0 25px 80px rgba(0,0,0,.25); }
    .teacher-modal-close { position:absolute; top:12px; right:14px; border:0; background:transparent; font-size:28px; color:#687386; cursor:pointer; }
    .teacher-modal h2 { margin:0 40px 8px 0; color:#182230; }
    .teacher-modal-subtitle { color:#687386; margin-bottom:22px; line-height:1.5; }
    .teacher-modal-section { padding:17px 0; border-top:1px solid #e7ebf1; }
    .teacher-modal-section h4 { margin:0 0 9px; font-size:11px; text-transform:uppercase; letter-spacing:.09em; color:#9aa5b5; }
    .teacher-modal-section p { margin:0; color:#3c4757; line-height:1.6; font-size:13px; }
    .teacher-modal-list { margin:0; padding-left:18px; color:#3c4757; line-height:1.65; font-size:13px; }
    @media (max-width:700px) {
      .teacher-department-head { padding:18px 16px 12px; }
      .teacher-slider { padding:0 10px 18px; }
      .teacher-slider-button { display:none; }
      .teacher-card { flex-basis:82vw; }
      .teacher-modal { padding:22px 18px; }
    }
  `;

  if (!document.getElementById('teachers-module-styles')) {
    const style = document.createElement('style');
    style.id = 'teachers-module-styles';
    style.textContent = teacherStyles;
    document.head.appendChild(style);
  }

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function shortText(value, max = 180) {
    const text = String(value || '').trim();
    return text.length > max ? text.slice(0, max).trim() + '…' : text;
  }

  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/);
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  }

  function normalizeSearch(value) {
    return String(value || '').toLowerCase().replace(/ё/g, 'е').trim();
  }

  window.teacherScroll = function (trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(280, track.clientWidth * 0.8), behavior: 'smooth' });
  };

  window.openTeacherDetails = function (groupId, teacherIndex) {
    const group = teachersData.find(item => item.id === groupId);
    const teacher = group?.teachers?.[teacherIndex];
    if (!teacher) return;

    let modal = document.getElementById('teacherDetailsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'teacherDetailsModal';
      modal.className = 'teacher-modal-overlay';
      document.body.appendChild(modal);
      modal.addEventListener('click', event => {
        if (event.target === modal) modal.classList.remove('open');
      });
    }

    const disciplines = (teacher.disciplines || []).map(item => `<li>${esc(item)}</li>`).join('');
    const conditions = (teacher.conditions || []).map(item => `<li>${esc(item)}</li>`).join('');

    modal.innerHTML = `
      <div class="teacher-modal" role="dialog" aria-modal="true" aria-label="Информация о преподавателе">
        <button class="teacher-modal-close" onclick="document.getElementById('teacherDetailsModal').classList.remove('open')" aria-label="Закрыть">×</button>
        <div class="teacher-avatar">${esc(initials(teacher.name))}</div>
        <h2>${esc(teacher.name)}</h2>
        <div class="teacher-modal-subtitle">${esc(teacher.position)}<br>${esc(group.title)}</div>

        <div class="teacher-modal-section">
          <h4>Дисциплины и виды учебной деятельности</h4>
          <ul class="teacher-modal-list">${disciplines || '<li>Не указано</li>'}</ul>
        </div>
        <div class="teacher-modal-section">
          <h4>Условия привлечения</h4>
          <ul class="teacher-modal-list">${conditions || '<li>Не указано</li>'}</ul>
        </div>
        <div class="teacher-modal-section">
          <h4>Образование</h4>
          <p>${esc(teacher.education || 'Не указано')}</p>
        </div>
        <div class="teacher-modal-section">
          <h4>Дополнительное профессиональное образование</h4>
          <p>${esc(teacher.extra || 'Не указано')}</p>
        </div>
        <div class="teacher-modal-section">
          <h4>Стаж</h4>
          <p>Педагогический: ${esc(teacher.ped_experience != null ? Number(teacher.ped_experience) + 3 : '—')} лет. Профессиональный: ${esc(teacher.professional_experience || '—')} лет.</p>
        </div>
      </div>`;

    modal.classList.add('open');
  };

  window.filterTeachers = function (value) {
    const query = normalizeSearch(value);
    let visible = 0;
    document.querySelectorAll('.teacher-department').forEach(group => {
      let groupVisible = 0;
      group.querySelectorAll('.teacher-card').forEach(card => {
        const match = !query || normalizeSearch(card.dataset.teacherSearch).includes(query);
        card.style.display = match ? '' : 'none';
        if (match) { visible++; groupVisible++; }
      });
      group.style.display = groupVisible ? '' : 'none';
    });
    const counter = document.getElementById('teachersCounter');
    if (counter) counter.textContent = `Найдено: ${visible}`;
  };

  window.renderTeachers = function () {
    const groups = Array.isArray(teachersData) ? teachersData : [];

    return `
      <div class="teachers-page">
        <section class="teachers-intro">
          <span class="pill">ПРЕПОДАВАТЕЛЬСКИЙ СОСТАВ</span>
          <h1>Преподаватели</h1>
          <p>
            Преподаватели распределены по образовательным программам. Повторяющиеся
            записи из нескольких документов объединены в одну карточку, а дисциплины
            одного преподавателя собраны вместе.
          </p>
        </section>

        <div class="teachers-toolbar">
          <input id="teachersSearch" class="teachers-search" type="search"
                 placeholder="Поиск по ФИО, должности или дисциплине..." autocomplete="off" oninput="filterTeachers(this.value)">
          <span id="teachersCounter" class="teachers-counter"></span>
        </div>

        <div id="teachersGroups">
          ${groups.map((group, groupIndex) => `
            <section class="teacher-department" data-teacher-group="${esc(group.id)}" data-group-index="${groupIndex}">
              <div class="teacher-department-head">
                <div>
                  <span class="eyebrow">ОБРАЗОВАТЕЛЬНАЯ ПРОГРАММА</span>
                  <h2>${esc(group.title)}</h2>
                </div>
                <p>${group.teachers.length} ${group.teachers.length === 1 ? 'преподаватель' : group.teachers.length < 5 ? 'преподавателя' : 'преподавателей'}</p>
              </div>
              <div class="teacher-slider">
                <button class="teacher-slider-button left" onclick="teacherScroll('teacher-track-${esc(group.id)}', -1)" aria-label="Назад">←</button>
                <div class="teacher-track" id="teacher-track-${esc(group.id)}">
                  ${group.teachers.map((teacher, teacherIndex) => `
                    <article class="teacher-card"
                      data-teacher-search="${esc(normalizeSearch([teacher.name, teacher.position, teacher.education, ...(teacher.disciplines || [])].join(' ')))}">
                      <div class="teacher-avatar">${esc(initials(teacher.name))}</div>
                      <h3>${esc(teacher.name)}</h3>
                      <p class="teacher-position">${esc(teacher.position)}</p>
                      <div class="teacher-tags">
                        ${(teacher.disciplines || []).slice(0, 3).map(item => `<span class="teacher-tag">${esc(shortText(item, 42))}</span>`).join('')}
                        ${(teacher.disciplines || []).length > 3 ? `<span class="teacher-tag">+${teacher.disciplines.length - 3}</span>` : ''}
                      </div>
                      <div class="teacher-card-info">
                        <div class="teacher-info-row">
                          <span class="teacher-info-label">Образование</span>
                          <span class="teacher-info-value">${esc(shortText(teacher.education, 145) || 'Не указано')}</span>
                        </div>
                        <div class="teacher-info-row">
                          <span class="teacher-info-label">Стаж</span>
                          <span class="teacher-info-value">Педагогический: ${esc(teacher.ped_experience != null ? Number(teacher.ped_experience) + 3 : '—')} лет</span>
                        </div>
                      </div>
                      <button class="teacher-details-button" onclick="openTeacherDetails('${esc(group.id)}', ${teacherIndex})">Подробнее →</button>
                    </article>
                  `).join('')}
                </div>
                <button class="teacher-slider-button right" onclick="teacherScroll('teacher-track-${esc(group.id)}', 1)" aria-label="Вперёд">→</button>
              </div>
            </section>
          `).join('')}
        </div>
      </div>
    `;
  };


})();

/* Подменяем заглушку renderTeachers в уже существующей навигации. */
if (typeof navigationData !== 'undefined' && typeof renderTeachers === 'function') {
  const teachersSubcategory = navigationData.education?.subcategories?.find(item => item.id === 'teachers');
  if (teachersSubcategory) teachersSubcategory.content = renderTeachers;
}

