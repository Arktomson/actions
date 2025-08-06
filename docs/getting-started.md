# 快速开始

本指南将帮助你快速上手 ZCY Actions Toolkit。

## 📦 Actions 概览

| Action | 用途 | 状态 |
|--------|------|------|
| [VS Code Marketplace Publisher](../vscode-marketplace-publish/) | 发布 VS Code 扩展 | ✅ 可用 |
| [NPM Publisher](../npm-publish/) | 发布 NPM 包 | ✅ 可用 |
| [Release Manager](../release-manager/) | 自动化版本发布 | ✅ 可用 |
| [Docker Builder](../docker-build/) | 构建 Docker 镜像 | ✅ 可用 |

## 🚀 快速使用

### 1. VS Code 扩展发布

```yaml
- uses: Arktomson/actions/vscode-marketplace-publish@v1
  with:
    pat: ${{ secrets.VSCODE_PAT }}
```

### 2. NPM 包发布

```yaml
- uses: Arktomson/actions/npm-publish@v1
  with:
    version: 'patch'
    token: ${{ secrets.NPM_TOKEN }}
```

### 3. 创建 Release

```yaml
- uses: Arktomson/actions/release-manager@v1
  with:
    tag_name: 'v1.0.0'
    generate_notes: true
```

### 4. Docker 镜像构建

```yaml
- uses: Arktomson/actions/docker-build@v1
  with:
    image_name: 'myapp'
    registry: 'docker.io'
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

## ⚙️ 通用配置

### 必需的 Secrets

根据使用的 Action，在 GitHub 仓库设置中添加相应的 Secrets：

| Secret | 用途 | 获取方式 |
|--------|------|----------|
| `VSCODE_PAT` | VS Code Marketplace 发布 | [VS Code Marketplace](https://marketplace.visualstudio.com/manage) |
| `NPM_TOKEN` | NPM 包发布 | [NPM 官网](https://www.npmjs.com/settings/tokens) |
| `DOCKER_USERNAME` | Docker 登录 | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker 登录 | Docker Hub 密码或访问令牌 |

### 工作流权限

确保 GitHub Actions 有适当的权限：

```yaml
permissions:
  contents: write    # 用于创建 release 和推送标签
  packages: write    # 用于 Docker 镜像推送（如果使用 ghcr.io）
```

## 📝 示例工作流

查看 [examples/](../examples/) 目录获取完整的工作流示例。

## 🔧 故障排除

### 常见问题

1. **权限错误**
   - 检查 Secrets 是否正确设置
   - 确认工作流有足够权限

2. **版本冲突**
   - 确保版本号递增
   - 检查是否已存在相同版本

3. **构建失败**
   - 检查依赖安装
   - 确认构建脚本正确

更多详细信息请查看各个 Action 的文档。