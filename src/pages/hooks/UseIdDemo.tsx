import React, { useId, useState } from 'react'
import { Card, Input, Checkbox, Radio, Space, Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

// 自定义表单组件
const FormField: React.FC<{
  label: string
  type?: 'input' | 'checkbox' | 'radio'
  options?: string[]
  value?: any
  onChange?: (value: any) => void
}> = ({ label, type = 'input', options, value, onChange }) => {
  const id = useId()
  
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
        {label}
      </label>
      
      {type === 'input' && (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      
      {type === 'checkbox' && (
        <Checkbox
          id={id}
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
        >
          {label}
        </Checkbox>
      )}
      
      {type === 'radio' && options && (
        <Radio.Group
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map(option => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      )}
    </div>
  )
}

// 多级嵌套组件示例
const NestedComponent: React.FC<{ level: number }> = ({ level }) => {
  const baseId = useId()
  const [value, setValue] = useState('')
  
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      padding: 16, 
      margin: 8,
      borderRadius: 8,
      background: level % 2 === 0 ? '#f9f9f9' : '#fff'
    }}>
      <Text strong>嵌套组件 {level}</Text>
      <div style={{ marginTop: 8 }}>
        <label htmlFor={`${baseId}-input`}>
          输入框 {level}:
        </label>
        <Input
          id={`${baseId}-input`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Level ${level} input`}
          style={{ marginTop: 4 }}
        />
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
          ID: {baseId}-input
        </Text>
      </div>
      
      {level < 3 && <NestedComponent level={level + 1} />}
    </div>
  )
}

// 列表组件示例
const ItemList: React.FC = () => {
  const baseId = useId()
  const [items, setItems] = useState(['项目1', '项目2', '项目3'])
  
  return (
    <div>
      <Text strong>动态列表项</Text>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: 8, marginTop: 8 }}>
          <label htmlFor={`${baseId}-item-${index}`}>
            {item}:
          </label>
          <Input
            id={`${baseId}-item-${index}`}
            placeholder={`编辑 ${item}`}
            style={{ marginTop: 4 }}
          />
          <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
            ID: {baseId}-item-{index}
          </Text>
        </div>
      ))}
    </div>
  )
}

const UseIdDemo: React.FC = () => {
  // 基础用法
  const nameId = useId()
  const emailId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  // 表单数据
  const [formData, setFormData] = useState({
    username: '',
    subscribe: false,
    plan: 'basic'
  })
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <Title level={2}>useId Hook</Title>
      <Paragraph>
        useId 是React 18新增的Hook，用于生成唯一的ID，特别适用于表单字段的accessibility。
      </Paragraph>

      {/* 基础用法 */}
      <Card title="1. 基础用法 - 表单字段关联" className="demo-container">
        <div className="demo-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <label htmlFor={nameId} style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                姓名:
              </label>
              <Input
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入姓名"
              />
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                生成的ID: {nameId}
              </Text>
            </div>
            
            <div>
              <label htmlFor={emailId} style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                邮箱:
              </label>
              <Input
                id={emailId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
              />
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                生成的ID: {emailId}
              </Text>
            </div>
          </Space>
        </div>
        <Divider />
        <pre>{`const nameId = useId()
const emailId = useId()

return (
  <>
    <label htmlFor={nameId}>姓名:</label>
    <input id={nameId} />
    
    <label htmlFor={emailId}>邮箱:</label>
    <input id={emailId} />
  </>
)

// 每次调用useId都会生成唯一ID
// 即使在同一个组件中多次调用`}</pre>
      </Card>

      {/* 可复用组件 */}
      <Card title="2. 可复用表单组件" className="demo-container">
        <div className="demo-section">
          <FormField
            label="用户名"
            value={formData.username}
            onChange={(value) => updateFormData('username', value)}
          />
          
          <FormField
            label="订阅通知"
            type="checkbox"
            value={formData.subscribe}
            onChange={(value) => updateFormData('subscribe', value)}
          />
          
          <FormField
            label="选择套餐"
            type="radio"
            options={['basic', 'premium', 'enterprise']}
            value={formData.plan}
            onChange={(value) => updateFormData('plan', value)}
          />
          
          <div style={{ marginTop: 16, padding: 16, background: '#f9f9f9', borderRadius: 8 }}>
            <Text strong>表单数据:</Text>
            <pre style={{ marginTop: 8, fontSize: 12 }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
        <Divider />
        <pre>{`const FormField = ({ label, type = 'input' }) => {
  const id = useId()  // 每个FormField实例都有唯一ID
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  )
}

// 使用时无需手动管理ID
<FormField label="用户名" />
<FormField label="密码" type="password" />
<FormField label="邮箱" type="email" />`}</pre>
      </Card>

      {/* 嵌套组件 */}
      <Card title="3. 嵌套组件中的ID管理" className="demo-container">
        <div className="demo-section">
          <NestedComponent level={1} />
        </div>
        <Divider />
        <pre>{`const NestedComponent = ({ level }) => {
  const baseId = useId()  // 每个实例都有唯一的基础ID
  
  return (
    <div>
      <label htmlFor={\`\${baseId}-input\`}>
        输入框 {level}:
      </label>
      <input id={\`\${baseId}-input\`} />
      
      {level < 3 && <NestedComponent level={level + 1} />}
    </div>
  )
}

// 即使嵌套多层，每个组件都有唯一ID前缀`}</pre>
      </Card>

      {/* 列表中的ID */}
      <Card title="4. 动态列表中的ID" className="demo-container">
        <div className="demo-section">
          <ItemList />
        </div>
        <Divider />
        <pre>{`const ItemList = () => {
  const baseId = useId()
  const [items, setItems] = useState(['项目1', '项目2', '项目3'])
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <label htmlFor={\`\${baseId}-item-\${index}\`}>
            {item}:
          </label>
          <input id={\`\${baseId}-item-\${index}\`} />
        </div>
      ))}
    </div>
  )
}

// 为列表项生成稳定的ID`}</pre>
      </Card>

      <Card title="与传统ID管理的对比" style={{ marginTop: 16, background: '#e6f7ff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text strong>传统方式的问题:</Text>
            <ul>
              <li>手动管理ID容易冲突</li>
              <li>服务端渲染时ID不一致</li>
              <li>组件复用时ID重复</li>
              <li>需要额外的state或prop</li>
            </ul>
            <pre style={{ fontSize: 12 }}>{`// 传统方式
const [id] = useState(\`field-\${Math.random()}\`)
// 或者
const id = \`field-\${useInstanceId()}\``}</pre>
          </div>
          <div>
            <Text strong>useId的优势:</Text>
            <ul>
              <li>自动生成唯一ID</li>
              <li>服务端渲染安全</li>
              <li>组件复用友好</li>
              <li>无需额外状态管理</li>
            </ul>
            <pre style={{ fontSize: 12 }}>{`// useId方式
const id = useId()
// 简单、可靠、性能好`}</pre>
          </div>
        </div>
      </Card>

      <Card title="使用要点" style={{ marginTop: 16, background: '#f6ffed' }}>
        <ul>
          <li><strong>Accessibility优先：</strong>主要用于表单字段的aria-labelledby、aria-describedby等</li>
          <li><strong>服务端渲染：</strong>确保客户端和服务端生成相同的ID</li>
          <li><strong>不是key：</strong>不要将useId的返回值用作列表项的key</li>
          <li><strong>组合使用：</strong>可以与其他字符串组合生成更具体的ID</li>
          <li><strong>唯一性保证：</strong>在整个应用中都是唯一的，包括多个React根</li>
          <li><strong>性能：</strong>生成ID的成本很低，不需要担心性能问题</li>
        </ul>
      </Card>
    </div>
  )
}

export default UseIdDemo
