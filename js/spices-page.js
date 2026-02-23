/* ============================================================
   Indian Food Guide — Spices Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid       = document.getElementById('spice-grid');
  const searchEl   = document.getElementById('spice-search');
  const pillsEl    = document.getElementById('category-pills');
  const countEl    = document.getElementById('results-count');

  if (!grid || !window.SPICES_DATA) return;

  let activeCategory = 'all';
  let searchTerm     = '';
  let openId         = null;

  /* ── Category pill click ── */
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

  /* ── Search input ── */
  if (searchEl) {
    searchEl.addEventListener('input', debounce(() => {
      searchTerm = searchEl.value;
      render();
    }, 200));
  }

  /* ── Build and render cards ── */
  function render() {
    const items = filterItems(window.SPICES_DATA, searchTerm, { category: activeCategory });
    setResultsCount(countEl, items.length, window.SPICES_DATA.length, 'spice');

    if (items.length === 0) {
      renderEmpty(grid, 'No spices match your search. Try clearing the filter or search term.');
      return;
    }

    grid.innerHTML = items.map(spice => buildCard(spice)).join('');
    attachCardListeners();
  }

  function buildCard(spice) {
    const headerContent = spice.image
      ? `<img src="${spice.image}" alt="${spice.name}" loading="lazy">`
      : `<span style="position:relative;z-index:1;font-size:3rem">${spice.emoji}</span>`;

    return `
      <div class="spice-card" id="card-${spice.id}" data-id="${spice.id}">
        <div class="spice-card-header" style="background:${spice.gradient}">
          ${headerContent}
        </div>
        <div class="spice-card-body">
          <div class="spice-card-name">${spice.name}</div>
          <div class="spice-card-hindi">${spice.hindiName}</div>
          ${spice.otherNames && spice.otherNames.length
            ? `<div style="font-size:0.75rem;color:var(--brown);opacity:0.7;margin-bottom:6px;">
                 Also: ${spice.otherNames.join(', ')}
               </div>` : ''}
          <div class="spice-card-taste">${spice.taste}</div>
          <span class="spice-card-amount">✦ ${spice.typicalAmount}</span>
        </div>
        <div class="spice-card-footer">
          <span style="font-size:0.75rem;padding:2px 8px;border-radius:999px;background:var(--cream);border:1px solid var(--border)">
            ${spice.category}
          </span>
          <button class="expand-btn" data-id="${spice.id}" aria-expanded="false">
            Details ↓
          </button>
        </div>
        <div class="spice-detail" id="detail-${spice.id}">
          ${buildDetail(spice)}
        </div>
      </div>`;
  }

  function buildDetail(spice) {
    return `
      <div class="spice-detail-grid">
        <div>
          <div class="spice-detail-label">Taste</div>
          <div class="spice-detail-value">${spice.taste}</div>
        </div>
        <div>
          <div class="spice-detail-label">Aroma</div>
          <div class="spice-detail-value">${spice.aroma}</div>
        </div>
      </div>
      <div class="spice-detail-label" style="margin-bottom:6px">Description</div>
      <p style="font-size:0.875rem;color:var(--brown);line-height:1.7">${spice.description}</p>
      <div class="spice-detail-label" style="margin:12px 0 6px">Common Uses</div>
      <div class="spice-detail-uses">
        ${spice.uses.map(u => `<span class="use-chip">${u}</span>`).join('')}
      </div>
      <div class="tip-box">
        <div class="tip-box-label">💡 Beginner Tip</div>
        <p>${spice.beginnerTip}</p>
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
