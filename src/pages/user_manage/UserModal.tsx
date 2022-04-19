import { useEffect, useState } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import { request } from 'umi'


const { Option } = Select
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

interface ModalProps {
    onCancel: () => void,
    onOk: () => void,
    roleList: any,
    regionList: any,
    user: any,
}


export default function UserModal(props: ModalProps) {
    // 控制校验的状态
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [inputStatus, setInputState] = useState<'' | 'error' | 'warning' | undefined>('')
    const { onCancel, onOk, roleList, regionList, user } = props;
    const [form] = Form.useForm()

    useEffect(() => {
        if(user){
        form.setFieldsValue({
            name: user.name,
            phone: user.phone,
            region: user.region_id,
            role: user.role_id,
        })}
    }, [])

    const handleOk = () => {
        function handleResponse(data: any) {
            setConfirmLoading(false)
            if (data.code === 0) {
                message.success('保存成功')
                onOk()
            } else {
                setInputState('error')
                message.error(data.msg)
            }
        }

        form.validateFields().then(values => {
            setConfirmLoading(true)
            if(!user){
            request('/api/account/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: form.getFieldValue('name'),
                    password: form.getFieldValue('password'),
                    phone: form.getFieldValue('phone'),
                    region: form.getFieldValue('region'),
                    role: form.getFieldValue('role')
                })
            }).then(data => {
                handleResponse(data)
            })}else{
                request('/api/account/updateUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id,
                        name: form.getFieldValue('name'),
                        phone: form.getFieldValue('phone'),
                        region: form.getFieldValue('region'),
                        role: form.getFieldValue('role')
                    })
                }).then(data => {
                    handleResponse(data)
                })
            }
        
        }).catch( _ => {
            message.warning("请检查输入的内容")
        })
    };

    return (
        <Modal
            title="创建用户"
            visible={true}
            okText="保存"
            cancelText="取消"
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => { onCancel() }}
            width={600}
        >
            <Form {...layout} form={form} name="role_form" validateTrigger='onBlur' style={{ margin: "16px 48px" }} labelAlign='right' >
                <Form.Item name={'name'} label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
                    <Input />
                </Form.Item>
                { user? null:<Form.Item name={'password'} label="密码" rules={[{ required: true, message: "请输入密码" }]}>
                    <Input.Password />
                </Form.Item>}
                <Form.Item name={'phone'} label="手机号" rules={[
                    { required: true, message: "请输入手机号" }, 
                    { len: 11, message: "请输入正确的手机号" },]} >
                    <Input status={inputStatus} maxLength={11} onChange={() => setInputState('')} disabled={user}/>
                </Form.Item>
                <Form.Item name={'region'} label="所属区域" rules={[{ required: true, message: "请选择所属区域"  }]}>
                    <Select  onChange={(value: number) => form.setFieldsValue({ region: value })}>
                        {regionList.map((item: any, index: number) => {
                            return <Option key={index + 1} value={index + 1}>{item}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name={'role'} label="权限角色" rules={[{ required: true, message: "请选择权限角色"  }]}>
                    <Select onChange={(value: number) => form.setFieldsValue({ role: value })}>
                        {roleList.map((item: any) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
