# Nirmith D’Almeida’s portfolio

A static portfolio with selected work, testimonials, a résumé, and a filterable archive of projects and certifications.

## Local preview

From the repository root, run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open [the local preview](http://127.0.0.1:4173/). The site needs no build or dependency installation.

Project details live in `data/data.js` and testimonials in `data/reviews.js`. To update the portrait, replace the image referenced by `index.html` and update its alt text and dimensions.
