#!/bin/bash

# Pre-tool hook: block writes that contain secret patterns or target sensitive files.
# Triggered on Write and Edit tool calls.

INPUT=$(cat)

FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // ""')

# Block writes to .env files (allow .env.example)
if echo "$FILE" | grep -qE '\.env$|\.env\.[^e]'; then
  echo '{"decision":"block","reason":"Writing to .env files is not allowed. Use .env.example for templates and keep secrets out of the repository."}'
  exit 0
fi

# Detect secret patterns in content
PATTERNS=(
  'sk-[A-Za-z0-9]{20,}'
  'ghp_[A-Za-z0-9]{36}'
  'gho_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{82}'
  'AKIA[0-9A-Z]{16}'
  'ya29\.[A-Za-z0-9._-]+'
  'eyJhbGciOiJ[A-Za-z0-9._-]+'
  'xox[baprs]-[A-Za-z0-9-]+'
  'AIza[0-9A-Za-z_-]{35}'
  'sk-ant-[A-Za-z0-9_-]{90,}'
)

for PATTERN in "${PATTERNS[@]}"; do
  if echo "$CONTENT" | grep -qE "$PATTERN"; then
    echo "{\"decision\":\"block\",\"reason\":\"Possible secret detected in file content (pattern: ${PATTERN}). Remove the secret and use environment variables instead.\"}"
    exit 0
  fi
done

exit 0
