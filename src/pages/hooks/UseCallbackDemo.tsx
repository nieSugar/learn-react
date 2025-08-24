import React, { useState, useCallback, memo } from 'react'
import { Card, Button, Input, Space, Typography, Divider, List, Checkbox } from 'antd'

const { Title, Paragraph, Text } = Typography

// 子组件 - 使用memo优化
const ExpensiveChild = memo<{ 
  onIncrement: () => void
  count: number 
}>((props) => {
  console.log('ExpensiveChild 重新渲染')
  
  return (
    <div style={{ 
      padding: 16, 
      border: '1px solid #d9d9d9', 
      borderRadius: 8,
      background: '#f9f9f9'
    }}>
      <Text>子组件计数: {props.count}</Text>
      <br />
      <Button 
        type="primary" 
        onClick={props.onIncrement}
        style={{ marginTop: 8 }}
      >
        增加计数
      </Button>
      <br />
      <Text type="secondary" style={{ fontSize: 12 }}>
        查看控制台的重渲染日志
      </Text>
    </div>
  )
})

ExpensiveChild.displayName = 'ExpensiveChild'

// Todo项组件
const TodoItem = memo<{
  todo: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}>((props) => {
  console.log(`TodoItem ${props.todo.id} 重新渲染`)
  
  return (
    <List.Item
      actions={[
        <Checkbox
          key="toggle"
          checked={props.todo.completed}
          onChange={() => props.onToggle(props.todo.id)}
        />,
        <Button
          key="delete"
          size="small"
          danger
          onClick={() => props.onDelete(props.todo.id)}
        >
          删除
        </Button>
      ]}
    >
      <Text delete={props.todo.completed}>
        {props.todo.text}
      </Text>
    </List.Item>
  )
})

TodoItem.displayName = 'TodoItem'

// 搜索结果组件
const SearchResults = memo<{
  items: string[]
  onItemClick: (item: string) => void
}>((props) => {
  console.log('SearchResults 重新渲染')
  
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: 8, 
      padding: 16,
      maxHeight: 200,
      overflowY: 'auto'
    }}>
      {props.items.length === 0 ? (
        <Text type="secondary">没有搜索结果</Text>
      ) : (
        props.items.map((item, index) => (
          <div
            key={index}
            style={{ 
              padding: 8, 
              cursor: 'pointer',
              borderBottom: '1px solid #f0f0f0'
            }}
            onClick={() => props.onItemClick(item)}
          >
            {item}
          </div>
        ))
      )}
    </div>
  )
})

SearchResults.displayName = 'SearchResults'

