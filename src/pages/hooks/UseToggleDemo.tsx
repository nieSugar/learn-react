import React, { useState, useCallback } from 'react'
import { Card, Typography, Divider, Button, Switch } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义useToggle Hook
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return [value, { toggle, setTrue, setFalse }] as const
}

const UseToggleDemo: React.FC = () => {
  const [isVisible, visibilityActions] = useToggle(false)
  const [isEnabled, enableActions] = useToggle(true)
  const [isDark, themeActions] = useToggle(false)

  return (
    <div>
      <Title level={2}>useToggle 自定义Hook</Title>
      <Paragraph>
        自定义Hook示例：简化布尔值状态管理。
      </Paragraph>

      <Card title="开关控制示例" className="demo-container">
        <div className="demo-section">
          <div style={{ marginBottom: 16 }}>
            <Text>显示状态: {isVisible ? '显示' : '隐藏'}</Text>
            <div style={{ marginTop: 8 }}>
              <Button onClick={visibilityActions.toggle}>切换</Button>
              <Button onClick={visibilityActions.setTrue} style={{ margin: '0 8px' }}>显示</Button>
              <Button onClick={visibilityActions.setFalse}>隐藏</Button>
            </div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <Text>启用状态: </Text>
            <Switch 
              checked={isEnabled} 
              onChange={enableActions.toggle}
              style={{ marginLeft: 8 }}
            />
          </div>
          
          <div style={{ 
            padding: 16, 
            background: isDark ? '#333' : '#f9f9f9',
            color: isDark ? '#fff' : '#000',
            borderRadius: 8
          }}>
            <Text style={{ color: isDark ? '#fff' : '#000' }}>
              当前主题: {isDark ? '暗色' : '亮色'}
            </Text>
            <Button 
              onClick={themeActions.toggle}
              style={{ marginLeft: 16 }}
            >
              切换主题
            </Button>
          </div>
        </div>
        <Divider />
        <pre>{`const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return [value, { toggle, setTrue, setFalse }]
}

// 使用
const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false)`}</pre>
      </Card>
    </div>
  )
}

export default UseToggleDemo
