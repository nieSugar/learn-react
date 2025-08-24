import React, { useState } from 'react'
import { Card, Button, Input, Space, Typography, Divider, Badge } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseStateDemo: React.FC = () => {
  // 基础用法：简单值
  const [count, setCount] = useState(0)
  
  // 对象状态
  const [user, setUser] = useState({ name: '张三', age: 25 })
  
  // 数组状态
  const [items, setItems] = useState(['苹果', '香蕉'])
  const [newItem, setNewItem] = useState('')
  
  // 函数式更新
  const [counter, setCounter] = useState(0)
  
  // 惰性初始状态
  const [expensiveValue] = useState(() => {
    console.log('惰性初始化执行')
    return Math.random() * 1000
  })

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Title level={2}>useState Hook</Title>
      <Paragraph>
        useState 是 React 中最基础的 Hook，用于在函数组件中添加状态。
      </Paragraph>

      {/* 基础用法 */}
      <Card title="1. 基础用法 - 简单值状态" className="demo-container">
        <div className="demo-section">
          <Text strong>当前计数: </Text>
          <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
          <br />
          <Space style={{ marginTop: 16 }}>
            <Button onClick={() => setCount(count - 1)}>-1</Button>
            <Button onClick={() => setCount(count + 1)}>+1</Button>
            <Button onClick={() => setCount(0)}>重置</Button>
          </Space>
        </div>
        <Divider />
        <pre>{`const [count, setCount] = useState(0)

// 直接设置新值
setCount(count + 1)
setCount(0)`}</pre>
      </Card>

      {/* 对象状态 */}
      <Card title="2. 对象状态管理" className="demo-container">
        <div className="demo-section">
          <Text strong>用户信息: </Text>
          <Text>{user.name}, {user.age}岁</Text>
          <br />
          <Space style={{ marginTop: 16 }}>
            <Input
              placeholder="姓名"
              value={user.name}
              onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="年龄"
              value={user.age}
              onChange={(e) => setUser(prev => ({ ...prev, age: Number(e.target.value) }))}
            />
          </Space>
        </div>
        <Divider />
        <pre>{`const [user, setUser] = useState({ name: '张三', age: 25 })

// 更新对象状态 - 需要展开操作符
setUser(prev => ({ ...prev, name: newName }))
setUser(prev => ({ ...prev, age: newAge }))`}</pre>
      </Card>

      {/* 数组状态 */}
      <Card title="3. 数组状态管理" className="demo-container">
        <div className="demo-section">
          <Text strong>水果列表: </Text>
          <div style={{ margin: '8px 0' }}>
            {items.map((item, index) => (
              <Badge 
                key={index} 
                count="×" 
                style={{ cursor: 'pointer' }}
                onClick={() => removeItem(index)}
              >
                <Button style={{ margin: 4 }}>{item}</Button>
              </Badge>
            ))}
          </div>
          <Space>
            <Input
              placeholder="添加新水果"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onPressEnter={addItem}
            />
            <Button type="primary" onClick={addItem}>添加</Button>
          </Space>
        </div>
        <Divider />
        <pre>{`const [items, setItems] = useState(['苹果', '香蕉'])

// 添加元素
setItems(prev => [...prev, newItem])

// 删除元素
setItems(prev => prev.filter((_, i) => i !== index))`}</pre>
      </Card>

      {/* 函数式更新 */}
      <Card title="4. 函数式更新" className="demo-container">
        <div className="demo-section">
          <Text strong>计数器: </Text>
          <Badge count={counter} />
          <br />
          <Space style={{ marginTop: 16 }}>
            <Button onClick={() => setCounter(prev => prev + 1)}>
              函数式 +1
            </Button>
            <Button onClick={() => setCounter(prev => prev * 2)}>
              函数式 ×2
            </Button>
            <Button onClick={() => setCounter(0)}>重置</Button>
          </Space>
        </div>
        <Divider />
        <pre>{`// 函数式更新 - 推荐方式
setCounter(prev => prev + 1)
setCounter(prev => prev * 2)

// 优势：避免闭包陷阱，确保获取最新状态`}</pre>
      </Card>

      {/* 惰性初始状态 */}
      <Card title="5. 惰性初始状态" className="demo-container">
        <div className="demo-section">
          <Text strong>昂贵计算的结果: </Text>
          <Text>{expensiveValue.toFixed(2)}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            查看控制台，惰性初始化只执行一次
          </Text>
        </div>
        <Divider />
        <pre>{`// 惰性初始状态 - 传入函数而不是值
const [expensiveValue] = useState(() => {
  console.log('惰性初始化执行')
  return expensiveCalculation()
})

// 优势：昂贵的初始化操作只执行一次`}</pre>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>状态更新是异步的：</strong>React会批量处理状态更新</li>
          <li><strong>对象和数组需要新引用：</strong>使用展开操作符创建新对象/数组</li>
          <li><strong>函数式更新：</strong>需要基于前一个状态计算新状态时使用</li>
          <li><strong>惰性初始化：</strong>初始状态需要昂贵计算时使用函数</li>
          <li><strong>状态不会合并：</strong>与class组件不同，函数组件状态完全替换</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseStateDemo
