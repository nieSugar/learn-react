import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Home from './pages/Home'

// Basic Hooks
import UseStateDemo from './pages/hooks/UseStateDemo'
import UseEffectDemo from './pages/hooks/UseEffectDemo'
import UseContextDemo from './pages/hooks/UseContextDemo'

// Additional Hooks
import UseReducerDemo from './pages/hooks/UseReducerDemo'
import UseCallbackDemo from './pages/hooks/UseCallbackDemo'
import UseMemoDemo from './pages/hooks/UseMemoDemo'
import UseRefDemo from './pages/hooks/UseRefDemo'

// Advanced Hooks
import UseImperativeHandleDemo from './pages/hooks/UseImperativeHandleDemo'
import UseLayoutEffectDemo from './pages/hooks/UseLayoutEffectDemo'
import UseDebugValueDemo from './pages/hooks/UseDebugValueDemo'

// React 18 Hooks
import UseIdDemo from './pages/hooks/UseIdDemo'
import UseTransitionDemo from './pages/hooks/UseTransitionDemo'
import UseDeferredValueDemo from './pages/hooks/UseDeferredValueDemo'
import UseSyncExternalStoreDemo from './pages/hooks/UseSyncExternalStoreDemo'
import UseInsertionEffectDemo from './pages/hooks/UseInsertionEffectDemo'

// Custom Hooks
import UseLocalStorageDemo from './pages/hooks/UseLocalStorageDemo'
import UseFetchDemo from './pages/hooks/UseFetchDemo'
import UseDebounceDemo from './pages/hooks/UseDebounceDemo'
import UseToggleDemo from './pages/hooks/UseToggleDemo'

const { Content } = Layout

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ 
        marginLeft: 250, // 为固定侧边栏留出空间
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header />
        <Content style={{ 
          padding: '24px', 
          background: '#f5f5f5',
          flex: 1,
          overflow: 'auto',
          height: 'calc(100vh - 64px)' // 减去Header高度
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Basic Hooks */}
            <Route path="/useState" element={<UseStateDemo />} />
            <Route path="/useEffect" element={<UseEffectDemo />} />
            <Route path="/useContext" element={<UseContextDemo />} />
            
            {/* Additional Hooks */}
            <Route path="/useReducer" element={<UseReducerDemo />} />
            <Route path="/useCallback" element={<UseCallbackDemo />} />
            <Route path="/useMemo" element={<UseMemoDemo />} />
            <Route path="/useRef" element={<UseRefDemo />} />
            
            {/* Advanced Hooks */}
            <Route path="/useImperativeHandle" element={<UseImperativeHandleDemo />} />
            <Route path="/useLayoutEffect" element={<UseLayoutEffectDemo />} />
            <Route path="/useDebugValue" element={<UseDebugValueDemo />} />
            
            {/* React 18 Hooks */}
            <Route path="/useId" element={<UseIdDemo />} />
            <Route path="/useTransition" element={<UseTransitionDemo />} />
            <Route path="/useDeferredValue" element={<UseDeferredValueDemo />} />
            <Route path="/useSyncExternalStore" element={<UseSyncExternalStoreDemo />} />
            <Route path="/useInsertionEffect" element={<UseInsertionEffectDemo />} />
            
            {/* Custom Hooks */}
            <Route path="/useLocalStorage" element={<UseLocalStorageDemo />} />
            <Route path="/useFetch" element={<UseFetchDemo />} />
            <Route path="/useDebounce" element={<UseDebounceDemo />} />
            <Route path="/useToggle" element={<UseToggleDemo />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
