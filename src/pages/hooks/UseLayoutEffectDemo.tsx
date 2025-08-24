import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { Card, Typography, Divider, Button } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseLayoutEffectDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('useLayoutEffect: 同步执行')
    if (divRef.current) {
      divRef.current.style.backgroundColor = count % 2 === 0 ? 'lightblue' : 'lightgreen'
    }
  }, [count])

  useEffect(() => {
    console.log('useEffect: 异步执行')
  }, [count])

  return (
    <div>
      <Title level={2}>useLayoutEffect Hook</Title>
      <Paragraph>
        useLayoutEffect 在DOM变更后同步执行，避免视觉闪烁。
      </Paragraph>

      <Card title="同步DOM更新示例" className="demo-container">
        <div className="demo-section">
          <div ref={divRef} style={{ padding: 20, border: '1px solid #ccc' }}>
            <Text>Count: {count}</Text>
          </div>
          <Button onClick={() => setCount(c => c + 1)} style={{ marginTop: 16 }}>
            增加计数
          </Button>
        </div>
        <Divider />
        <pre>{`useLayoutEffect(() => {
  // 同步执行，在浏览器绘制前
  if (divRef.current) {
    divRef.current.style.backgroundColor = 
      count % 2 === 0 ? 'lightblue' : 'lightgreen'
  }
}, [count])`}</pre>
      </Card>
    </div>
  )
}

export default UseLayoutEffectDemo
