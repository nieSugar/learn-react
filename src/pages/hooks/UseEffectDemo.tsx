import { Badge, Button, Card, Divider, Input, Space, Switch, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const { Title, Paragraph, Text } = Typography

const UseEffectDemo: React.FC = () => {
  // 基础用法
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('')
  
  // 依赖数组示例
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [userInfo, setUserInfo] = useState('')
  
  // 清理函数示例
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  
  // 网络请求示例
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 1. 基础用法 - 每次渲染后执行
  useEffect(() => {
    console.log('组件渲染了')
  })

  // 2. 只在挂载时执行
  useEffect(() => {
    console.log('组件挂载了')
    document.title = 'useEffect Demo'
    
    return () => {
      console.log('组件将要卸载')
      document.title = 'React App'
    }
  }, []) // 空依赖数组

  // 3. 依赖特定值
  useEffect(() => {
    document.title = title || 'useEffect Demo'
  }, [title])

  // 4. 多个依赖
  useEffect(() => {
    if (name && age > 0) {
      setUserInfo(`${name}, ${age}岁`)
    } else {
      setUserInfo('')
    }
  }, [name, age])

  // 5. 清理函数 - 定时器
  useEffect(() => {
    let interval: number | null = null
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }
    
    // 清理函数
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isTimerActive])

  // 6. 网络请求
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetTimer = () => {
    setIsTimerActive(false)
    setSeconds(0)
  }

  return (
    <div>
      <Title level={2}>useEffect Hook</Title>
      <Paragraph>
        useEffect 用于处理副作用操作，如数据获取、订阅、DOM操作等。
      </Paragraph>

      {/* 基础用法 */}
      <Card title="1. 基础用法 - 文档标题同步" className="demo-container">
        <div className="demo-section">
          <Space>
            <Text>页面标题:</Text>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入标题"
            />
          </Space>
          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
            查看浏览器标签页标题变化
          </Text>
        </div>
        <Divider />
        <pre>{`useEffect(() => {
  document.title = title || 'useEffect Demo'
}, [title]) // 只在title变化时执行`}</pre>
      </Card>

      {/* 依赖数组 */}
      <Card title="2. 依赖数组 - 用户信息计算" className="demo-container">
        <div className="demo-section">
          <Space>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="姓名"
            />
            <Input 
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="年龄"
            />
          </Space>
          {userInfo && (
            <div style={{ marginTop: 16 }}>
              <Text strong>用户信息: </Text>
              <Badge status="success" text={userInfo} />
            </div>
          )}
        </div>
        <Divider />
        <pre>{`useEffect(() => {
  if (name && age > 0) {
    setUserInfo(\`\${name}, \${age}岁\`)
  }
}, [name, age]) // 依赖name和age`}</pre>
      </Card>

      {/* 清理函数 */}
      <Card title="3. 清理函数 - 定时器管理" className="demo-container">
        <div className="demo-section">
          <Space align="center">
            <Text>定时器:</Text>
            <Switch 
              checked={isTimerActive}
              onChange={setIsTimerActive}
              checkedChildren="启动"
              unCheckedChildren="停止"
            />
            <Badge count={seconds} style={{ backgroundColor: '#52c41a' }} />
            <Button onClick={resetTimer}>重置</Button>
          </Space>
        </div>
        <Divider />
        <pre>{`useEffect(() => {
  let interval = null
  
  if (isTimerActive) {
    interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }
  
  // 清理函数 - 组件卸载或依赖变化时执行
  return () => {
    if (interval) {
      clearInterval(interval)
    }
  }
}, [isTimerActive])`}</pre>
      </Card>

      {/* 网络请求 */}
      <Card title="4. 网络请求示例" className="demo-container">
        <div className="demo-section">
          <Space style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              onClick={fetchPosts}
              loading={loading}
            >
              获取文章列表
            </Button>
            <Button onClick={() => setPosts([])}>清空</Button>
          </Space>
          
          {posts.length > 0 && (
            <div>
              <Text strong>文章列表:</Text>
              {posts.map(post => (
                <div key={post.id} style={{ 
                  padding: 8, 
                  border: '1px solid #e8e8e8', 
                  margin: '8px 0',
                  borderRadius: 4
                }}>
                  <Text strong>{post.title}</Text>
                  <br />
                  <Text type="secondary">{post.body.slice(0, 100)}...</Text>
                </div>
              ))}
            </div>
          )}
        </div>
        <Divider />
        <pre>{`const fetchPosts = async () => {
  setLoading(true)
  try {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    setLoading(false)
  }
}`}</pre>
      </Card>

      {/* 渲染计数器 */}
      <Card title="5. 不同依赖数组的效果" className="demo-container">
        <div className="demo-section">
          <Space>
            <Text>点击计数:</Text>
            <Badge count={count} />
            <Button onClick={() => setCount(prev => prev + 1)}>点击</Button>
          </Space>
          <div style={{ marginTop: 16 }}>
            <Text type="secondary">打开控制台查看不同useEffect的执行情况:</Text>
            <ul style={{ marginLeft: 20, marginTop: 8 }}>
              <li>无依赖数组: 每次渲染都执行</li>
              <li>空依赖数组 []: 只在挂载时执行一次</li>
              <li>有依赖 [count]: 只在count变化时执行</li>
            </ul>
          </div>
        </div>
        <Divider />
        <pre>{`// 每次渲染都执行
useEffect(() => {
  console.log('每次渲染')
})

// 只执行一次
useEffect(() => {
  console.log('只在挂载时执行')
}, [])

// 依赖变化时执行
useEffect(() => {
  console.log('count变化了:', count)
}, [count])`}</pre>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>依赖数组：</strong>控制effect何时执行，避免无限循环</li>
          <li><strong>清理函数：</strong>防止内存泄漏，清理订阅、定时器等</li>
          <li><strong>避免在effect中直接修改依赖：</strong>可能导致无限循环</li>
          <li><strong>多个effect：</strong>按照关注点分离原则拆分不同的副作用</li>
          <li><strong>条件执行：</strong>在effect内部使用条件判断，而不是条件性调用useEffect</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseEffectDemo
