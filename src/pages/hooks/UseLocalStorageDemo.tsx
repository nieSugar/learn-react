import React, { useState } from 'react'
import { Card, Typography, Divider, Input, Button, Switch } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义useLocalStorage Hook
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

const UseLocalStorageDemo: React.FC = () => {
  const [name, setName] = useLocalStorage('user-name', '')
  const [theme, setTheme] = useLocalStorage('app-theme', 'light')
  const [settings, setSettings] = useLocalStorage('user-settings', {
    notifications: true,
    autoSave: false,
    language: 'zh'
  })

  return (
    <div>
      <Title level={2}>useLocalStorage 自定义Hook</Title>
      <Paragraph>
        自定义Hook示例：将状态同步到localStorage。
      </Paragraph>

      <Card title="本地存储示例" className="demo-container">
        <div className="demo-section">
          <div style={{ marginBottom: 16 }}>
            <Text>用户名: </Text>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入用户名"
              style={{ width: 200 }}
            />
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <Text>主题: </Text>
            <Switch
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              checkedChildren="暗色"
              unCheckedChildren="亮色"
            />
          </div>
          
          <div>
            <Text>设置: </Text>
            <pre style={{ marginTop: 8 }}>
              {JSON.stringify(settings, null, 2)}
            </pre>
            <Button 
              onClick={() => setSettings(prev => ({ 
                ...prev, 
                notifications: !prev.notifications 
              }))}
              style={{ marginTop: 8 }}
            >
              切换通知
            </Button>
          </div>
        </div>
        <Divider />
        <pre>{`const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}`}</pre>
      </Card>
    </div>
  )
}

export default UseLocalStorageDemo
