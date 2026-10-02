# Bangla Cultural Explorer

## To add information
You normally only need to edit the files inside `data/`.

- `literature.json`
- `cultural-words.json`
- `textiles.json`
- `food.json`
- `regions.json`
- `folk-traditions.json`

Each file has:
- `title`
- `intro`
- `items`

Each item follows:
`[icon, title, category/region, description]`

Example:
```json
["🌿", "পাট", "Agriculture · Bengal", "Jute; a traditional crop..."]
```

## To run locally
Opening `index.html` directly may prevent the browser from loading JSON files because of browser security rules.

Use a simple local server instead. If you have VS Code, the easiest option is the Live Server extension. Another option is:
`python -m http.server`

Then open the local address shown by the server.

## To publish
Upload the whole folder to a public GitHub repository and enable GitHub Pages.
