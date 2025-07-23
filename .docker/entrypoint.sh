#! /bin/bash

set -e
set -o pipefail

cleanup() {
  echo -e "\n🧹 Caught SIGTERM. Cleaning up..."
  kill -TERM "$jekyll_pid" 2>/dev/null
  exit 0
}
trap cleanup SIGTERM

echo -e "\n📁 Container launched — current directory contents:"
ls -alh
echo ""

echo "🔁 Running citation preprocessor..."
python3 _cite/cite.py

echo "🚀 Starting Jekyll (hot reload)..."
watchmedo auto-restart \
  --debug-force-polling \
  --patterns="_config.yaml" \
  --signal SIGTERM \
  -- \
  bundle exec jekyll serve --open-url --force_polling --livereload --trace --host=0.0.0.0 \
  | sed "s/LiveReload address.*//g;s/0.0.0.0/localhost/g" &

jekyll_pid=$!

echo "👀 Watching for _data changes..."
watchmedo shell-command \
  --debug-force-polling \
  --recursive \
  --wait \
  --command="python3 _cite/cite.py" \
  --patterns="_data/sources*;_data/orcid*;_data/pubmed*;_data/google-scholar*"

# Wait for background processes (jekyll) before exiting script
wait $jekyll_pid
