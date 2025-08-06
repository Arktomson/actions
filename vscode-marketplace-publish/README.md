# VS Code Marketplace Publisher

🚀 自动发布 VS Code 扩展到官方市场的 GitHub Action。

## 功能特点

- ✅ 自动读取 `package.json` 配置
- ✅ 支持版本号更新
- ✅ 支持预发布版本
- ✅ 智能跳过重复版本
- ✅ 详细的发布日志

## 使用方法

### 基础用法

```yaml
name: Publish VS Code Extension

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: Arktomson/actions/vscode-marketplace-publish@v1
        with:
          pat: ${{ secrets.VSCODE_PAT }}
```

### 高级用法

```yaml
- uses: Arktomson/actions/vscode-marketplace-publish@v1
  with:
    version: '1.0.0'              # 可选：指定版本号
    pre_release: true             # 可选：预发布版本
    pat: ${{ secrets.VSCODE_PAT }}
    package_path: './package.json' # 可选：自定义路径
    skip_duplicate: false         # 可选：不跳过重复版本
```

## 输入参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `version` | string | ❌ | - | 发布版本号，不指定则使用 package.json 中的版本 |
| `pre_release` | boolean | ❌ | `false` | 是否为预发布版本 |
| `pat` | string | ✅ | - | VS Code Marketplace Personal Access Token |
| `package_path` | string | ❌ | `./package.json` | package.json 文件路径 |
| `skip_duplicate` | boolean | ❌ | `true` | 是否跳过重复版本 |

## 输出结果

| 名称 | 类型 | 说明 |
|------|------|------|
| `published_version` | string | 已发布的版本号 |
| `extension_id` | string | 扩展的完整 ID (publisher.name) |

## 前置要求

### 1. 获取 Personal Access Token

1. 访问 [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. 点击 "Create new organization" 或选择现有组织
3. 点击 "User settings" → "Personal access tokens"
4. 创建新的 Token，权限选择 "Marketplace (Manage)"

### 2. 配置 GitHub Secrets

在仓库设置中添加：
- `VSCODE_PAT`: 你的 Personal Access Token

### 3. package.json 配置

确保你的 `package.json` 包含必要字段：

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "publisher": "your-publisher-name",
  "engines": {
    "vscode": "^1.60.0"
  }
}
```

## 工作流示例

### 发布到 marketplace

```yaml
name: Publish Extension

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build extension
        run: npm run build
        
      - name: Publish to VS Code Marketplace
        uses: Arktomson/actions/vscode-marketplace-publish@v1
        with:
          pat: ${{ secrets.VSCODE_PAT }}
```

### 预发布版本

```yaml
- name: Publish Pre-release
  uses: Arktomson/actions/vscode-marketplace-publish@v1
  with:
    version: '1.0.0-beta.1'
    pre_release: true
    pat: ${{ secrets.VSCODE_PAT }}
```

## 故障排除

### 常见错误

1. **`Authentication failed`**
   - 检查 PAT 是否正确设置
   - 确认 PAT 有 Marketplace 权限

2. **`Extension not found`**
   - 确认 `publisher` 字段正确
   - 检查扩展名是否唯一

3. **`Version already exists`**
   - 版本号必须递增
   - 设置 `skip_duplicate: false` 强制发布

## 许可证

MIT License