#!/bin/sh

# Replace the placeholder in the static JS file with the actual environment variable
echo "Injecting environment variables..."

for file in /usr/share/nginx/html/static/js/*.js; do
  sed -i "s|REACT_APP_API_URL_PLACEHOLDER|${REACT_APP_API_BASE_URL}|g" "$file"
done

exec "$@"
