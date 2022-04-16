import { Button, Modal } from 'antd'
import { useState, useMemo } from 'react'
import RoleModal from './RoleModal'

export default function RoleList() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={()=>setModalVisible(true)}>新增角色</Button>
      { modalVisible && <RoleModal onCancel={()=>setModalVisible(false)} onOk={()=>{
        setModalVisible(false) 
        // TODO:重新获取角色列表
      }}/>}
      
    </div>
  )
}
