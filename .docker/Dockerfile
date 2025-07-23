# Use official Ruby image
FROM ruby:3.1.2

# Set working directory
WORKDIR /usr/src/app

# Copy Gemfile and requirements early for Docker caching
COPY Gemfile Gemfile.lock _cite/requirements.txt ./

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  wget \
  python3 \
  python3-pip \
  && rm -rf /var/lib/apt/lists/*

# Install correct Bundler version and run bundle install (includes native gems like sass-embedded)
RUN BUNDLER_VERSION=$(grep -A 1 'BUNDLED WITH' Gemfile.lock | tail -n 1 | xargs) && \
    gem install bundler -v "$BUNDLER_VERSION" && \
    bundle config set force_ruby_platform true && \
    bundle _"$BUNDLER_VERSION"_ install --with jekyll_plugins --retry=3

# Install Python dependencies
RUN python3 -m pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install "watchdog[watchmedo]==3.0.0"

# Copy full app (after bundle install to leverage caching)
COPY . .

# Copy entrypoint script and make it executable
COPY .docker/entrypoint.sh /var/entrypoint.sh
RUN chmod +x /var/entrypoint.sh

# Expose ports used by Jekyll
EXPOSE 4000
EXPOSE 35729

# Set entrypoint
CMD ["/usr/local/bin/entrypoint.sh"]
