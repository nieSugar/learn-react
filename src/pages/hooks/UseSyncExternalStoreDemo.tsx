import React, { useSyncExternalStore } from 'react'
import { Card, Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

// 创建一个简单的外部store
const createStore = () => {
  let state = { count: 0 }
  let listeners: (() => void)[] = []

  return {
    getSnapshot: () => state,
    subscribe: (listener: () => void) => {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    },
    increment: () => {
      state = { count: state.count + 1 }
      listeners.forEach(listener => listener())
    }
  }
}

const store = createStore()

const UseSyncExternalStoreDemo: React.FC = () => {
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <div>
      <Title level={2}>useSyncExternalStore Hook</Title>
      <Paragraph>
        useSyncExternalStore 用于订阅外部数据源。
      </Paragraph>

      <Card title="外部Store示例" className="demo-container">
        <div className="demo-section">
          <Text>Count: {snapshot.count}</Text>
          <button onClick={store.increment}>增加</button>
        </div>
        <Divider />
        <pre>{`const snapshot = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot
)`}</pre>
      </Card>
    </div>
  )
}

export default UseSyncExternalStoreDemo
