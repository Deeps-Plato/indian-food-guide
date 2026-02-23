# Indian Food Guide

A comprehensive, beginner-friendly reference website for Indian cooking. Learn the spices, stock the pantry, and cook authentic recipes — all from static HTML files with no server required.

## What's Inside

- **22 spices** with descriptions, beginner tips, and typical amounts
- **17 core ingredients** with storage tips and substitutes
- **18 recipes** — 10 vegetarian, 8 meat — with detailed step-by-step instructions
- Filterable, searchable reference pages for each category
- Mobile-responsive design
- Print-friendly recipe layout

## Requirements

A modern web browser. No server, no build step, no dependencies.

## Quick Start

### Open locally

```bash
# Double-click index.html in your file manager, or:
open ~/claude/indian-food-guide/index.html

# Or on Linux/WSL:
xdg-open ~/claude/indian-food-guide/index.html
```

### GitHub Pages (recommended)

1. Create a new GitHub repository named `indian-food-guide`
2. Push the project:
   ```bash
   cd ~/claude/indian-food-guide
   git init
   git add .
   git commit -m "feat: initial Indian Food Guide"
   git remote add origin https://github.com/YOUR_USERNAME/indian-food-guide.git
   git push -u origin main
   ```
3. In GitHub → Settings → Pages → Source: `main` branch, root `/`
4. Your site will be live at `https://YOUR_USERNAME.github.io/indian-food-guide/`

## File Structure

```
indian-food-guide/
├── index.html              # Landing page
├── spices.html             # Spice encyclopedia (22 spices)
├── ingredients.html        # Core ingredients (17 items)
├── recipes.html            # Recipe index (18 recipes, filterable)
├── recipe.html             # Single recipe page (reads ?id= from URL)
├── css/
│   └── style.css           # Complete design system
├── js/
│   ├── app.js              # Shared utilities and navigation
│   ├── spices-page.js      # Spice grid + search + filter
│   ├── ingredients-page.js # Ingredient grid + search + filter
│   ├── recipes-page.js     # Recipe grid + search + filter
│   └── recipe-detail.js    # Individual recipe renderer
├── data/
│   ├── spices.js           # window.SPICES_DATA — 22 spices
│   ├── ingredients.js      # window.INGREDIENTS_DATA — 17 ingredients
│   └── recipes.js          # window.RECIPES_DATA — 18 recipes
└── images/
    ├── README.md           # Photo-adding instructions
    ├── spices/
    ├── ingredients/
    └── recipes/
```

## Adding Content

### Add a new recipe

Open `data/recipes.js` and add an entry to the `RECIPES_DATA` array following the existing pattern. Required fields:

```js
{
  id: 'unique-kebab-id',       // Used in URL: recipe.html?id=unique-kebab-id
  name: 'Recipe Name',
  subtitle: 'One-line description',
  category: 'vegetarian',      // or 'meat'
  difficulty: 'Beginner',      // 'Beginner', 'Intermediate', or 'Advanced'
  prepTime: '10 min',
  cookTime: '30 min',
  servings: 4,
  emoji: '🍲',
  gradient: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
  description: '...',
  story: '...',
  whatItTastes: '...',
  ingredients: [
    { amount: '1 cup', item: 'ingredient name', note: 'optional note' }
  ],
  steps: [
    { step: 1, title: 'Step title', instruction: 'Full instructions...' }
  ],
  tips: ['Tip 1', 'Tip 2'],
  serving: 'Serving suggestions...',
  spicesUsed: ['turmeric', 'cumin-seeds'],  // IDs from spices.js
  image: null  // or 'images/recipes/your-id.jpg'
}
```

The recipe will automatically appear in the grid and be accessible at `recipe.html?id=unique-kebab-id`.

### Add a new spice or ingredient

Same approach — add an entry to `data/spices.js` or `data/ingredients.js`. The page re-renders automatically from the data.

### Add photos

See `images/README.md` for instructions.

## Architecture Notes

**Why `.js` data files instead of `.json`?**
JSON loaded with `fetch()` fails when opening files directly (`file://` protocol). JavaScript files with `window.DATA = [...]` work in both local file access and GitHub Pages.

**URL routing without a server:**
Recipe pages use `?id=` query parameters. `recipe.html?id=butter-chicken` reads the `id` param in JavaScript, finds the matching entry in `RECIPES_DATA`, and renders it — no server routing needed.

**Adding search/filter categories:**
Filter pills in the HTML have `data-category` or `data-value` attributes that the JS reads. To add a new filter value, add a pill in the HTML and ensure the data has matching `category` or `difficulty` fields.

## Recipes Included

### Vegetarian (10)
| Recipe | Difficulty | Cook Time |
|--------|-----------|-----------|
| Dal Tadka | Beginner | 25 min |
| Palak Paneer | Beginner | 25 min |
| Chana Masala | Beginner | 30 min |
| Aloo Gobi | Beginner | 25 min |
| Rajma | Beginner | 35 min |
| Matar Paneer | Beginner | 25 min |
| Bhindi Masala | Beginner | 20 min |
| Baingan Bharta | Beginner | 30 min |
| Aloo Paratha | Intermediate | 30 min |
| Dal Makhani | Intermediate | 90 min |

### Meat (8)
| Recipe | Difficulty | Cook Time |
|--------|-----------|-----------|
| Butter Chicken | Beginner | 35 min |
| Basic Chicken Curry | Beginner | 35 min |
| Keema Matar | Beginner | 30 min |
| Tandoori Chicken (Oven) | Beginner | 30 min |
| Chicken Tikka Masala | Intermediate | 40 min |
| Lamb Rogan Josh | Intermediate | 75 min |
| Lamb Korma | Intermediate | 75 min |
| Chicken Biryani | Advanced | 60 min |
