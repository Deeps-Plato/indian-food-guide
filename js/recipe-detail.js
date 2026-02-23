/* ============================================================
   Indian Food Guide — Recipe Detail Page
   Reads ?id= from URL and renders from RECIPES_DATA
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const id     = new URLSearchParams(window.location.search).get('id');
  const recipe = window.RECIPES_DATA && window.RECIPES_DATA.find(r => r.id === id);

  const container = document.getElementById('recipe-container');
  if (!container) return;

  if (!recipe) {
    container.innerHTML = `
      <div class="container" style="padding-top:80px;text-align:center">
        <div style="font-size:4rem;margin-bottom:16px">🤔</div>
        <h2>Recipe Not Found</h2>
        <p style="margin-bottom:24px;color:var(--brown)">
          We couldn't find a recipe with the ID "<strong>${id || 'unknown'}</strong>".
        </p>
        <a href="recipes.html" class="btn btn-primary">← Back to all recipes</a>
      </div>`;
    return;
  }

  /* Update page title */
  document.title = `${recipe.name} — Indian Food Guide`;

  /* ── Hero ── */
  const heroEl = document.getElementById('recipe-hero');
  if (heroEl) {
    heroEl.style.background = recipe.gradient;
    const emojiEl = heroEl.querySelector('.recipe-hero-emoji');
    if (emojiEl && !recipe.image) emojiEl.textContent = recipe.emoji;
    if (recipe.image) {
      const bg = document.createElement('img');
      bg.src   = recipe.image;
      bg.alt   = recipe.name;
      bg.className = 'recipe-hero-bg';
      heroEl.prepend(bg);
    }
    const titleEl    = heroEl.querySelector('#recipe-title');
    const subtitleEl = heroEl.querySelector('#recipe-subtitle');
    if (titleEl)    titleEl.textContent    = recipe.name;
    if (subtitleEl) subtitleEl.textContent = recipe.subtitle;
  }

  /* ── Meta strip ── */
  const metaEl = document.getElementById('recipe-meta');
  if (metaEl) {
    const totalMin = (() => {
      const parse = s => {
        if (!s) return 0;
        const m = s.match(/(\d+)\s*hr/);
        const n = s.match(/(\d+)\s*min/);
        return (m ? parseInt(m[1]) * 60 : 0) + (n ? parseInt(n[1]) : 0);
      };
      const p  = parse(recipe.prepTime);
      const c  = parse(recipe.cookTime);
      const total = p + c;
      const fmt = m => {
        if (m >= 60) {
          const h = Math.floor(m / 60);
          const r = m % 60;
          return r > 0 ? `${h}h ${r}m` : `${h}h`;
        }
        return `${m} min`;
      };
      return { prep: fmt(p), cook: fmt(c), total: fmt(total) };
    })();

    metaEl.innerHTML = `
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Prep</span>
        <span class="recipe-meta-value">${totalMin.prep}</span>
      </div>
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Cook</span>
        <span class="recipe-meta-value">${totalMin.cook}</span>
      </div>
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Total</span>
        <span class="recipe-meta-value">${totalMin.total}</span>
      </div>
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Serves</span>
        <span class="recipe-meta-value">${recipe.servings}</span>
      </div>
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Difficulty</span>
        <span class="recipe-meta-value">${difficultyBadge(recipe.difficulty)}</span>
      </div>
      <div class="recipe-meta-item">
        <span class="recipe-meta-label">Type</span>
        <span class="recipe-meta-value">${categoryBadge(recipe.category)}</span>
      </div>`;
  }

  /* ── Story ── */
  const storyEl = document.getElementById('recipe-story');
  if (storyEl && recipe.story) {
    storyEl.textContent = recipe.story;
  }

  /* ── Taste box ── */
  const tasteEl = document.getElementById('taste-description');
  if (tasteEl && recipe.whatItTastes) {
    tasteEl.textContent = recipe.whatItTastes;
  }

  /* ── Ingredients ── */
  const ingEl = document.getElementById('ingredients-list');
  if (ingEl) {
    ingEl.innerHTML = recipe.ingredients.map(ing => {
      if (ing.item.startsWith('—')) {
        return `<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;
                     letter-spacing:0.08em;color:var(--saffron);padding:8px 0 2px;
                     grid-column:1/-1">
                  ${ing.item.replace(/^— /, '').replace(/ —$/, '')}
                </div>`;
      }
      return `
        <div class="ingredient-item">
          <span class="ingredient-amount">${ing.amount}</span>
          <span>
            <div class="ingredient-name">${ing.item}</div>
            ${ing.note ? `<div class="ingredient-note">${ing.note}</div>` : ''}
          </span>
        </div>`;
    }).join('');
  }

  /* ── Steps ── */
  const stepsEl = document.getElementById('steps-list');
  if (stepsEl) {
    stepsEl.innerHTML = recipe.steps.map(s => `
      <div class="step-item">
        <div class="step-number">${s.step}</div>
        <div>
          <div class="step-title">${s.title}</div>
          <div class="step-instruction">${s.instruction}</div>
        </div>
      </div>`).join('');
  }

  /* ── Tips ── */
  const tipsEl = document.getElementById('tips-list');
  if (tipsEl && recipe.tips) {
    tipsEl.innerHTML = recipe.tips.map(t => `<li>${t}</li>`).join('');
  }

  /* ── Serving ── */
  const servingEl = document.getElementById('serving-text');
  if (servingEl && recipe.serving) {
    servingEl.textContent = recipe.serving;
  }

  /* ── Spices used ── */
  const spicesEl = document.getElementById('spices-used');
  if (spicesEl && recipe.spicesUsed && recipe.spicesUsed.length) {
    spicesEl.innerHTML = recipe.spicesUsed.map(sid => {
      const spice = window.SPICES_DATA && window.SPICES_DATA.find(s => s.id === sid);
      const label = spice ? spice.name : sid;
      return `<a href="spices.html" class="spice-chip">${label}</a>`;
    }).join('');
  }

  /* ── Tags ── */
  const tagsEl = document.getElementById('recipe-tags');
  if (tagsEl && recipe.tags) {
    tagsEl.innerHTML = recipe.tags.map(t =>
      `<span class="use-chip">${t}</span>`).join('');
  }
});
