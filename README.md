# GitHub Actions Toolkit

A collection of useful GitHub Actions for common development and deployment tasks.

## 🚀 Quick Start

### Direct Individual Action Usage (Recommended)

```yaml
# NPM Publishing
- uses: Arktomson/actions/npm-publish@v0
  with:
    token: ${{ secrets.NPM_TOKEN }}
    version: patch

# VS Code Extension Publishing
- uses: Arktomson/actions/vscode-marketplace-publish@v0
  with:
    pat: ${{ secrets.VSCODE_PAT }}

# Docker Build  
- uses: Arktomson/actions/docker-build@v0
  with:
    image_name: myapp
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}

# Release Management
- uses: Arktomson/actions/release-manager@v0
  with:
    tag_name: v1.0.0

# Code Quality Check
- uses: Arktomson/actions/code-quality@v0
  with:
    enable_lint: true
    enable_test: true

# Test Action (Print Numbers)
- uses: Arktomson/actions/print-numbers@v0
  with:
    number: 20
    format: json
```

## 📦 Available Actions

- **npm-publish** - NPM package publishing
- **vscode-marketplace-publish** - VS Code extension publishing
- **docker-build** - Docker image build and push
- **release-manager** - GitHub Release management
- **code-quality** - Code quality checks (lint, test, typecheck, audit)
- **print-numbers** - Test action (prints numbers from 1 to n)

## 📝 Usage Examples

### Complete Release Workflow
```yaml
name: Release
on:
  push:
    tags: ['v*']

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Code quality check
      - uses: Arktomson/actions/code-quality@v0
        with:
          enable_lint: true
          enable_test: true
      
      # Build Docker image
      - uses: Arktomson/actions/docker-build@v0
        with:
          image_name: myapp
          tag: ${{ github.ref_name }}
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      # Publish NPM package
      - uses: Arktomson/actions/npm-publish@v0
        with:
          token: ${{ secrets.NPM_TOKEN }}
          version: ${{ github.ref_name }}
      
      # Create Release
      - uses: Arktomson/actions/release-manager@v0
        with:
          tag_name: ${{ github.ref_name }}
          generate_notes: true
```

### VS Code Extension Publishing
```yaml
name: Publish Extension
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Arktomson/actions/vscode-marketplace-publish@v0
        with:
          pat: ${{ secrets.VSCODE_PAT }}
```

## 🔧 Project Structure

```
actions/
├── action.yml                          # Main entry action
├── npm-publish/action.yml              # NPM publishing
├── vscode-marketplace-publish/         # VS Code extension publishing
├── docker-build/action.yml             # Docker build
├── release-manager/action.yml          # Release management
├── code-quality/action.yml             # Code quality checks
├── print-numbers/action.yml            # Test action
└── README.md
```

## 🚀 Publishing and Usage

### Publishing to GitHub
1. Push code to GitHub repository
2. Create tag: `git tag v1.0.0 && git push origin v1.0.0`
3. Users can now use your actions!

### Real Usage Example
Users can use these actions in their workflows like this:

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Use your NPM publishing action
      - uses: Arktomson/actions/npm-publish@v0
        with:
          token: ${{ secrets.NPM_TOKEN }}
          version: patch
          
      # Use your Docker build action
      - uses: Arktomson/actions/docker-build@v0
        with:
          image_name: myapp
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      # Test action example
      - uses: Arktomson/actions/print-numbers@v0
        with:
          number: 100
          prefix: "Item: "
          format: list
```

## 📖 Detailed Parameters

For complete parameter documentation for each action, please refer to the `action.yml` file in each action's directory.

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License