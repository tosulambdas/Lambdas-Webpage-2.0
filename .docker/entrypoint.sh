#! /bin/bash
set -e

echo "Contents:"
echo ""
ls
echo ""

bundle check || bundle install

python3 _cite/cite.py

watchmedo auto-restart \
    --debug-force-polling \
    --patterns="_config.yaml" \
    --signal SIGTERM \
    bundle exec jekyll serve --open-url --force_polling --livereload --incremental --trace --host=0.0.0.0
    | sed "s/LiveReload address.*//g;s/0.0.0.0/localhost/g" &

watchmedo shell-command \
    --debug-force-polling \
    --recursive \
    --wait \
    --command="python3 _cite/cite.py" \
    --patterns="_data/sources*;_data/orcid*;_data/pubmed*;_data/google-scholar*"