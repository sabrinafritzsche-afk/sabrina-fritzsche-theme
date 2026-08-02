(() => {
  const buttons = document.querySelectorAll('[data-set-lang]');
  const translatable = document.querySelectorAll('[data-de][data-en]');
  const initial = new URLSearchParams(location.search).get('lang') || localStorage.getItem('sf-lang') || 'de';
  function setLanguage(lang) {
    if (!['de', 'en'].includes(lang)) lang = 'de';
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    translatable.forEach((element) => {
      const value = element.dataset[lang];
      if (value !== undefined) element.innerHTML = value;
    });
    buttons.forEach((button) => button.classList.toggle('active', button.dataset.setLang === lang));
    localStorage.setItem('sf-lang', lang);
  }
  buttons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));
  setLanguage(initial);
})();
