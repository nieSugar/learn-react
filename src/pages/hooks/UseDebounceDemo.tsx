import React, { useState, useEffect } from 'react'
import { Card, Typography, Divider, Input } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义useDebounce Hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const UseDebounceDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [searchResults, setSearchResults] = useState<string[]>([])

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 模拟搜索
      const results = [
        `${debouncedSearchTerm} - 结果1`,
        `${debouncedSearchTerm} - 结果2`,
        `${debouncedSearchTerm} - 结果3`
      ]
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <Title level={2}>useDebounce 自定义Hook</Title>
      <Paragraph>
        自定义Hook示例：防抖处理用户输入。
      </Paragraph>

      <Card title="搜索防抖示例" className="demo-container">
        <div className="demo-section">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入搜索内容"
          />
          
          <div style={{ marginTop: 16 }}>
            <Text>当前输入: {searchTerm}</Text>
            <br />
            <Text>防抖后的值: {debouncedSearchTerm}</Text>
          </div>
          
          {searchResults.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Text strong>搜索结果:</Text>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Divider />
        <pre>{`const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}`}</pre>
      </Card>
    </div>
  )
}

export default UseDebounceDemo
