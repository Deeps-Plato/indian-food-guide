/* ============================================================
   Indian Food Guide — Ingredients Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid     = document.getElementById('ingredient-grid');
  const pillsEl  = document.getElementById('category-pills');
  const searchEl = document.getElementById('ingredient-search');
  const countEl  = document.getElementById('results-count');

  if (!grid || !window.INGREDIENTS_DATA) return;

  let activeCategory = 'all';
  let searchTerm     = '';
  let openId         = null;

  if (pillsEl) {
    pillsEl.addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      pillsEl.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      render();
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', debounce(() => {
      searchTerm = searchEl.value;
      render();
    }, 200));
  }

  function render() {
    const items = filterItems(window.INGREDIENTS_DATA, searchTerm, { category: activeCategory });
    setResultsCount(countEl, items.length, window.INGREDIENTS_DATA.length, 'ingredient');

    if (items.length === 0) {
      renderEmpty(grid, 'No ingredients match. Try clearing the search or filter.');
      return;
    }

    grid.innerHTML = items.map(ing => buildCard(ing)).join('');
    attachCardListeners();
  }

  function buildCard(ing) {
    const headerContent = ing.image
      ? `<img src="${ing.image}" alt="${ing.name}" loading="lazy">`
      : `<span style="position:relative;z-index:1;font-size:3rem">${ing.emoji}</span>`;

    return `
      <div class="spice-card" id="card-${ing.id}" data-id="${ing.id}">
        <div class="spice-card-header" style="background:${ing.gradient}">
          ${headerContent}
        </div>
        <div class="spice-card-body">
          <div class="spice-card-name">${ing.name}</div>
          <div class="spice-card-hindi">${ing.hindiName}</div>
          <div class="spice-card-taste" style="-webkit-line-clamp:3">${ing.description}</div>
        </div>
        <div class="spice-card-footer">
          <span style="font-size:0.75rem;padding:2px 8px;border-radius:999px;background:var(--cream);border:1px solid var(--border)">
            ${ing.category}
          </span>
          <button class="expand-btn" data-id="${ing.id}" aria-expanded="false">
            Details ↓
          </button>
        </div>
        <div class="spice-detail" id="detail-${ing.id}">
          ${buildDetail(ing)}
        </div>
      </div>`;
  }

  function buildDetail(ing) {
    return `
      <p style="font-size:0.875rem;color:var(--brown);line-height:1.7;margin-bottom:14px">${ing.description}</p>
      <div class="spice-detail-grid" style="margin-bottom:14px">
        <div>
          <div class="spice-detail-label">Storage</div>
          <div class="spice-detail-value" style="font-size:0.85rem">${ing.storage}</div>
        </div>
        <div>
          <div class="spice-detail-label">Substitute</div>
          <div class="spice-detail-value" style="font-size:0.85rem">${ing.substitute}</div>
        </div>
      </div>
      <div class="spice-detail-label" style="margin-bottom:6px">Common Uses</div>
      <div class="spice-detail-uses">
        ${ing.uses.map(u => `<span class="use-chip">${u}</span>`).join('')}
      </div>
      <div class="tip-box" style="margin-top:14px">
        <div class="tip-box-label">💡 Beginner Tip</div>
        <p>${ing.beginnerTip}</p>
      </div>`;
  }

  function attachCardListeners() {
    grid.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id     = btn.dataset.id;
        const detail = document.getElementById(`detail-${id}`);
        if (!detail) return;

        if (openId && openId !== id) {
          const prevDetail = document.getElementById(`detail-${openId}`);
          const prevBtn    = grid.querySelector(`.expand-btn[data-id="${openId}"]`);
          if (prevDetail) prevDetail.classList.remove('open');
          if (prevBtn)    { prevBtn.textContent = 'Details ↓'; prevBtn.setAttribute('aria-expanded', 'false'); }
        }

        const isOpen = detail.classList.toggle('open');
        btn.textContent = isOpen ? 'Close ↑' : 'Details ↓';
        btn.setAttribute('aria-expanded', String(isOpen));
        openId = isOpen ? id : null;

        if (isOpen) {
          setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        }
      });
    });
  }

  render();
});
