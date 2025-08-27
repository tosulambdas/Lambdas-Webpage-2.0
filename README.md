
# Harrisonthow's Website

Visit **[tosulambdas.com](https://tosulambdas.com)** 🚀

_Built with [Lab Website Template](https://greene-lab.gitbook.io/lab-website-template-docs)_


-make it so that if webmaster is not technically gifted, its easy to change posts, texts, pictures, items (but from a predetermined format specification)

Installation:
    Install Ruby 2.4.7 from this website https://rubyinstaller.org/downloads/archives/
    In a command line run "gem install bundler"
    Navigate to the root directory of the website and run "bundle install" in a command line
    Start the live server by running "bundle exec jekyll serve --open-url --livereload --trace"

Build using docker:
    docker-compose up --build

Notes:
    I've attempted to updating Ruby versions although it works fine on the local server it conflicts with the actual built of the website.
    The gitignore fild includes Gemfile and Gemfile.lock for the exact same reason, so that when the website is building no version conflicts occurs.
    If your website ever fails to build then maybe revert back to an earlier working version of the website and copy the Gemfile
    We use Godaddy for website hosting btu the building part of the website uses github workflow which I'm not equiped to working on
    For file format user WEBP preferabilly, it's optimized :)

Webmaster Lineage:
Yury "ODM" Pozdneev
Harrison "VΛPRE" Thow 
Jerry "JOΛT" Meng
Jason "VIRTUOS" Lin