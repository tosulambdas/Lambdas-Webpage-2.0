#! /bin/bash
set -e

cd /usr/src/app

echo "Contents:"
echo ""
ls
echo ""

bundle check || bundle install

python3 _cite/cite.py

(
  watchmedo auto-restart \
    --debug-force-polling \
    --patterns="_config.yaml;*.md;*.html;*.yml;*.yaml;*.scss;*.js" \
    --recursive \
    --signal SIGTERM \
    -- \
    bundle exec jekyll serve \
      --livereload \
      --incremental \
      --trace \
      --host=0.0.0.0 \
      --port=4000
) | sed "s/LiveReload address.*//g;s/0.0.0.0/localhost/g" &

watchmedo shell-command \
    --debug-force-polling \
    --recursive \
    --wait \
    --command="python3 _cite/cite.py" \
    --patterns="_data/sources*;_data/orcid*;_data/pubmed*;_data/google-scholar*"