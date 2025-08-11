# General Actions Toolkit

A collection of useful GitHub Actions for common development and deployment tasks.

## 🚀 Quick Start

### VS Code Extension Publishing Example

```yaml
name: 发布 VS Code 扩展

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:
    inputs:
      version:
        description: '发布版本 (留空使用 package.json 版本)'
        required: false
      pre_release:
        description: '预发布版本'
        type: boolean
        default: false

jobs:
  publish:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.publish.outputs.version }}
    
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 发布扩展
        id: publish
        uses: Arktomson/actions/vscode-extension-publish@v1.0.2
        with:
          version: ${{ inputs.version }}
          pre_release: ${{ inputs.pre_release }}
          package_manager: 'npm'
          node_version: '20'
          vsce_pat: ${{ secrets.VSCE_PAT }}

      - name: 创建 GitHub Release
        if: startsWith(github.ref, 'refs/tags/')
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref_name }}
          release_name: Release ${{ steps.publish.outputs.version }}
          body: |
            🚀 VS Code 扩展 ${{ steps.publish.outputs.version }} 发布成功！
            
            ## 安装方式
            在 VS Code 中搜索扩展名或运行：
            ```
            code --install-extension publisher.extension-name
            ```
          draft: false
          prerelease: ${{ inputs.pre_release }}

  notify:
    needs: publish
    runs-on: ubuntu-latest
    if: success()
    steps:
      - name: 发送成功通知
        run: |
          echo "✅ VS Code 扩展 v${{ needs.publish.outputs.version }} 发布成功！"
          echo "🔗 Marketplace: https://marketplace.visualstudio.com/items?itemName=your-publisher.your-extension"
```

## 📦 Available Actions

- **vscode-extension-publish** - VS Code extension publishing to marketplace
