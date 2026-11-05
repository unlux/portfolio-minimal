#!/usr/bin/env bash
# Builds both CVs in a TeX Live container (image built from ./Dockerfile).
# Output: cv/build/*.pdf. Pass --publish to also copy them to public/,
# where the site serves them at /resume.pdf and /devops.pdf.
set -euo pipefail
cd "$(dirname "$0")"
docker image inspect portfolio-cv-tex >/dev/null 2>&1 || docker build -q -t portfolio-cv-tex . >/dev/null
mkdir -p build
for cv in resume devops; do
  docker run --rm -u "$(id -u):$(id -g)" -v "$PWD":/cv -w /cv portfolio-cv-tex \
    pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build "$cv.tex" > "build/$cv.stdout" \
    || { tail -30 "build/$cv.stdout"; echo "build failed: $cv"; exit 1; }
done
if [[ "${1:-}" == "--publish" ]]; then cp build/resume.pdf build/devops.pdf ../public/; fi
