# React Hooks 学习指南

一个完整的React 18+ Hook学习项目，采用Vite + React + TypeScript + Ant Design架构。

## 功能特性

- 🚀 **Vite构建** - 快速的开发体验
- ⚛️ **React 18+** - 最新的React特性
- 📘 **TypeScript** - 类型安全
- 🎨 **Ant Design** - 美观的UI组件
- 🧭 **React Router** - 单页面路由
- 📚 **全面覆盖** - 所有React Hook用法

## Hook覆盖范围

### 基础 Hooks
- **useState** - 状态管理
- **useEffect** - 副作用处理  
- **useContext** - 上下文共享

### 附加 Hooks
- **useReducer** - 复杂状态管理
- **useCallback** - 函数缓存
- **useMemo** - 值缓存
- **useRef** - DOM引用和值存储

### 高级 Hooks
- **useImperativeHandle** - 自定义暴露的实例值
- **useLayoutEffect** - 同步副作用
- **useDebugValue** - 调试信息

### React 18 新 Hooks
- **useId** - 唯一ID生成
- **useTransition** - 非紧急更新
- **useDeferredValue** - 延迟值更新
- **useSyncExternalStore** - 外部存储订阅
- **useInsertionEffect** - CSS-in-JS专用

### 自定义 Hooks
- **useLocalStorage** - 本地存储
- **useFetch** - 数据获取
- **useDebounce** - 防抖处理
- **useToggle** - 布尔值切换

## 快速开始

### 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 启动开发服务器

\`\`\`bash
pnpm dev
\`\`\`

项目将在 http://localhost:3000 启动

### 构建生产版本

\`\`\`bash
pnpm build
\`\`\`

### 预览生产版本

\`\`\`bash
pnpm preview
\`\`\`

> **注意**: 本项目使用 pnpm 作为包管理器，请确保已安装 pnpm。如果没有安装，可以运行 \`npm install -g pnpm\`

## 项目结构

\`\`\`
src/
├── components/          # 组件
│   └── Layout/         # 布局组件
├── pages/              # 页面
│   ├── Home.tsx        # 首页
│   └── hooks/          # Hook示例页面
├── config/             # 配置
│   └── menu.ts         # 菜单配置
├── types/              # 类型定义
└── App.tsx             # 主应用
\`\`\`

## 学习建议

1. **循序渐进** - 从基础Hook开始学习
2. **实践为主** - 每个Hook都有多个实际示例
3. **查看源码** - 理解Hook的实现原理
4. **组合使用** - 学习不同Hook的搭配技巧

## 技术栈

- [React 18](https://reactjs.org/) - UI框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Vite](https://vitejs.dev/) - 构建工具
- [Ant Design](https://ant.design/) - UI组件库
- [React Router](https://reactrouter.com/) - 路由管理

## 特色功能

- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🎯 **交互式示例** - 每个Hook都有可操作的演示
- 📝 **详细注释** - 代码中包含详细的使用说明
- 🔍 **控制台调试** - 关键操作会在控制台输出日志
- 🎨 **美观界面** - 使用Ant Design提供优秀的用户体验

## 浏览器支持

- Chrome >= 87
- Firefox >= 78  
- Safari >= 14
- Edge >= 88

现代浏览器支持ES2020+特性。

## 开发指南

### 添加新的Hook示例

1. 在 \`src/pages/hooks/\` 创建新的组件文件
2. 在 \`src/config/menu.ts\` 添加菜单项
3. 在 \`src/App.tsx\` 添加路由

### 自定义样式

项目使用Ant Design主题和全局CSS样式，可以通过修改 \`src/index.css\` 来自定义样式。

## 贡献

欢迎提交Issue和Pull Request来改进这个学习项目！

## 许可证

MIT License
