/* ============================================================
   Indian Food Guide — Shared Utilities
   ============================================================ */

/* ── Navigation ── */
function initNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

/* ── Difficulty badge HTML ── */
function difficultyBadge(difficulty) {
  const cls = difficulty.toLowerCase();
  return `<span class="badge badge-${cls}">${difficulty}</span>`;
}

/* ── Category badge ── */
function categoryBadge(category) {
  if (!category) return '';
  const cls  = category === 'vegetarian' || category === 'veg' ? 'veg' : 'meat';
  const label = cls === 'veg' ? 'Vegetarian' : 'Meat';
  return `<span class="badge badge-${cls}">${label}</span>`;
}

/* ── Format time string ── */
function formatTime(t) {
  return t || '—';
}

/* ── Debounce ── */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/* ── Simple filter/search helper ── */
function filterItems(items, search, filters) {
  const term = search.trim().toLowerCase();
  return items.filter(item => {
    if (term) {
      const haystack = [
        item.name,
        item.hindiName,
        ...(item.otherNames || []),
        item.description,
        item.taste,
        item.subtitle,
        ...(item.tags || [])
      ].join(' ').toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    for (const [key, val] of Object.entries(filters)) {
      if (!val || val === 'all') continue;
      if (key === 'category') {
        if (item.category !== val) return false;
      }
      if (key === 'difficulty') {
        if ((item.difficulty || '').toLowerCase() !== val) return false;
      }
    }
    return true;
  });
}

/* ── Render empty state ── */
function renderEmpty(container, message) {
  container.innerHTML = `
    <div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state-icon">🔍</div>
      <h3>Nothing found</h3>
      <p>${message || 'Try a different search or filter.'}</p>
    </div>`;
}

/* ── Update results count ── */
function setResultsCount(el, count, total, noun) {
  if (!el) return;
  el.textContent = count === total
    ? `${total} ${noun}${total !== 1 ? 's' : ''}`
    : `${count} of ${total} ${noun}${total !== 1 ? 's' : ''}`;
}

/* ── Run on DOM ready ── */
document.addEventListener('DOMContentLoaded', initNav);
