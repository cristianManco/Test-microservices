name: Pipeline Lint
on:
  push:
    branches:
      - main
      - dev
  pull_request:
    branches:
      - main
      - dev

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20.15'  # Corregido a la versión correcta

      - name: Install dependencies
        run: npm install

      - name: Run linter
        run: npm run lint
