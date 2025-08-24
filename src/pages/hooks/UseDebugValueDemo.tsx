import React, { useDebugValue, useState } from 'react'
import { Card, Typography, Divider, Button } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义Hook
const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue)
  
  useDebugValue(count > 10 ? '高值' : '低值')
  
  return {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
    reset: () => setCount(initialValue)
  }
}

const UseDebugValueDemo: React.FC = () => {
  const counter = useCounter(0)

  return (
    <div>
      <Title level={2}>useDebugValue Hook</Title>
      <Paragraph>
        useDebugValue 在React开发者工具中显示自定义Hook的标签。
      </Paragraph>

      <Card title="自定义Hook调试示例" className="demo-container">
        <div className="demo-section">
          <Text>计数: {counter.count}</Text>
          <div style={{ marginTop: 16 }}>
            <Button onClick={counter.increment}>+</Button>
            <Button onClick={counter.decrement} style={{ margin: '0 8px' }}>-</Button>
            <Button onClick={counter.reset}>重置</Button>
          </div>
          <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
            打开React开发者工具查看自定义Hook的调试信息
          </Text>
        </div>
        <Divider />
        <pre>{`const useCounter = (initialValue) => {
  const [count, setCount] = useState(initialValue)
  
  // 在开发者工具中显示调试信息
  useDebugValue(count > 10 ? '高值' : '低值')
  
  return { count, increment, decrement, reset }
}`}</pre>
      </Card>
    </div>
  )
}

export default UseDebugValueDemo
