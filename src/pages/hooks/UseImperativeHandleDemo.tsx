import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import { Card, Typography, Divider, Button } from 'antd'

const { Title, Paragraph } = Typography

interface ChildRef {
  focus: () => void
  getValue: () => string
}

const Child = forwardRef<ChildRef>((_props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    getValue: () => {
      return inputRef.current?.value || ''
    }
  }))

  return <input ref={inputRef} placeholder="子组件输入框" />
})

Child.displayName = 'Child'

const UseImperativeHandleDemo: React.FC = () => {
  const childRef = useRef<ChildRef>(null)

  return (
    <div>
      <Title level={2}>useImperativeHandle Hook</Title>
      <Paragraph>
        useImperativeHandle 自定义暴露给父组件的实例值。
      </Paragraph>

      <Card title="子组件引用示例" className="demo-container">
        <Child ref={childRef} />
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => childRef.current?.focus()}>
            聚焦子组件
          </Button>
          <Button onClick={() => alert(childRef.current?.getValue())}>
            获取值
          </Button>
        </div>
        <Divider />
        <pre>{`useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  getValue: () => inputRef.current?.value || ''
}))`}</pre>
      </Card>
    </div>
  )
}

export default UseImperativeHandleDemo
