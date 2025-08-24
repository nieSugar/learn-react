import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Home from './pages/Home'

// Basic Hooks
import UseContextDemo from './pages/hooks/UseContextDemo'
import UseEffectDemo from './pages/hooks/UseEffectDemo'
import UseStateDemo from './pages/hooks/UseStateDemo'

// Additional Hooks
import UseCallbackDemo from './pages/hooks/UseCallbackDemo'
import UseMemoDemo from './pages/hooks/UseMemoDemo'
import UseReducerDemo from './pages/hooks/UseReducerDemo'
import UseRefDemo from './pages/hooks/UseRefDemo'

// Advanced Hooks
import UseDebugValueDemo from './pages/hooks/UseDebugValueDemo'
import UseImperativeHandleDemo from './pages/hooks/UseImperativeHandleDemo'
import UseLayoutEffectDemo from './pages/hooks/UseLayoutEffectDemo'

// React 18 Hooks
import UseDeferredValueDemo from './pages/hooks/UseDeferredValueDemo'
import UseIdDemo from './pages/hooks/UseIdDemo'
import UseInsertionEffectDemo from './pages/hooks/UseInsertionEffectDemo'
import UseSyncExternalStoreDemo from './pages/hooks/UseSyncExternalStoreDemo'
import UseTransitionDemo from './pages/hooks/UseTransitionDemo'

// Custom Hooks
import UseDebounceDemo from './pages/hooks/UseDebounceDemo'
import UseFetchDemo from './pages/hooks/UseFetchDemo'
import UseLocalStorageDemo from './pages/hooks/UseLocalStorageDemo'
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
