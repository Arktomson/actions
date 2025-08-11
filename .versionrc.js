/**
 * Standard Version 配置文件
 * 用于自动化版本管理和 CHANGELOG 生成
 * @type {import('standard-version').Options}
 */
export default {
  /** CHANGELOG 文件的头部内容 */
  "header": "",
  /** CHANGELOG 标题格式模板，支持 Handlebars 语法 */
  "headerFormat": "{{#if isPatch}}## [{{version}}]({{compareUrl}}) ({{date}}){{else}}{{#if isMinor}}## [{{version}}]({{compareUrl}}) ({{date}}){{else}}# [{{version}}]({{compareUrl}}) ({{date}}){{/if}}{{/if}}",
  
  /** 发布提交信息格式 */
  "releaseCommitMessageFormat": "chore(release): 发布 {{currentTag}}",
  
  /** 
   * 提交类型配置
   * 定义不同类型的提交如何在 CHANGELOG 中显示
   */
  "types": [
    {
      "type": "feat",
      "section": "✨ 新功能"
    },
    {
      "type": "fix",
      "section": "🐛 问题修复"
    },
    {
      "type": "docs",
      "section": "📝 文档更新"
    },
    {
      "type": "style",
      "section": "💄 样式调整"
    },
    {
      "type": "refactor",
      "section": "♻️ 代码重构"
    },
    {
      "type": "perf",
      "section": "⚡️ 性能优化"
    },
    {
      "type": "test",
      "section": "✅ 测试相关"
    },
    {
      "type": "build",
      "section": "📦 构建相关"
    },
    {
      "type": "ci",
      "section": "👷 CI/CD"
    },
    {
      "type": "chore",
      "section": "🔧 其他更新"
    }
  ],
  
  /** 
   * 需要自动更新版本号的文件列表
   * 这些文件中的版本号会在发布时自动更新
   */
  "bumpFiles": [
    "package.json",
    "package-lock.json"
  ],
  
  /** Git tag 前缀，例如 v1.0.0 */
  "tagPrefix": "v",
  
  /** 跳过的步骤配置 */
  "skip": {
    /** 是否跳过生成 CHANGELOG */
    "changelog": false
  },
  
  /** 包文件列表，用于读取当前版本信息 */
  "packageFiles": [
    "package.json"
  ],
  
  /** 项目根路径 */
  "path": ".",
  
  /** CHANGELOG 文件名 */
  "infile": "CHANGELOG.md",
  
  /** 
   * Conventional Commits 预设配置
   * 定义提交信息的解析和格式化规则
   */
  "preset": {
    /** 预设名称，使用 conventionalcommits 规范 */
    "name": "conventionalcommits",
    
    /** 预设中的提交类型定义（与上面 types 字段重复定义以确保兼容性） */
    "types": [
      {
        "type": "feat",
        "section": "✨ 新功能"
      },
      {
        "type": "fix",
        "section": "🐛 问题修复"
      },
      {
        "type": "docs",
        "section": "📝 文档更新"
      },
      {
        "type": "style",
        "section": "💄 样式调整"
      },
      {
        "type": "refactor",
        "section": "♻️ 代码重构"
      },
      {
        "type": "perf",
        "section": "⚡️ 性能优化"
      },
      {
        "type": "test",
        "section": "✅ 测试相关"
      },
      {
        "type": "build",
        "section": "📦 构建相关"
      },
      {
        "type": "ci",
        "section": "👷 CI/CD"
      },
      {
        "type": "chore",
        "section": "🔧 其他更新"
      }
    ],
    
    /** Issue 链接格式模板 */
    "issueUrlFormat": "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
    
    /** 提交链接格式模板 */
    "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
    
    /** 版本比较链接格式模板 */
    "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
    
    /** 用户链接格式模板 */
    "userUrlFormat": "{{host}}/{{user}}",
    
    /** Issue 引用前缀列表 */
    "issuePrefixes": [
      "#"
    ],
    
    /** 版本号匹配的正则表达式模式 */
    "headerPattern": "^(\\d+)\\.(\\d+)\\.(\\d+)$"
  }
};
