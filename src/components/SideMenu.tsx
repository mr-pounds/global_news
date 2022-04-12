import { ReactNode, useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useHistory } from 'umi';
import getMenuIcon from './menuIcon'

const { Sider } = Layout;
const { SubMenu } = Menu;

interface menuItemInterface {
  key: string,
  title: string,
  // icon: ReactNode,
  children: menuItemInterface[]
}


export default function SideMenu() {

  const history = useHistory()

  const [collapsed, changeCollapsed] = useState(false)
  const [menuList, setMenuList] = useState<Array<menuItemInterface>>([])

  useEffect(()=>{
    fetch('/api/account/rights', {
      method:'POST',
    }
    ).then(data=>data.json()).then(data=>{
      setMenuList(data)
    })
  }, [])

  function renderMenuItem(item: menuItemInterface) {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu key={item.key} icon={getMenuIcon(item.key)} title={item.title}>
          {item.children.map((childrenItem) => {
            return renderMenuItem(childrenItem)
          })}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key} icon={getMenuIcon(item.key)} onClick={() => {
          history.push(item.key)
        }}>
          {item.title}
        </Menu.Item>
      )
    }
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">First Project</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {menuList.map((item) => renderMenuItem(item))}
      </Menu>
    </Sider>
  )
}
