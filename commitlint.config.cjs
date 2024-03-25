// @see: https://cz-git.qbenben.com/zh/guide
// const fs = require("fs");
// const path = require("path");

// const scopes = fs
//   .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
//   .filter(dirent => dirent.isDirectory())
//   .map(dirent => dirent.name.replace(/s$/, ""));

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
      // type: "Select the type of change that you're committing:",
      // scope: "Denote the SCOPE of this change (optional):",
      // customScope: "Denote the SCOPE of this change:",
      // subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      // body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      // breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      // footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      // customFooterPrefixs: "Input ISSUES prefix:",
      // footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      // confirmCommit: "Are you sure you want to proceed with the commit above?"
      // 中文版
      type: "选择你要提交的类型 :",
      // scope: "选择一个提交范围（可选）:",
      // customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      // body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      // breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
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
    // scopes: [...scopes],
    // customScopesAlign: "bottom",
    // emptyScopesAlias: "empty",
    // customScopesAlias: "custom",
    allowBreakingChanges: ["feat", "fix"],
    skipQuestions: ["scope", "body", "footer"]
  }
};
