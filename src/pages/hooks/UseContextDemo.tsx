import React, { createContext, useContext, useState } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Typography,
  Divider,
  Select,
  Avatar,
} from "antd";
import { UserOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// 1. 简单的主题Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// 2. 复杂的用户Context
interface User {
  id: number;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

// 3. 多层嵌套Context
interface SettingsContextType {
  language: "zh" | "en";
  fontSize: number;
  setLanguage: (lang: "zh" | "en") => void;
  setFontSize: (size: number) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  language: "zh",
  fontSize: 14,
  setLanguage: () => {},
  setFontSize: () => {},
});

// Provider组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [fontSize, setFontSize] = useState(14);

  return (
    <SettingsContext.Provider
      value={{
        language,
        fontSize,
        setLanguage,
        setFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// 使用Context的组件
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: 16,
        background: theme === "light" ? "#fff" : "#1f1f1f",
        color: theme === "light" ? "#000" : "#fff",
        borderRadius: 8,
        border: "1px solid #d9d9d9",
      }}
    >
      <Space>
        <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>
          当前主题: {theme}
        </Text>
        <Button
          onClick={toggleTheme}
          icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        >
          切换主题
        </Button>
      </Space>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { user, login, logout, updateProfile } = useContext(UserContext);
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim()) {
      login({
        id: Date.now(),
        name: name.trim(),
        role: "user",
      });
      setName("");
    }
  };

  const toggleRole = () => {
    if (user) {
      updateProfile({
        role: user.role === "admin" ? "user" : "admin",
      });
    }
  };

  if (!user) {
    return (
      <div
        style={{ padding: 16, border: "1px solid #d9d9d9", borderRadius: 8 }}
      >
        <Space>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入用户名"
            onPressEnter={handleLogin}
          />
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, border: "1px solid #d9d9d9", borderRadius: 8 }}>
      <Space>
        <Avatar icon={<UserOutlined />} />
        <div>
          <Text strong>{user.name}</Text>
          <br />
          <Text type="secondary">角色: {user.role}</Text>
        </div>
        <Button onClick={toggleRole}>切换角色</Button>
        <Button onClick={logout}>退出登录</Button>
      </Space>
    </div>
  );
};

const SettingsPanel: React.FC = () => {
  const { language, fontSize, setLanguage, setFontSize } =
    useContext(SettingsContext);

  return (
    <div style={{ padding: 16, border: "1px solid #d9d9d9", borderRadius: 8 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Text>语言:</Text>
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: 120 }}
          >
            <Option value="zh">中文</Option>
            <Option value="en">English</Option>
          </Select>
        </Space>
        <Space>
          <Text>字体大小:</Text>
          <Select
            value={fontSize}
            onChange={setFontSize}
            style={{ width: 120 }}
          >
            <Option value={12}>12px</Option>
            <Option value={14}>14px</Option>
            <Option value={16}>16px</Option>
            <Option value={18}>18px</Option>
          </Select>
        </Space>
        <div style={{ fontSize, marginTop: 16 }}>
          <Text>预览文字 (当前大小: {fontSize}px)</Text>
        </div>
      </Space>
    </div>
  );
};

// 组合使用多个Context的组件
const AppInfo: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { language, fontSize } = useContext(SettingsContext);

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        background: theme === "light" ? "#f9f9f9" : "#2c2c2c",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <Text
        style={{
          fontSize,
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        应用状态总览:
      </Text>
      <ul style={{ marginTop: 8, fontSize }}>
        <li>主题: {theme}</li>
        <li>用户: {user ? `${user.name} (${user.role})` : "未登录"}</li>
        <li>语言: {language}</li>
        <li>字体大小: {fontSize}px</li>
      </ul>
    </div>
  );
};

const UseContextDemo: React.FC = () => {
  return (
    <div>
      <Title level={2}>useContext Hook</Title>
      <Paragraph>
        useContext 用于在组件树中共享数据，避免prop drilling问题。
      </Paragraph>

      <ThemeProvider>
        <UserProvider>
          <SettingsProvider>
            {/* Context基础用法 */}
            <Card
              title="1. 主题Context - 简单状态共享"
              className="demo-container"
            >
              <div className="demo-section">
                <ThemeToggle />
              </div>
              <Divider />
                            <pre>{`// 1. 定义Context类型接口（TypeScript）
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// 2. 创建Context并提供默认值
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
})

// 3. 创建Provider组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 4. 消费Context的组件
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  )
}`}</pre>
            </Card>

            {/* 复杂状态管理 */}
            <Card
              title="2. 用户Context - 复杂状态管理"
              className="demo-container"
            >
              <div className="demo-section">
                <UserProfile />
              </div>
              <Divider />
              <pre>{`// 1. 定义用户数据类型
interface User {
  id: number
  name: string
  role: 'admin' | 'user'
  avatar?: string
}

// 2. 定义Context类型接口
interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

// 3. 创建Context
const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {}
})

// 4. 创建Provider组件
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  
  const login = (userData: User) => {
    setUser(userData)
  }
  
  const logout = () => {
    setUser(null)
  }
  
  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }
  
  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// 5. 使用Context的组件
const UserProfile: React.FC = () => {
  const { user, login, logout, updateProfile } = useContext(UserContext)
  
  if (!user) {
    return <LoginForm onLogin={login} />
  }
  
  return (
    <div>
      <span>{user.name} ({user.role})</span>
      <button onClick={() => updateProfile({ role: 'admin' })}>
        升级为管理员
      </button>
      <button onClick={logout}>退出登录</button>
    </div>
  )
}`}</pre>
            </Card>

            {/* 设置Context */}
            <Card title="3. 设置Context - 配置管理" className="demo-container">
              <div className="demo-section">
                <SettingsPanel />
              </div>
              <Divider />
              <pre>{`// 1. 定义设置Context类型
interface SettingsContextType {
  language: 'zh' | 'en'
  fontSize: number
  setLanguage: (lang: 'zh' | 'en') => void
  setFontSize: (size: number) => void
}

// 2. 创建Context
const SettingsContext = createContext<SettingsContextType>({
  language: 'zh',
  fontSize: 14,
  setLanguage: () => {},
  setFontSize: () => {}
})

// 3. 创建Provider组件
const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [fontSize, setFontSize] = useState(14)
  
  return (
    <SettingsContext.Provider value={{ 
      language, 
      fontSize, 
      setLanguage, 
      setFontSize 
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

// 4. 使用Context的组件
const SettingsPanel: React.FC = () => {
  const { language, fontSize, setLanguage, setFontSize } = useContext(SettingsContext)
  
  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}>
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
      
      <input 
        type="range" 
        min="12" 
        max="20" 
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
      
      <div style={{ fontSize }}>
        预览文字 (当前: {fontSize}px)
      </div>
    </div>
  )
}`}</pre>
            </Card>

            {/* 多Context组合 */}
            <Card title="4. 多Context组合使用" className="demo-container">
              <div className="demo-section">
                <AppInfo />
              </div>
              <Divider />
              <pre>{`// 1. 在单个组件中使用多个Context
const AppInfo: React.FC = () => {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)
  const { language, fontSize } = useContext(SettingsContext)
  
  return (
    <div style={{ 
      fontSize,
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      padding: 16
    }}>
      <h3>应用状态总览</h3>
      <ul>
        <li>主题: {theme}</li>
        <li>用户: {user ? \`\${user.name} (\${user.role})\` : '未登录'}</li>
        <li>语言: {language}</li>
        <li>字体大小: {fontSize}px</li>
      </ul>
    </div>
  )
}

// 2. 自定义Hook优化多Context使用
const useAppContext = () => {
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext)
  const settings = useContext(SettingsContext)
  
  return { theme, user, settings }
}

// 3. Provider组合模式
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

// 4. 使用
const App: React.FC = () => {
  return (
    <AppProviders>
      <Header />
      <Main />
      <Footer />
    </AppProviders>
  )
}`}</pre>
            </Card>
          </SettingsProvider>
        </UserProvider>
      </ThemeProvider>

      <Card title="🚀 最佳实践示例" style={{ marginTop: 16, background: "#e6f7ff" }}>
        <pre>{`// 1. 创建Context + 自定义Hook组合
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  
  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme])
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// 2. 使用时更简洁且类型安全
const MyComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme() // 自动类型推断，错误边界保护
  
  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  )
}

// 3. 减少Provider嵌套的复合组件
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </UserProvider>
    </ThemeProvider>
  )
}`}</pre>
      </Card>

      <Card title="📝 使用要点与最佳实践" style={{ marginTop: 16, background: "#f6ffed" }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <Text strong style={{ color: '#52c41a' }}>✅ 推荐做法</Text>
            <ul style={{ marginTop: 8 }}>
              <li><strong>类型安全：</strong>使用TypeScript接口定义Context类型</li>
              <li><strong>自定义Hook：</strong>封装useContext调用，提供错误边界</li>
              <li><strong>性能优化：</strong>使用useMemo缓存Provider的value</li>
              <li><strong>合理拆分：</strong>按功能领域拆分不同的Context</li>
              <li><strong>Provider组合：</strong>创建复合Provider组件减少嵌套</li>
              <li><strong>默认值：</strong>提供合理的默认值，便于测试</li>
            </ul>
          </div>
          <div>
            <Text strong style={{ color: '#ff4d4f' }}>❌ 避免做法</Text>
            <ul style={{ marginTop: 8 }}>
              <li><strong>过度使用：</strong>简单的prop传递不需要Context</li>
              <li><strong>频繁变化：</strong>避免将频繁变化的值放入Context</li>
              <li><strong>巨大对象：</strong>避免在单个Context中放太多数据</li>
              <li><strong>忘记优化：</strong>不使用memo优化可能导致性能问题</li>
              <li><strong>错误处理：</strong>不检查Context是否在Provider内使用</li>
              <li><strong>默认值陷阱：</strong>不要依赖createContext的默认值</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: 16, padding: 16, background: '#fff7e6', borderRadius: 8 }}>
          <Text strong>💡 性能提示：</Text>
          <p style={{ margin: '8px 0 0 0' }}>
            Context值变化时，所有消费该Context的组件都会重新渲染。
            使用React.memo()、useMemo()和useCallback()来优化不必要的重渲染。
          </p>
        </div>
      </Card>
    </div>
  );
};

export default UseContextDemo;
