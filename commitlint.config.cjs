// @see: https://cz-git.qbenben.com/zh/guide

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "perf", "test", "build", "chore", "wip", "types", "release"]]
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      subject: "填写简短精炼的变更描述 :\n",
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      { value: "wip", name: "开发: 正在开发中" },
      { value: "fix", name: "修复: 修复缺陷" },
      { value: "feat", name: "特性: 新增功能" },
      { value: "docs", name: "文档: 文档变更" },
      { value: "style", name: "格式: 代码格式（不影响功能，例如空格、分号等格式修正）" },
      { value: "refactor", name: "重构: 代码重构（不包括 bug 修复、功能新增）" },
      { value: "perf", name: "性能: 性能优化" },
      { value: "test", name: "测试: 添加疏漏测试或已有测试改动" },
      { value: "build", name: "构建: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）" },
      { value: "chore", name: "其他: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）" },
      { value: "types", name: "类型: 类型定义文件修改" }
    ],
    allowBreakingChanges: ["feat", "fix"],
    skipQuestions: ["scope", "body", "footer"]
  }
};
