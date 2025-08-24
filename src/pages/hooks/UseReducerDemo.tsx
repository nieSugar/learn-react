import React, { useReducer, useState } from 'react'
import { Card, Button, Input, Space, Typography, Divider, Tag, List } from 'antd'
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

// 1. 简单计数器reducer
interface CounterState {
  count: number
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      throw new Error(`未知的action类型`)
  }
}

// 2. Todo应用reducer
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    default:
      return state
  }
}

// 3. 表单reducer
interface FormState {
  name: string
  email: string
  age: number
  errors: {
    name?: string
    email?: string
    age?: string
  }
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: any }
  | { type: 'SET_ERROR'; field: keyof FormState['errors']; error: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' }

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      }
    case 'RESET_FORM':
      return {
        name: '',
        email: '',
        age: 0,
        errors: {}
      }
    default:
      return state
  }
}

const UseReducerDemo: React.FC = () => {
  // 1. 简单计数器
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 })
  const [inputValue, setInputValue] = useState('')

  // 2. Todo应用
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: '学习useReducer', completed: false },
      { id: 2, text: '完成示例代码', completed: true }
    ],
    filter: 'all'
  })
  const [newTodo, setNewTodo] = useState('')

  // 3. 表单管理
  const [formState, formDispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: 0,
    errors: {}
  })

  const handleCounterSet = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      counterDispatch({ type: 'set', payload: value })
      setInputValue('')
    }
  }

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      todoDispatch({ type: 'ADD_TODO', payload: newTodo.trim() })
      setNewTodo('')
    }
  }

  const handleFormSubmit = () => {
    // 简单验证
    formDispatch({ type: 'CLEAR_ERRORS' })
    
    if (!formState.name) {
      formDispatch({ type: 'SET_ERROR', field: 'name', error: '姓名不能为空' })
      return
    }
    
    if (!formState.email.includes('@')) {
      formDispatch({ type: 'SET_ERROR', field: 'email', error: '邮箱格式不正确' })
      return
    }
    
    if (formState.age < 0 || formState.age > 120) {
      formDispatch({ type: 'SET_ERROR', field: 'age', error: '年龄必须在0-120之间' })
      return
    }
    
    alert('表单提交成功!')
  }

  const getFilteredTodos = () => {
    switch (todoState.filter) {
      case 'active':
        return todoState.todos.filter(todo => !todo.completed)
      case 'completed':
        return todoState.todos.filter(todo => todo.completed)
      default:
        return todoState.todos
    }
  }

  return (
    <div>
      <Title level={2}>useReducer Hook</Title>
      <Paragraph>
        useReducer 是useState的替代方案，适合管理复杂的状态逻辑。
      </Paragraph>

      {/* 简单计数器 */}
      <Card title="1. 简单计数器 - 基础用法" className="demo-container">
        <div className="demo-section">
          <Space align="center">
            <Text strong>计数: {counterState.count}</Text>
            <Button 
              icon={<MinusOutlined />} 
              onClick={() => counterDispatch({ type: 'decrement' })}
            />
            <Button 
              icon={<PlusOutlined />} 
              onClick={() => counterDispatch({ type: 'increment' })}
            />
            <Button onClick={() => counterDispatch({ type: 'reset' })}>
              重置
            </Button>
          </Space>
          <div style={{ marginTop: 16 }}>
            <Space>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="设置具体值"
                style={{ width: 120 }}
              />
              <Button onClick={handleCounterSet}>设置</Button>
            </Space>
          </div>
        </div>
        <Divider />
        <pre>{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      throw new Error('未知的action类型')
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0 })

