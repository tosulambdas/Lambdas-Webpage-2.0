#!/bin/bash
set -e

cd /usr/src/app

echo "Contents:"
echo ""
ls
echo ""

bundle check || bundle install

python3 _cite/cite.py

watchmedo shell-command \
  --debug-force-polling \
  --recursive \
  --wait \
  --command="python3 _cite/cite.py" \
  --patterns="_data/sources*;_data/orcid*;_data/pubmed*;_data/google-scholar*" &

exec bundle exec jekyll serve \
  --livereload \
  --force_polling \
  --incremental \
  --trace \
  --host=0.0.0.0 \
  --port=4000