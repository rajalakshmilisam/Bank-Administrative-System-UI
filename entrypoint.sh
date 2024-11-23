#!/bin/sh

# Generate env-config.js with runtime environment variables
echo "Generating runtime environment configuration..."
echo "window.env = {" > /usr/share/nginx/html/env-config.js

# Add runtime variables from environment
if [ ! -z "$REACT_APP_API_BASE_URL" ]; then
  echo "  REACT_APP_API_BASE_URL: '${REACT_APP_API_BASE_URL}'," >> /usr/share/nginx/html/env-config.js
fi

echo "};" >> /usr/share/nginx/html/env-config.js

echo "Environment configuration generated:"
cat /usr/share/nginx/html/env-config.js

# Execute the default command
exec "$@"
