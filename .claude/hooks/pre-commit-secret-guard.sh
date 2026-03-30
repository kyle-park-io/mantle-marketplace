#!/bin/bash

# Git pre-commit hook: scan staged files for secrets before allowing a commit.
# Install by symlinking or copying to .git/hooks/pre-commit.
# The check-project-files hook registers this automatically on SessionStart.

ERRORS=()

# Check that .env is gitignored
if git ls-files --error-unmatch .env &>/dev/null 2>&1; then
  ERRORS+=(".env is tracked by git. Run: git rm --cached .env")
fi

# Scan staged files for secret patterns
STAGED=$(git diff --cached --name-only)

SECRET_PATTERNS=(
  'sk-[A-Za-z0-9]{20,}'
  'ghp_[A-Za-z0-9]{36}'
  'gho_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{82}'
  'AKIA[0-9A-Z]{16}'
  'ya29\.[A-Za-z0-9._-]+'
  'xox[baprs]-[A-Za-z0-9-]+'
  'AIza[0-9A-Za-z_-]{35}'
  'sk-ant-[A-Za-z0-9_-]{90,}'
)

for FILE in $STAGED; do
  # Skip binary files and .env.example
  [[ "$FILE" == *.example ]] && continue
  [[ ! -f "$FILE" ]] && continue

  CONTENT=$(git show ":$FILE" 2>/dev/null)

  for PATTERN in "${SECRET_PATTERNS[@]}"; do
    if echo "$CONTENT" | grep -qE "$PATTERN"; then
      ERRORS+=("Possible secret in $FILE (pattern: $PATTERN)")
    fi
  done
done

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo ""
  echo "SECRET GUARD: commit blocked"
  echo ""
  for ERR in "${ERRORS[@]}"; do
    echo "  - $ERR"
  done
  echo ""
  echo "Remove secrets and use environment variables. See .env.example for reference."
  echo ""
  exit 1
fi

exit 0
