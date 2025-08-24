import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Input, Space, Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const UseRefDemo: React.FC = () => {
  // 1. DOM引用
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  
  // 2. 存储可变值
  const countRef = useRef(0)
  const [count, setCount] = useState(0)
  
  // 3. 存储前一个值
  const [name, setName] = useState('张三')
  const prevNameRef = useRef<string>()
  
  useEffect(() => {
    prevNameRef.current = name
  })
  
  // 4. 定时器引用
  const intervalRef = useRef<NodeJS.Timeout>()
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const scrollToDiv = () => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const incrementRef = () => {
    countRef.current += 1
    console.log('Ref count:', countRef.current)
  }

  const incrementState = () => {
    setCount(prev => prev + 1)
  }

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }
  }

  const stopTimer = () => {
    if (isRunning && intervalRef.current) {
      setIsRunning(false)
      clearInterval(intervalRef.current)
    }
  }

  const resetTimer = () => {
    stopTimer()
    setSeconds(0)
  }

  return (
    <div>
      <Title level={2}>useRef Hook</Title>
      <Paragraph>
        useRef 用于访问DOM元素和存储不触发重新渲染的可变值。
      </Paragraph>

      {/* DOM引用 */}
      <Card title="1. DOM元素引用" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Input ref={inputRef} placeholder="点击下面按钮聚焦此输入框" />
              <Button onClick={focusInput} style={{ marginLeft: 8 }}>
                聚焦输入框
              </Button>
            </div>
            
            <Button onClick={scrollToDiv}>
              滚动到下面的div
            </Button>
          </Space>
        </div>
        <Divider />
        <pre>{`const inputRef = useRef(null)

const focusInput = () => {
  inputRef.current?.focus()
}

return (
  <>
    <input ref={inputRef} />
    <button onClick={focusInput}>聚焦</button>
  </>
)`}</pre>
      </Card>

      {/* 存储可变值 */}
      <Card title="2. 存储可变值（不触发渲染）" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical">
            <div>
              <Text strong>Ref计数: </Text>
              <Text>{countRef.current}</Text>
              <Button onClick={incrementRef} style={{ marginLeft: 8 }}>
                增加Ref计数
              </Button>
            </div>
            
            <div>
              <Text strong>State计数: </Text>
              <Text>{count}</Text>
              <Button onClick={incrementState} style={{ marginLeft: 8 }}>
                增加State计数
              </Button>
            </div>
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              Ref计数更新不会触发组件重新渲染，页面上的值不会自动更新
            </Text>
          </Space>
        </div>
        <Divider />
        <pre>{`const countRef = useRef(0)
const [count, setCount] = useState(0)

const incrementRef = () => {
  countRef.current += 1  // 不触发重新渲染
  console.log('Ref count:', countRef.current)
}

const incrementState = () => {
  setCount(prev => prev + 1)  // 触发重新渲染
}`}</pre>
      </Card>

      {/* 存储前一个值 */}
      <Card title="3. 存储前一个值" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>当前姓名: </Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: 200 }}
              />
            </div>
            
            <div>
              <Text strong>前一个姓名: </Text>
              <Text>{prevNameRef.current || '无'}</Text>
            </div>
          </Space>
        </div>
        <Divider />
        <pre>{`const [name, setName] = useState('张三')
const prevNameRef = useRef()

useEffect(() => {
  prevNameRef.current = name
})

// prevNameRef.current 总是包含前一次渲染的name值`}</pre>
      </Card>

      {/* 定时器引用 */}
      <Card title="4. 定时器引用管理" className="demo-container">
        <div className="demo-section">
          <Space>
            <Text strong>计时器: {seconds}秒</Text>
            <Button 
              type="primary" 
              onClick={startTimer}
              disabled={isRunning}
            >
              开始
            </Button>
            <Button 
              onClick={stopTimer}
              disabled={!isRunning}
            >
              停止
            </Button>
            <Button onClick={resetTimer}>重置</Button>
          </Space>
        </div>
        <Divider />
        <pre>{`const intervalRef = useRef()
const [seconds, setSeconds] = useState(0)

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    setSeconds(prev => prev + 1)
  }, 1000)
}

const stopTimer = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
  }
}`}</pre>
      </Card>

      {/* 滚动目标 */}
      <div 
        ref={divRef}
        style={{ 
          height: 200, 
          background: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '20px 0',
          borderRadius: 8
        }}
      >
        <Text>这是滚动目标div</Text>
      </div>

      <Card title="useRef vs useState" style={{ marginTop: 16, background: '#e6f7ff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text strong>useRef:</Text>
            <ul>
              <li>不触发重新渲染</li>
              <li>直接访问DOM</li>
              <li>存储可变值</li>
              <li>在渲染间保持引用</li>
              <li>同步更新</li>
            </ul>
          </div>
          <div>
            <Text strong>useState:</Text>
            <ul>
              <li>触发重新渲染</li>
              <li>管理组件状态</li>
              <li>不可变更新</li>
              <li>异步更新</li>
              <li>值变化驱动UI</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>不要在渲染中读写current：</strong>可能导致不一致的行为</li>
          <li><strong>DOM操作：</strong>主要用于聚焦、滚动、测量等命令式操作</li>
          <li><strong>存储引用：</strong>定时器、订阅、DOM节点等需要在渲染间保持的引用</li>
          <li><strong>前一个值：</strong>结合useEffect存储props或state的前一个值</li>
          <li><strong>性能优化：</strong>避免在依赖数组中使用ref.current</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseRefDemo
