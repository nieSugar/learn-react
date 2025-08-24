import React, { useState, useEffect } from 'react'
import { Card, Typography, Divider, Button, Spin } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义useFetch Hook
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('请求失败')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url) fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

const UseFetchDemo: React.FC = () => {
  const [postId, setPostId] = useState(1)
  const { data, loading, error, refetch } = useFetch<any>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  return (
    <div>
      <Title level={2}>useFetch 自定义Hook</Title>
      <Paragraph>
        自定义Hook示例：封装数据获取逻辑。
      </Paragraph>

      <Card title="数据获取示例" className="demo-container">
        <div className="demo-section">
          <div style={{ marginBottom: 16 }}>
            <Button onClick={() => setPostId(1)}>文章1</Button>
            <Button onClick={() => setPostId(2)} style={{ margin: '0 8px' }}>文章2</Button>
            <Button onClick={() => setPostId(3)}>文章3</Button>
            <Button onClick={refetch} style={{ marginLeft: 8 }}>刷新</Button>
          </div>
          
          {loading && <Spin />}
          {error && <Text type="danger">错误: {error}</Text>}
          {data && (
            <div>
              <Text strong>{data.title}</Text>
              <p>{data.body}</p>
            </div>
          )}
        </div>
        <Divider />
        <pre>{`const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url) fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}`}</pre>
      </Card>
    </div>
  )
}

export default UseFetchDemo
