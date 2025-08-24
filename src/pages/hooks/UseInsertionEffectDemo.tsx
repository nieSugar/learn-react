import React, { useInsertionEffect, useState } from 'react'
import { Card, Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseInsertionEffectDemo: React.FC = () => {
  const [count, setCount] = useState(0)

  useInsertionEffect(() => {
    console.log('useInsertionEffect executed')
  }, [count])

  return (
    <div>
      <Title level={2}>useInsertionEffect Hook</Title>
      <Paragraph>
        useInsertionEffect 主要用于CSS-in-JS库，在DOM变更前同步执行。
      </Paragraph>

      <Card title="CSS插入示例" className="demo-container">
        <div className="demo-section">
          <Text>Count: {count}</Text>
          <button onClick={() => setCount(c => c + 1)}>增加</button>
        </div>
        <Divider />
        <pre>{`useInsertionEffect(() => {
  // 插入CSS样式
  const style = document.createElement('style')
  style.textContent = '.my-class { color: red; }'
  document.head.appendChild(style)
  
  return () => {
    document.head.removeChild(style)
  }
}, [theme])`}</pre>
      </Card>
    </div>
  )
}

export default UseInsertionEffectDemo
