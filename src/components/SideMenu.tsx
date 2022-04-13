import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'umi';
import getMenuIcon from './MenuIcon'
import { LayoutModelState, Dispatch, connect } from 'umi';


interface menuItemInterface {
  id: number,
  key: string,
  title: string,
  permission: number
  children: menuItemInterface[]
}

interface LayoutProps {
  layout: LayoutModelState,
  dispatch: Dispatch
}

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMenu(props: LayoutProps){
  const history = useHistory()
  const location = useLocation()
  const { layout, dispatch } = props
  const [menuList, setMenuList] = useState<Array<menuItemInterface>>([])

  useEffect(() => {
    fetch('/api/account/rights', {
      method: 'GET',
    }
    ).then(data => data.json()).then(data => {
      setMenuList(data)
    })
  }, [])

  function renderMenuItem(item: menuItemInterface) {
    if(item.permission === 0){
      return null
    }
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
            // console.log(history)
            if(location.pathname != item.key) {
              history.push(item.key)
              dispatch({
                type: 'layout/setHeader',
                payload: item.title
              })
            }          
        }}>
          {item.title}
        </Menu.Item>
      )
    }
  }

  return (
    <Sider trigger={null} collapsible collapsed={layout.collapsed}>
      <div className="logo">{!layout.collapsed ? 'First Project' : null}</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {menuList.map((item) => renderMenuItem(item))}
      </Menu>
    </Sider>
  )
}

export default connect(
  ({ layout }: {
    layout: LayoutModelState
  }) => {
    return {
      layout: layout,
    }
  },
)(SideMenu);
