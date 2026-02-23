/* ============================================================
   Indian Food Guide — Recipes Index Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid       = document.getElementById('recipe-grid');
  const searchEl   = document.getElementById('recipe-search');
  const catPills   = document.getElementById('category-pills');
  const diffPills  = document.getElementById('difficulty-pills');
  const countEl    = document.getElementById('results-count');

  if (!grid || !window.RECIPES_DATA) return;

  let activeCategory   = 'all';
  let activeDifficulty = 'all';
  let searchTerm       = '';

  /* ── Filter pill listeners ── */
  function initPills(container, callback) {
    if (!container) return;
    container.addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      container.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      callback(pill.dataset.value);
    });
  }

  initPills(catPills,  val => { activeCategory   = val; render(); });
  initPills(diffPills, val => { activeDifficulty = val; render(); });

  if (searchEl) {
    searchEl.addEventListener('input', debounce(() => {
      searchTerm = searchEl.value;
      render();
    }, 200));
  }

  /* ── Render ── */
  function render() {
    const items = window.RECIPES_DATA.filter(recipe => {
      if (searchTerm) {
        const hay = [
          recipe.name, recipe.subtitle, recipe.description,
          ...(recipe.tags || [])
        ].join(' ').toLowerCase();
        if (!hay.includes(searchTerm.toLowerCase())) return false;
      }
      if (activeCategory !== 'all' && recipe.category !== activeCategory) return false;
      if (activeDifficulty !== 'all' && recipe.difficulty.toLowerCase() !== activeDifficulty) return false;
      return true;
    });

    setResultsCount(countEl, items.length, window.RECIPES_DATA.length, 'recipe');

    if (items.length === 0) {
      renderEmpty(grid, 'No recipes match. Try adjusting your search or filters.');
      return;
    }

    grid.innerHTML = items.map(recipe => buildCard(recipe)).join('');
  }

  function buildCard(recipe) {
    const catBadge  = categoryBadge(recipe.category);
    const diffBadge = difficultyBadge(recipe.difficulty);

    const headerContent = recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
         <div class="recipe-card-header-overlay"></div>`
      : `<span style="position:relative;z-index:1;font-size:3.5rem">${recipe.emoji}</span>`;

    const totalMin = (() => {
      const parse = s => {
        if (!s) return 0;
        const m = s.match(/(\d+)\s*hr/);
        const n = s.match(/(\d+)\s*min/);
        return (m ? parseInt(m[1]) * 60 : 0) + (n ? parseInt(n[1]) : 0);
      };
      const total = parse(recipe.prepTime) + parse(recipe.cookTime);
      if (total >= 60) {
        const h = Math.floor(total / 60);
        const m = total % 60;
        return m > 0 ? `${h}h ${m}m` : `${h}h`;
      }
      return total > 0 ? `${total} min` : '—';
    })();

    return `
      <a class="recipe-card" href="recipe.html?id=${recipe.id}">
        <div class="recipe-card-header" style="background:${recipe.gradient}">
          ${headerContent}
        </div>
        <div class="recipe-card-body">
          <div class="recipe-card-name">${recipe.name}</div>
          <div class="recipe-card-subtitle">${recipe.subtitle}</div>
          <div class="recipe-card-meta">
            ${catBadge}
            ${diffBadge}
            <span class="time-badge">⏱ ${totalMin}</span>
            <span class="time-badge">👤 ${recipe.servings}</span>
          </div>
        </div>
      </a>`;
  }

  render();
});
