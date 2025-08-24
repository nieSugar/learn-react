import React, { useState, useMemo, useCallback } from 'react'
import { Card, Button, Input, Space, Typography, Divider, Slider, Table } from 'antd'

const { Title, Paragraph, Text } = Typography

// 模拟昂贵的计算函数
const expensiveCalculation = (num: number): number => {
  console.log('执行昂贵计算...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(num * i)
  }
  return result
}

// 模拟复杂的数据处理
const processLargeDataset = (data: number[], filter: number): any[] => {
  console.log('处理大数据集...')
  return data
    .filter(item => item > filter)
    .map(item => ({
      id: item,
      value: item * 2,
      label: `Item ${item}`,
      calculated: Math.pow(item, 2)
    }))
    .sort((a, b) => b.calculated - a.calculated)
}

const UseMemoDemo: React.FC = () => {
  // 1. 基础示例 - 昂贵计算
  const [count, setCount] = useState(1)
  const [other, setOther] = useState(0)

  // 没有useMemo - 每次渲染都计算
  const expensiveValueBad = expensiveCalculation(count)

  // 使用useMemo - 只在count变化时计算
  const expensiveValueGood = useMemo(() => {
    return expensiveCalculation(count)
  }, [count])

  // 2. 复杂对象创建
  const [name, setName] = useState('张三')
  const [age, setAge] = useState(25)
  const [city, setCity] = useState('北京')

  // 复杂用户对象
  const userProfile = useMemo(() => {
    console.log('创建用户配置对象...')
    return {
      personal: {
        name,
        age,
        initials: name.split('').slice(0, 2).join(''),
        ageGroup: age < 18 ? '未成年' : age < 60 ? '成年' : '老年'
      },
      location: {
        city,
        region: city === '北京' ? '华北' : city === '上海' ? '华东' : '其他',
        timezone: city === '北京' ? 'GMT+8' : 'GMT+8'
      },
      metadata: {
        createdAt: new Date().toISOString(),
        id: `${name}-${age}-${Date.now()}`
      }
    }
  }, [name, age, city])

  // 3. 大数据集处理
  const [dataSize, setDataSize] = useState(1000)
  const [filterValue, setFilterValue] = useState(500)

  const largeDataset = useMemo(() => {
    return Array.from({ length: dataSize }, (_, i) => i + 1)
  }, [dataSize])

  const processedData = useMemo(() => {
    return processLargeDataset(largeDataset, filterValue)
  }, [largeDataset, filterValue])

  // 4. 表格列定义
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  const tableColumns = useMemo(() => {
    console.log('重新生成表格列定义...')
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
        defaultSortOrder: sortOrder
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        render: (value: number) => <strong>{value}</strong>
      },
      {
        title: '标签',
        dataIndex: 'label',
        key: 'label'
      },
      {
        title: '计算值',
        dataIndex: 'calculated',
        key: 'calculated',
        render: (value: number) => value.toLocaleString()
      }
    ]
  }, [sortOrder])

  // 5. 条件渲染优化
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const advancedSettings = useMemo(() => {
    if (!showAdvanced) return null
    
    console.log('生成高级设置...')
    return {
      theme: 'dark',
      animations: true,
      debugging: false,
      performance: {
        enableVirtualization: true,
        batchSize: 100,
        throttleMs: 16
      }
    }
  }, [showAdvanced])

  return (
    <div>
      <Title level={2}>useMemo Hook</Title>
      <Paragraph>
        useMemo 用于缓存计算结果，避免在每次渲染时重复执行昂贵的计算。
      </Paragraph>

      {/* 基础示例 */}
      <Card title="1. 昂贵计算缓存" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>计算输入: </Text>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <Button 
                onClick={() => setOther(prev => prev + 1)}
                style={{ marginLeft: 16 }}
              >
                触发其他状态更新 ({other})
              </Button>
            </div>
            
            <div>
              <Text strong>❌ 无缓存结果: </Text>
              <Text style={{ color: '#ff4d4f' }}>
                {expensiveValueBad.toFixed(2)}
              </Text>
            </div>
            
            <div>
              <Text strong>✅ 缓存结果: </Text>
              <Text style={{ color: '#52c41a' }}>
                {expensiveValueGood.toFixed(2)}
              </Text>
            </div>
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              查看控制台，缓存版本只在count变化时才重新计算
            </Text>
          </Space>
        </div>
        <Divider />
        <pre>{`// ❌ 每次渲染都计算
const expensiveValue = expensiveCalculation(count)

// ✅ 只在依赖变化时计算
const expensiveValue = useMemo(() => {
  return expensiveCalculation(count)
}, [count])

// 昂贵的计算函数
const expensiveCalculation = (num) => {
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(num * i)
  }
  return result
}`}</pre>
      </Card>

      {/* 复杂对象创建 */}
      <Card title="2. 复杂对象创建优化" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder="姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="年龄"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <Input
                placeholder="城市"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Space>
            
            <div style={{ 
              background: '#f9f9f9', 
              padding: 16, 
              borderRadius: 8,
              border: '1px solid #d9d9d9'
            }}>
              <Text strong>用户配置对象:</Text>
              <pre style={{ marginTop: 8, fontSize: 12 }}>
                {JSON.stringify(userProfile, null, 2)}
              </pre>
            </div>
          </Space>
        </div>
        <Divider />
        <pre>{`const userProfile = useMemo(() => {
  console.log('创建用户配置对象...')
  return {
    personal: {
      name,
      age,
      initials: name.split('').slice(0, 2).join(''),
      ageGroup: age < 18 ? '未成年' : age < 60 ? '成年' : '老年'
    },
    location: {
      city,
      region: city === '北京' ? '华北' : city === '上海' ? '华东' : '其他'
    },
    metadata: {
      createdAt: new Date().toISOString(),
      id: \`\${name}-\${age}-\${Date.now()}\`
    }
  }
}, [name, age, city]) // 只在这些值变化时重新创建`}</pre>
      </Card>

      {/* 大数据集处理 */}
      <Card title="3. 大数据集处理" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>数据大小: </Text>
              <Slider
                min={100}
                max={5000}
                step={100}
                value={dataSize}
                onChange={setDataSize}
                style={{ width: 200 }}
              />
              <Text>{dataSize}</Text>
            </div>
            
            <div>
              <Text strong>过滤值: </Text>
              <Slider
                min={0}
                max={dataSize}
                value={filterValue}
                onChange={setFilterValue}
                style={{ width: 200 }}
              />
              <Text>{filterValue}</Text>
            </div>
            
            <div>
              <Text strong>处理后数据: </Text>
              <Text>{processedData.length} 条记录</Text>
            </div>
            
            <Table
              dataSource={processedData.slice(0, 10)}
              columns={tableColumns}
              pagination={false}
              size="small"
              style={{ marginTop: 16 }}
            />
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              显示前10条记录，查看控制台处理日志
            </Text>
          </Space>
        </div>
        <Divider />
        <pre>{`const largeDataset = useMemo(() => {
  return Array.from({ length: dataSize }, (_, i) => i + 1)
}, [dataSize])

const processedData = useMemo(() => {
  return processLargeDataset(largeDataset, filterValue)
}, [largeDataset, filterValue])

const processLargeDataset = (data, filter) => {
  console.log('处理大数据集...')
  return data
    .filter(item => item > filter)
    .map(item => ({
      id: item,
      value: item * 2,
      label: \`Item \${item}\`,
      calculated: Math.pow(item, 2)
    }))
    .sort((a, b) => b.calculated - a.calculated)
}`}</pre>
      </Card>

      {/* 条件渲染优化 */}
      <Card title="4. 条件渲染优化" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Button 
                type={showAdvanced ? 'primary' : 'default'}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? '隐藏' : '显示'}高级设置
              </Button>
            </div>
            
            {advancedSettings && (
              <div style={{ 
                background: '#f9f9f9', 
                padding: 16, 
                borderRadius: 8,
                border: '1px solid #d9d9d9'
              }}>
                <Text strong>高级设置:</Text>
                <pre style={{ marginTop: 8, fontSize: 12 }}>
                  {JSON.stringify(advancedSettings, null, 2)}
                </pre>
              </div>
            )}
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              查看控制台，只有在显示状态变化时才生成设置对象
            </Text>
          </Space>
        </div>
        <Divider />
        <pre>{`const advancedSettings = useMemo(() => {
  if (!showAdvanced) return null
  
  console.log('生成高级设置...')
  return {
    theme: 'dark',
    animations: true,
    debugging: false,
    performance: {
      enableVirtualization: true,
      batchSize: 100,
      throttleMs: 16
    }
  }
}, [showAdvanced])

// 在JSX中使用
{advancedSettings && (
  <AdvancedPanel settings={advancedSettings} />
)}`}</pre>
      </Card>

      <Card title="使用场景对比" style={{ marginTop: 16, background: '#e6f7ff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text strong>适合使用useMemo:</Text>
            <ul>
              <li>昂贵的计算操作</li>
              <li>复杂的数据转换</li>
              <li>大数据集的过滤/排序</li>
              <li>复杂对象的创建</li>
              <li>避免子组件不必要的重渲染</li>
            </ul>
          </div>
          <div>
            <Text strong>不适合使用useMemo:</Text>
            <ul>
              <li>简单的计算</li>
              <li>基础数据类型操作</li>
              <li>每次都需要新值的情况</li>
              <li>依赖项频繁变化</li>
              <li>计算成本低于缓存成本</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>依赖数组：</strong>确保包含所有在计算中使用的变量</li>
          <li><strong>引用稳定性：</strong>useMemo返回的值引用只在依赖变化时才改变</li>
          <li><strong>不要过度使用：</strong>简单计算可能不值得缓存</li>
          <li><strong>内存占用：</strong>缓存会占用额外内存，权衡使用</li>
          <li><strong>调试技巧：</strong>在计算函数中添加console.log来观察执行时机</li>
          <li><strong>与useCallback配合：</strong>缓存对象时考虑其方法也需要缓存</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseMemoDemo
