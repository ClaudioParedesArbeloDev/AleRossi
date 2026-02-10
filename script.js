import { translations } from "./translation.js"; 

let currentLang = localStorage.getItem('preferredLang');

if (!currentLang) {
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  const primary = browserLang.toLowerCase().split('-')[0];
  currentLang = (primary === 'en') ? 'en' : 'es';
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });

  const toggleBtn = document.getElementById('langToggle');
 if (toggleBtn) {
  toggleBtn.innerHTML = lang === 'es'
    ? `<img src="img/usa.png" alt="English">`
    : `<img src="img/spain.png" alt="Español">`;
}

  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('langToggle')?.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
  });

  setLanguage(currentLang);
});