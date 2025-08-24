export interface MenuItem {
  key: string;
  label: string;
  path: string;
  children?: MenuItem[];
}

export interface HookExample {
  title: string;
  description: string;
  component: React.ComponentType;
}
