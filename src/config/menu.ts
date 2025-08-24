import { MenuItem } from '../types'

export const menuItems: MenuItem[] = [
  {
    key: 'basic-hooks',
    label: '基础 Hooks',
    path: '/basic-hooks',
    children: [
      { key: 'useState', label: 'useState', path: '/useState' },
      { key: 'useEffect', label: 'useEffect', path: '/useEffect' },
      { key: 'useContext', label: 'useContext', path: '/useContext' },
    ]
  },
  {
    key: 'additional-hooks',
    label: '附加 Hooks',
    path: '/additional-hooks',
    children: [
      { key: 'useReducer', label: 'useReducer', path: '/useReducer' },
      { key: 'useCallback', label: 'useCallback', path: '/useCallback' },
      { key: 'useMemo', label: 'useMemo', path: '/useMemo' },
      { key: 'useRef', label: 'useRef', path: '/useRef' },
    ]
  },
  {
    key: 'advanced-hooks',
    label: '高级 Hooks',
    path: '/advanced-hooks',
    children: [
      { key: 'useImperativeHandle', label: 'useImperativeHandle', path: '/useImperativeHandle' },
      { key: 'useLayoutEffect', label: 'useLayoutEffect', path: '/useLayoutEffect' },
      { key: 'useDebugValue', label: 'useDebugValue', path: '/useDebugValue' },
    ]
  },
  {
    key: 'react18-hooks',
    label: 'React 18 新 Hooks',
    path: '/react18-hooks',
    children: [
      { key: 'useId', label: 'useId', path: '/useId' },
      { key: 'useTransition', label: 'useTransition', path: '/useTransition' },
      { key: 'useDeferredValue', label: 'useDeferredValue', path: '/useDeferredValue' },
      { key: 'useSyncExternalStore', label: 'useSyncExternalStore', path: '/useSyncExternalStore' },
      { key: 'useInsertionEffect', label: 'useInsertionEffect', path: '/useInsertionEffect' },
    ]
  },
  {
    key: 'custom-hooks',
    label: '自定义 Hooks',
    path: '/custom-hooks',
    children: [
      { key: 'useLocalStorage', label: 'useLocalStorage', path: '/useLocalStorage' },
      { key: 'useFetch', label: 'useFetch', path: '/useFetch' },
      { key: 'useDebounce', label: 'useDebounce', path: '/useDebounce' },
      { key: 'useToggle', label: 'useToggle', path: '/useToggle' },
    ]
  }
]