const UseCallbackDemo: React.FC = () => {
  // 1. 基础示例 - 防止子组件不必要的重渲染
  const [parentCount, setParentCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  
  // 没有使用useCallback的版本
  const incrementChildBad = () => {
    setChildCount(prev => prev + 1)
  }
  
  // 使用useCallback的版本
  const incrementChildGood = useCallback(() => {
    setChildCount(prev => prev + 1)
  }, [])

  // 2. Todo列表示例
  const [todos, setTodos] = useState([
    { id: 1, text: '学习useCallback', completed: false },
    { id: 2, text: '理解memoization', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')

  const handleToggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }, [newTodo])

  // 3. 搜索示例 - 依赖项变化
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  
  const mockData = [
    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 
    'Nuxt.js', 'Gatsby', 'Redux', 'MobX', 'Zustand'
  ]

  const filteredItems = mockData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item)
    setSearchTerm('')
  }, [])

  // 4. 复杂计算示例
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5])
  const [multiplier, setMultiplier] = useState(1)
  
  const expensiveCalculation = useCallback((nums: number[], mult: number) => {
    console.log('执行昂贵的计算...')
    // 模拟复杂计算
    return nums.map(num => num * mult).reduce((sum, num) => sum + num, 0)
  }, [])

  const calculatedResult = expensiveCalculation(numbers, multiplier)

  return (
    <div>
      <Title level={2}>useCallback Hook</Title>
      <Paragraph>
        useCallback 用于缓存函数，避免在每次渲染时创建新的函数实例，优化性能。
      </Paragraph>

      {/* 基础示例 */}
      <Card title="1. 防止子组件不必要重渲染" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>父组件计数: {parentCount}</Text>
              <Button 
                onClick={() => setParentCount(prev => prev + 1)}
                style={{ marginLeft: 16 }}
              >
                增加父计数
              </Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <Text strong style={{ color: '#ff4d4f' }}>❌ 未使用useCallback</Text>
                <ExpensiveChild 
                  count={childCount} 
                  onIncrement={incrementChildBad}
                />
              </div>
              
              <div>
                <Text strong style={{ color: '#52c41a' }}>✅ 使用useCallback</Text>
                <ExpensiveChild 
                  count={childCount} 
                  onIncrement={incrementChildGood}
                />
              </div>
            </div>
          </Space>
        </div>
        <Divider />
        <pre>{`// ❌ 每次渲染都创建新函数
const incrementChild = () => {
  setChildCount(prev => prev + 1)
}

// ✅ 缓存函数，只创建一次
const incrementChild = useCallback(() => {
  setChildCount(prev => prev + 1)
}, []) // 空依赖数组，函数永远不变

// 子组件使用React.memo优化
const ExpensiveChild = memo(({ onIncrement, count }) => {
  return <button onClick={onIncrement}>Count: {count}</button>
})`}</pre>
      </Card>

      {/* Todo列表示例 */}
      <Card title="2. Todo列表 - 列表项优化" className="demo-container">
        <div className="demo-section">
          <Space style={{ marginBottom: 16 }}>
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新任务"
              onPressEnter={handleAddTodo}
            />
            <Button type="primary" onClick={handleAddTodo}>
              添加
            </Button>
          </Space>
          
          <List
            dataSource={todos}
            renderItem={(todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            )}
          />
          
          <Text type="secondary" style={{ fontSize: 12 }}>
            查看控制台，只有操作的TodoItem会重新渲染
          </Text>
        </div>
        <Divider />
        <pre>{`const handleToggleTodo = useCallback((id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}, []) // 不依赖任何外部变量

const handleDeleteTodo = useCallback((id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id))
}, [])

// 每个TodoItem只有在自己的数据变化时才重新渲染
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </div>
  )
})`}</pre>
      </Card>

      {/* 搜索示例 */}
      <Card title="3. 搜索功能 - 依赖项变化" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索框架..."
            />
            
            {searchTerm && (
              <SearchResults 
                items={filteredItems}
                onItemClick={handleItemClick}
              />
            )}
            
            {selectedItem && (
              <div style={{ marginTop: 16 }}>
                <Text strong>已选择: </Text>
                <Text>{selectedItem}</Text>
              </div>
            )}
          </Space>
        </div>
        <Divider />
        <pre>{`const handleItemClick = useCallback((item) => {
  setSelectedItem(item)
  setSearchTerm('')
}, []) // 不依赖外部变量

// 如果依赖searchTerm，需要添加到依赖数组
const handleItemClickWithDep = useCallback((item) => {
  setSelectedItem(\`\${item} (搜索词: \${searchTerm})\`)
  setSearchTerm('')
}, [searchTerm]) // 依赖searchTerm`}</pre>
      </Card>

      {/* 复杂计算示例 */}
      <Card title="4. 复杂计算函数缓存" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>数组: </Text>
              <Text>[{numbers.join(', ')}]</Text>
              <Button 
                style={{ marginLeft: 16 }}
                onClick={() => setNumbers(prev => [...prev, prev.length + 1])}
              >
                添加数字
              </Button>
            </div>
            
            <div>
              <Text strong>乘数: </Text>
              <Input
                type="number"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                style={{ width: 120 }}
              />
            </div>
            
            <div>
              <Text strong>计算结果: </Text>
              <Text style={{ fontSize: 18, color: '#1890ff' }}>
                {calculatedResult}
              </Text>
            </div>
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              查看控制台，只有在依赖变化时才重新计算
            </Text>
          </Space>
        </div>
        <Divider />
        <pre>{`const expensiveCalculation = useCallback((nums, mult) => {
  console.log('执行昂贵的计算...')
  return nums.map(num => num * mult).reduce((sum, num) => sum + num, 0)
}, []) // 函数本身不依赖外部变量

// 在render中调用
const result = expensiveCalculation(numbers, multiplier)

// 注意：这种情况下useMemo可能更合适
const result = useMemo(() => {
  return expensiveCalculation(numbers, multiplier)
}, [numbers, multiplier, expensiveCalculation])`}</pre>
      </Card>

      <Card title="useCallback vs useMemo" style={{ marginTop: 16, background: '#e6f7ff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text strong>useCallback:</Text>
            <ul>
              <li>缓存函数本身</li>
              <li>防止函数重新创建</li>
              <li>优化子组件渲染</li>
              <li>返回memoized函数</li>
            </ul>
            <pre>{`useCallback(() => {
  doSomething()
}, [dep])`}</pre>
          </div>
          <div>
            <Text strong>useMemo:</Text>
            <ul>
              <li>缓存计算结果</li>
              <li>防止重复计算</li>
              <li>优化昂贵的操作</li>
              <li>返回memoized值</li>
            </ul>
            <pre>{`useMemo(() => {
  return expensiveCalculation()
}, [dep])`}</pre>
          </div>
        </div>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>配合React.memo：</strong>只有在子组件使用memo时，useCallback才有优化效果</li>
          <li><strong>依赖数组：</strong>正确设置依赖项，遗漏依赖可能导致闭包问题</li>
          <li><strong>不要过度使用：</strong>每个useCallback本身也有成本，简单场景下不必使用</li>
          <li><strong>引用稳定性：</strong>主要用于保持引用稳定，而不是性能优化</li>
          <li><strong>函数内部逻辑：</strong>如果函数内部使用了state或props，需要添加到依赖数组</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseCallbackDemo
