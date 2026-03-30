#!/bin/bash

FILE=$(jq -r '.tool_input.file_path // .tool_response.filePath')

if [ -z "$FILE" ] || [ "$FILE" = "null" ]; then
  exit 0
fi

# Sort package.json if modified
if echo "$FILE" | grep -q 'package\.json$'; then
  pnpm sort 2>/dev/null
fi

# Format with prettier
pnpm prettier --write "$FILE" --ignore-unknown 2>/dev/null

exit 0
