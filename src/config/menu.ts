import { MenuItem } from '../types'

export const menuItems: MenuItem[] = [
  {
    key: 'basic-hooks',
    label: '基础 Hooks',
    path: '/basic-hooks',
    children: [
      { key: 'useState', label: 'useState', path: '/learn-react/useState' },
      { key: 'useEffect', label: 'useEffect', path: '/learn-react/useEffect' },
      { key: 'useContext', label: 'useContext', path: '/learn-react/useContext' },
    ]
  },
  {
    key: 'additional-hooks',
    label: '附加 Hooks',
    path: '/additional-hooks',
    children: [
      { key: 'useReducer', label: 'useReducer', path: '/learn-react/useReducer' },
      { key: 'useCallback', label: 'useCallback', path: '/learn-react/useCallback' },
      { key: 'useMemo', label: 'useMemo', path: '/learn-react/useMemo' },
      { key: 'useRef', label: 'useRef', path: '/learn-react/useRef' },
    ]
  },
  {
    key: 'advanced-hooks',
    label: '高级 Hooks',
    path: '/advanced-hooks',
    children: [
      { key: 'useImperativeHandle', label: 'useImperativeHandle', path: '/learn-react/useImperativeHandle' },
      { key: 'useLayoutEffect', label: 'useLayoutEffect', path: '/learn-react/useLayoutEffect' },
      { key: 'useDebugValue', label: 'useDebugValue', path: '/learn-react/useDebugValue' },
    ]
  },
  {
    key: 'react18-hooks',
    label: 'React 18 新 Hooks',
    path: '/react18-hooks',
    children: [
      { key: 'useId', label: 'useId', path: '/learn-react/useId' },
      { key: 'useTransition', label: 'useTransition', path: '/learn-react/useTransition' },
      { key: 'useDeferredValue', label: 'useDeferredValue', path: '/learn-react/useDeferredValue' },
      { key: 'useSyncExternalStore', label: 'useSyncExternalStore', path: '/learn-react/useSyncExternalStore' },
      { key: 'useInsertionEffect', label: 'useInsertionEffect', path: '/learn-react/useInsertionEffect' },
    ]
  },
  {
    key: 'custom-hooks',
    label: '自定义 Hooks',
    path: '/custom-hooks',
    children: [
      { key: 'useLocalStorage', label: 'useLocalStorage', path: '/learn-react/useLocalStorage' },
      { key: 'useFetch', label: 'useFetch', path: '/learn-react/useFetch' },
      { key: 'useDebounce', label: 'useDebounce', path: '/learn-react/useDebounce' },
      { key: 'useToggle', label: 'useToggle', path: '/learn-react/useToggle' },
    ]
  }
]
