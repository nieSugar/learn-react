import React, { useState, useTransition } from 'react'
import { Card, Input, List, Typography, Divider, Spin } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseTransitionDemo: React.FC = () => {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const generateLargeList = (searchTerm: string) => {
    const items = []
    for (let i = 0; i < 10000; i++) {
      items.push(`${searchTerm} - 项目 ${i + 1}`)
    }
    return items
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    startTransition(() => {
      const newList = generateLargeList(value)
      setList(newList)
    })
  }

  return (
    <div>
      <Title level={2}>useTransition Hook</Title>
      <Paragraph>
        useTransition 用于标记状态更新为非紧急更新，避免阻塞用户交互。
      </Paragraph>

      <Card title="大列表搜索示例" className="demo-container">
        <div className="demo-section">
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="输入搜索内容"
            suffix={isPending ? <Spin size="small" /> : null}
          />
          
          <div style={{ marginTop: 16 }}>
            <Text>找到 {list.length} 个结果</Text>
            {isPending && <Text type="secondary"> (正在搜索...)</Text>}
          </div>
          
          <List
            style={{ marginTop: 16, maxHeight: 300, overflow: 'auto' }}
            dataSource={list.slice(0, 20)}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
        <Divider />
        <pre>{`const [isPending, startTransition] = useTransition()

const handleSearch = (value) => {
  setQuery(value) // 紧急更新，立即执行
  startTransition(() => {
    // 非紧急更新，可以被打断
    const newList = generateLargeList(value)
    setList(newList)
  })
}`}</pre>
      </Card>
    </div>
  )
}

export default UseTransitionDemo
