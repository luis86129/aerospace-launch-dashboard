#!/usr/bin/env bash
set -e

TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR"

cd "$TEMP_DIR"
git init -b gh-pages
git add .
git commit -m "deploy: publish dashboard to GitHub Pages"
git remote add origin https://github.com/luis86129/aerospace-launch-dashboard.git
git push -f origin gh-pages

rm -rf "$TEMP_DIR"
echo "Despliegue completado exitosamente en gh-pages"
