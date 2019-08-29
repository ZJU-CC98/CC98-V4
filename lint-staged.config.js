module.exports = {
  '**/*.{ts,tsx}': [
    () => 'tsc --noEmit --project tsconfig.json',
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  '**/*.{scss}': ['stylelint --fix', 'prettier --write', 'git add'],
}
