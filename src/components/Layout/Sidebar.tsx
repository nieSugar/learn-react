import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { menuItems } from '../../config/menu'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // 构建菜单项
  const buildMenuItems = () => {
    return menuItems.map(item => ({
      key: item.path,
      label: item.label,
      children: item.children?.map(child => ({
        key: child.path,
        label: child.label,
      }))
    }))
  }

  return (
    <Sider 
      width={250} 
      style={{ 
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        padding: '16px 24px', 
        borderBottom: '1px solid #e8e8e8',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>React Hooks</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>学习指南</p>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ 
          height: 'calc(100vh - 80px)', // 减去头部高度
          borderRight: 0,
          overflow: 'auto'
        }}
        items={buildMenuItems()}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

export default Sidebar
