import React from 'react'
import { Layout, Typography, Tag } from 'antd'
import { useLocation } from 'react-router-dom'

const { Header: AntHeader } = Layout
const { Title } = Typography

const Header: React.FC = () => {
  const location = useLocation()
  
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'React Hooks 学习指南'
    
    // 根据路径获取页面标题
    const hookName = path.slice(1)
    return hookName
  }

  const getPageDescription = () => {
    const path = location.pathname
    const descriptions: Record<string, string> = {
      '/': '全面学习React 18的所有Hook用法',
      '/useState': '管理组件状态的最基础Hook',
      '/useEffect': '处理副作用操作的Hook',
      '/useContext': '共享数据的Context Hook',
      '/useReducer': '复杂状态管理的Hook',
      '/useCallback': '缓存函数的Hook',
      '/useMemo': '缓存计算结果的Hook',
      '/useRef': '访问DOM和持久化数据的Hook',
      '/useImperativeHandle': '自定义暴露给父组件的实例值',
      '/useLayoutEffect': '同步执行的Effect Hook',
      '/useDebugValue': '开发工具中显示自定义Hook标签',
      '/useId': 'React 18新增：生成唯一ID',
      '/useTransition': 'React 18新增：标记非紧急更新',
      '/useDeferredValue': 'React 18新增：延迟更新值',
      '/useSyncExternalStore': 'React 18新增：订阅外部存储',
      '/useInsertionEffect': 'React 18新增：CSS-in-JS库专用',
      '/useLocalStorage': '自定义Hook：本地存储',
      '/useFetch': '自定义Hook：数据获取',
      '/useDebounce': '自定义Hook：防抖处理',
      '/useToggle': '自定义Hook：布尔值切换'
    }
    return descriptions[path] || '学习React Hook的使用方法'
  }

  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        height: '64px'
      }}
    >
      <div>
        <Title level={3} style={{ margin: 0 }}>
          {getPageTitle()}
        </Title>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {getPageDescription()}
        </p>
      </div>
      <Tag color="blue">React 18+</Tag>
    </AntHeader>
  )
}

export default Header
