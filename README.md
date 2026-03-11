
# Lambda Phi Epsilong @ THE Ohio State University's Website

Visit **[tosulambdas.com](https://tosulambdas.com)** 🚀

_Built with [Lab Website Template](https://greene-lab.gitbook.io/lab-website-template-docs)_

# Goal

make it so that if webmaster is not technically gifted, its easy to change posts, texts, pictures, items (but from a predetermined format specification)

# Development

There are two ways to run the site locally:

1. **Docker (recommended)**
2. **Local Ruby/Jekyll**

---

# Run with Docker (Recommended)

### Requirements
- Docker Desktop

### Start the dev server

```bash
docker compose up --build
```

Open the site:

```
http://localhost:4000
```

### Normal workflow

Start server

```bash
docker compose up
```

Stop server

```bash
docker compose down
```

Rebuild container after dependency changes

```bash
docker compose up --build
```

### Editing

While `docker compose up` is running:

1. Edit files in the repo
2. Save
3. Refresh the browser

Jekyll will automatically rebuild.

Rebuilding the container is **not required** for normal content edits.

---

# Run with Ruby/Jekyll

### Requirements

* Ruby 3.1+
    Install Ruby 3.1.7 from this website https://rubyinstaller.org/downloads/archives/
* Bundler

### Install dependencies

```bash
gem install bundler
bundle install
```
Be patient with the install it might take a few minutes


### Start the dev server

```bash
bundle exec jekyll serve --livereload --open-url
```

Open:

```
http://localhost:4000
```


# Notes

- Docker is the recommended development environment.
- On Windows, performance is best when the repo is inside the **WSL filesystem**.
- I've attempted to updating Ruby versions although it works fine on the local server it conflicts with the actual built of the website.
- The gitignore fild includes Gemfile and Gemfile.lock for the exact same reason, so that when the website is building no version conflicts occurs.
- If your website ever fails to build then maybe revert back to an earlier working version of the website and copy the Gemfile
- We use Godaddy for website hosting but the building part of the - website uses github workflow which I'm not equiped to working on
- For file format user WEBP preferabilly, it's optimized :)

Webmaster Lineage:
Yury "ODM" Pozdneev
Harrison "VΛPRE" Thow 
Jerry "JOΛT" Meng
Jason "VIRTUOS" Lin