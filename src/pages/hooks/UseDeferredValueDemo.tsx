import React, { useState, useDeferredValue, useMemo } from 'react'
import { Card, Input, Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseDeferredValueDemo: React.FC = () => {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)

  const expensiveList = useMemo(() => {
    const items = []
    for (let i = 0; i < 5000; i++) {
      items.push(`${deferredInput} - 项目 ${i + 1}`)
    }
    return items
  }, [deferredInput])

  return (
    <div>
      <Title level={2}>useDeferredValue Hook</Title>
      <Paragraph>
        useDeferredValue 用于延迟更新值，减少不必要的重新渲染。
      </Paragraph>

      <Card title="延迟搜索示例" className="demo-container">
        <div className="demo-section">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入搜索内容"
          />
          
          <div style={{ marginTop: 16 }}>
            <Text>当前输入: {input}</Text>
            <br />
            <Text>延迟值: {deferredInput}</Text>
            <br />
            <Text>生成项目: {expensiveList.length}个</Text>
          </div>
        </div>
        <Divider />
        <pre>{`const [input, setInput] = useState('')
const deferredInput = useDeferredValue(input)

// 昂贵的计算使用延迟值
const expensiveList = useMemo(() => {
  return generateLargeList(deferredInput)
}, [deferredInput])`}</pre>
      </Card>
    </div>
  )
}

export default UseDeferredValueDemo
