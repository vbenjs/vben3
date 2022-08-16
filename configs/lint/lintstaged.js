module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm eslint --fix', 'pnpm prettier --write'],
  '*.vue': [
    'pnpm eslint --fix',
    'pnpm stylelint --fix',
    'pnpm prettier --write',
  ],
  '*.{scss,less,styl,html}': ['pnpm stylelint --fix', 'pnpm prettier --write'],
}
