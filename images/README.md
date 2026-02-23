# Adding Photos to the Indian Food Guide

Photos are entirely optional — the guide displays gradient backgrounds and emojis when no image is present. When you add a photo, the guide automatically uses it.

## Directory Structure

```
images/
├── spices/          ← one file per spice (named by spice ID)
├── ingredients/     ← one file per ingredient (named by ingredient ID)
└── recipes/         ← one file per recipe (named by recipe ID)
```

## How to Add a Photo

1. Find the `id` of the item in the data file:
   - Spices: `data/spices.js` — each entry has an `id` field (e.g., `"turmeric"`)
   - Ingredients: `data/ingredients.js`
   - Recipes: `data/recipes.js`

2. Name your image file `{id}.jpg` (or `.png`, `.webp`) and place it in the correct subdirectory.

3. Update the `image` field in the data file:

   ```js
   // Before:
   image: null

   // After (for a spice photo):
   image: 'images/spices/turmeric.jpg'
   ```

That's it — the site will automatically show the photo instead of the gradient/emoji.

## Image Recommendations

| Use case | Recommended size | Format |
|----------|-----------------|--------|
| Spice/Ingredient card header | 400×240 px | JPG or WebP |
| Recipe card header | 600×400 px | JPG or WebP |
| Recipe hero | 1200×600 px | JPG or WebP |

- Use natural light, close-up shots for spices
- For recipes, show the finished dish in a bowl or plate
- Square crops also work fine — the CSS crops to fit
- WebP format reduces file size by ~30% compared to JPG

## Suggested Free Photo Sources

- [Unsplash](https://unsplash.com) — search for the ingredient/dish name
- [Pexels](https://pexels.com) — free for commercial and personal use
- Take your own photos while cooking!

## Spice IDs (for quick reference)

`turmeric`, `cumin-seeds`, `coriander`, `green-cardamom`, `black-cardamom`,
`garam-masala`, `red-chili-powder`, `kashmiri-chili`, `mustard-seeds`,
`fenugreek-seeds`, `kasuri-methi`, `asafoetida`, `bay-leaves`, `cinnamon`,
`cloves`, `fennel-seeds`, `curry-leaves`, `black-pepper`, `saffron`,
`amchur`, `chaat-masala`, `star-anise`

## Recipe IDs (for quick reference)

`dal-tadka`, `palak-paneer`, `chana-masala`, `aloo-gobi`, `rajma`,
`matar-paneer`, `dal-makhani`, `bhindi-masala`, `baingan-bharta`, `aloo-paratha`,
`butter-chicken`, `chicken-tikka-masala`, `basic-chicken-curry`,
`lamb-rogan-josh`, `chicken-biryani`, `keema-matar`, `lamb-korma`,
`tandoori-chicken`
