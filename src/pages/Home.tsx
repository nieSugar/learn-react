import { Card, Col, Row, Space, Tag, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const navigate = useNavigate()

  const hookCategories = [
    {
      title: '基础 Hooks',
      description: 'React最核心的三个Hook，是学习React Hook的基础',
      color: '#52c41a',
      hooks: ['useState', 'useEffect', 'useContext']
    },
    {
      title: '附加 Hooks',
      description: '用于优化性能和处理复杂逻辑的Hook',
      color: '#1890ff',
      hooks: ['useReducer', 'useCallback', 'useMemo', 'useRef']
    },
    {
      title: '高级 Hooks',
      description: '特殊场景下使用的Hook，需要深入理解',
      color: '#722ed1',
      hooks: ['useImperativeHandle', 'useLayoutEffect', 'useDebugValue']
    },
    {
      title: 'React 18 新 Hooks',
      description: 'React 18引入的新Hook，支持并发特性',
      color: '#fa541c',
      hooks: ['useId', 'useTransition', 'useDeferredValue', 'useSyncExternalStore', 'useInsertionEffect']
    },
    {
      title: '自定义 Hooks',
      description: '实用的自定义Hook示例，展示Hook的组合使用',
      color: '#13c2c2',
      hooks: ['useLocalStorage', 'useFetch', 'useDebounce', 'useToggle']
    }
  ]

  const handleHookClick = (hookName: string) => {
    navigate(`/${hookName}`)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={1}>React Hooks 完整学习指南</Title>
        <Paragraph style={{ fontSize: 16, color: '#666' }}>
          从基础到进阶，全面掌握React 18+的所有Hook用法
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {hookCategories.map((category, index) => (
          <Col xs={24} md={12} lg={8} key={index}>
            <Card 
              title={
                <Space>
                  <Tag color={category.color}>{category.hooks.length}个</Tag>
                  <span>{category.title}</span>
                </Space>
              }
              style={{ height: '100%' }}
              hoverable
            >
              <Paragraph style={{ marginBottom: 16, minHeight: 48 }}>
                {category.description}
              </Paragraph>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {category.hooks.map(hook => (
                  <Tag 
                    key={hook}
                    color={category.color}
                    style={{ cursor: 'pointer', marginBottom: 4 }}
                    onClick={() => handleHookClick(hook)}
                  >
                    {hook}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 48, textAlign: 'center' }}>
        <Title level={3}>学习建议</Title>
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} md={8}>
            <div style={{ padding: 16 }}>
              <Title level={4}>🏗️ 循序渐进</Title>
              <Paragraph>
                从基础Hook开始，逐步学习高级用法
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ padding: 16 }}>
              <Title level={4}>💡 实践为主</Title>
              <Paragraph>
                每个Hook都有多个实际应用场景示例
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ padding: 16 }}>
              <Title level={4}>🔗 组合使用</Title>
              <Paragraph>
                学习不同Hook的组合使用技巧
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Home
