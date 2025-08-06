# GitHub Actions Toolkit

实用的 GitHub Actions 工具集，包含常用的开发和部署任务。

> **使用说明**：将下面示例中的 `{owner}/{repo}` 替换为您的实际GitHub用户名和仓库名。  
> 例如：`john/my-actions/npm-publish@v1`

## 🚀 快速使用

### 方式一：使用主Action（推荐）

```yaml
# NPM发布
- uses: {owner}/{repo}@v1
  with:
    action: npm-publish
    npm_token: ${{ secrets.NPM_TOKEN }}
    npm_version: patch

# VS Code扩展发布
- uses: {owner}/{repo}@v1
  with:
    action: vscode-publish
    vscode_pat: ${{ secrets.VSCODE_PAT }}

# Docker构建
- uses: {owner}/{repo}@v1
  with:
    action: docker-build
    docker_image_name: myapp
    docker_username: ${{ secrets.DOCKER_USERNAME }}
    docker_password: ${{ secrets.DOCKER_PASSWORD }}

# 代码质量检查
- uses: {owner}/{repo}@v1
  with:
    action: code-quality
    enable_lint: true
    enable_test: true

# 测试用Action（打印数字）
- uses: {owner}/{repo}@v1
  with:
    action: print-numbers
    test_number: 20
    test_format: json
```

### 方式二：直接使用单个Action（推荐）

```yaml
# NPM发布
- uses: {owner}/{repo}/npm-publish@v1
  with:
    token: ${{ secrets.NPM_TOKEN }}
    version: patch

# VS Code扩展发布
- uses: {owner}/{repo}/vscode-marketplace-publish@v1
  with:
    pat: ${{ secrets.VSCODE_PAT }}

# Docker构建  
- uses: {owner}/{repo}/docker-build@v1
  with:
    image_name: myapp
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}

# 版本发布
- uses: {owner}/{repo}/release-manager@v1
  with:
    tag_name: v1.0.0

# 代码质量检查
- uses: {owner}/{repo}/code-quality@v1
  with:
    enable_lint: true
    enable_test: true

# 测试用Action（打印数字）
- uses: {owner}/{repo}/print-numbers@v1
  with:
    number: 20
    format: json
```

## 📦 包含的Actions

- **npm-publish** - NPM包发布
- **vscode-marketplace-publish** - VS Code扩展发布
- **docker-build** - Docker镜像构建和推送
- **release-manager** - GitHub Release管理
- **code-quality** - 代码质量检查
- **print-numbers** - 测试用Action（打印1到n的数字）

## 📝 使用示例

### 完整的发布流程
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
      
      # 代码质量检查
      - uses: your-org/actions/code-quality@v1
        with:
          enable_lint: true
          enable_test: true
      
      # 构建 Docker 镜像
      - uses: {owner}/{repo}/docker-build@v1
        with:
          image_name: myapp
          tag: ${{ github.ref_name }}
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      # 发布 NPM 包
      - uses: {owner}/{repo}/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
          version: ${{ github.ref_name }}
      
      # 创建 Release
      - uses: {owner}/{repo}/release-manager@v1
        with:
          tag_name: ${{ github.ref_name }}
          generate_notes: true
```

### VS Code 扩展发布
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
      - uses: {owner}/{repo}/vscode-marketplace-publish@v1
        with:
          pat: ${{ secrets.VSCODE_PAT }}
```

## 🔧 项目结构

```
actions/
├── action.yml                          # 主入口Action
├── npm-publish/action.yml              # NPM发布
├── vscode-marketplace-publish/         # VS Code扩展发布
├── docker-build/action.yml             # Docker构建
├── release-manager/action.yml          # Release管理
├── code-quality/action.yml             # 代码质量检查
├── print-numbers/action.yml            # 测试用Action
└── README.md
```

## 🚀 发布和使用

### 发布到GitHub
1. 推送代码到GitHub仓库
2. 创建标签：`git tag v1.0.0 && git push origin v1.0.0`
3. 用户就可以使用了！

### 实际使用示例
用户在他们的工作流中这样使用：

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # 使用您的NPM发布Action
      - uses: {owner}/{repo}/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
          version: patch
          
      # 使用您的Docker构建Action
      - uses: {owner}/{repo}/docker-build@v1
        with:
          image_name: myapp
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      # 测试Action示例
      - uses: {owner}/{repo}/print-numbers@v1
        with:
          number: 100
          prefix: "Item: "
          format: list
```

## 📖 详细参数说明

每个Action的完整参数说明请查看对应目录下的`action.yml`文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License