// 使用
dispatch({ type: 'increment' })
dispatch({ type: 'set', payload: 10 })`}</pre>
      </Card>

      {/* Todo应用 */}
      <Card title="2. Todo应用 - 复杂状态管理" className="demo-container">
        <div className="demo-section">
          <Space style={{ marginBottom: 16 }}>
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新任务"
              onPressEnter={handleAddTodo}
            />
            <Button type="primary" onClick={handleAddTodo}>添加</Button>
          </Space>
          
          <Space style={{ marginBottom: 16 }}>
            <Text>筛选: </Text>
            {(['all', 'active', 'completed'] as const).map(filter => (
              <Tag
                key={filter}
                color={todoState.filter === filter ? 'blue' : 'default'}
                style={{ cursor: 'pointer' }}
                onClick={() => todoDispatch({ type: 'SET_FILTER', payload: filter })}
              >
                {filter === 'all' ? '全部' : filter === 'active' ? '未完成' : '已完成'}
              </Tag>
            ))}
            <Button 
              size="small" 
              onClick={() => todoDispatch({ type: 'CLEAR_COMPLETED' })}
            >
              清除已完成
            </Button>
          </Space>

          <List
            dataSource={getFilteredTodos()}
            renderItem={(todo) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    onClick={() => todoDispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  >
                    {todo.completed ? '取消完成' : '完成'}
                  </Button>,
                  <Button
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => todoDispatch({ type: 'DELETE_TODO', payload: todo.id })}
                  />
                ]}
              >
                <Text 
                  delete={todo.completed}
                  style={{ opacity: todo.completed ? 0.6 : 1 }}
                >
                  {todo.text}
                </Text>
              </List.Item>
            )}
          />
        </div>
        <Divider />
        <pre>{`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    // 其他cases...
  }
}`}</pre>
      </Card>

      {/* 表单管理 */}
      <Card title="3. 表单管理 - 状态和验证" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Input
                placeholder="姓名"
                value={formState.name}
                onChange={(e) => formDispatch({ 
                  type: 'SET_FIELD', 
                  field: 'name', 
                  value: e.target.value 
                })}
                status={formState.errors.name ? 'error' : ''}
              />
              {formState.errors.name && (
                <Text type="danger" style={{ fontSize: '12px' }}>
                  {formState.errors.name}
                </Text>
              )}
            </div>
            
            <div>
              <Input
                placeholder="邮箱"
                value={formState.email}
                onChange={(e) => formDispatch({ 
                  type: 'SET_FIELD', 
                  field: 'email', 
                  value: e.target.value 
                })}
                status={formState.errors.email ? 'error' : ''}
              />
              {formState.errors.email && (
                <Text type="danger" style={{ fontSize: '12px' }}>
                  {formState.errors.email}
                </Text>
              )}
            </div>
            
            <div>
              <Input
                type="number"
                placeholder="年龄"
                value={formState.age || ''}
                onChange={(e) => formDispatch({ 
                  type: 'SET_FIELD', 
                  field: 'age', 
                  value: Number(e.target.value) 
                })}
                status={formState.errors.age ? 'error' : ''}
              />
              {formState.errors.age && (
                <Text type="danger" style={{ fontSize: '12px' }}>
                  {formState.errors.age}
                </Text>
              )}
            </div>
            
            <Space>
              <Button type="primary" onClick={handleFormSubmit}>提交</Button>
              <Button onClick={() => formDispatch({ type: 'RESET_FORM' })}>
                重置
              </Button>
            </Space>
          </Space>
        </div>
        <Divider />
        <pre>{`const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined // 清除该字段错误
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      }
    // 其他cases...
  }
}`}</pre>
      </Card>

      <Card title="useReducer vs useState" style={{ marginTop: 16, background: '#e6f7ff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text strong>使用useReducer的场景:</Text>
            <ul>
              <li>状态逻辑复杂</li>
              <li>多个子值需要更新</li>
              <li>下一个状态依赖前一个状态</li>
              <li>状态更新逻辑需要测试</li>
              <li>需要在多个组件间共享状态逻辑</li>
            </ul>
          </div>
          <div>
            <Text strong>useState更适合:</Text>
            <ul>
              <li>简单的状态值</li>
              <li>独立的状态更新</li>
              <li>不需要复杂的状态逻辑</li>
              <li>局部组件状态</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>纯函数：</strong>Reducer必须是纯函数，不能有副作用</li>
          <li><strong>不可变更新：</strong>总是返回新的状态对象，不要修改原状态</li>
          <li><strong>Action设计：</strong>使用type字段标识动作类型，payload传递数据</li>
          <li><strong>TypeScript：</strong>为状态和动作定义明确的类型</li>
          <li><strong>性能：</strong>reducer函数会在每次dispatch时执行，保持简洁</li>
          <li><strong>可测试性：</strong>Reducer是纯函数，容易编写单元测试</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseReducerDemo
