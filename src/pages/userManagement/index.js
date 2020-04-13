import React from 'react'
import './index.less'
import ETable from "../../components/ETable";
import Utils from '../../utils/utils';
import axios from 'axios';
import {Card, Button, Modal, Form, Input, Select, message} from 'antd'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class UserManagement extends React.Component {
    state = {
        list: [],
        isVisible:false
    };

    componentDidMount() {
        this.requestList();
    }
    requestList= ()=>{
        axios.get('http://localhost:9000/users').then(res => {
            const result = res.data;
            this.setState({
                list: result
            })
        })
    }

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type == 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                });
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中的员工',
                onOk() {
                    axios.delete('http://localhost:9000/deleterUser/'+item.id).then((res)=>{
                        if(res.data.flag ==1){
                            _this.setState({
                                isVisible:false,
                            });
                            _this.requestList();
                        }
                    });
                    message.success('删除成功!')
                }
            })
        }
    }
    //创建员工
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        if (type=='create') {
            axios.post('http://localhost:9000/addUser',data).then((res)=>{
                if(res.data.flag ==1){
                    this.userForm.props.form.resetFields();
                    this.setState({
                        isVisible:false
                    })
                    this.requestList();
                }
            })
        }else {
            axios.put('http://localhost:9000/editUser',data).then((res)=>{
                if(res.data.flag ==1){
                    this.userForm.props.form.resetFields();
                    this.setState({
                        isVisible:false
                    })
                    this.requestList();
                }
            })
        }


    }
    render() {
        //渲染表头
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '密码',
                dataIndex: 'password'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '年龄',
                dataIndex: 'age'
            }, {
                title: '角色',
                dataIndex: 'r_type',
                render(r_type) {
                    return r_type == 1 ? '管理员' : '普通用户'
                }
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '邮箱',
                dataIndex: 'Email'
            }, {
                title: '电话',
                dataIndex: 'number'
            }
        ];
        let footer = {};

        return (
            <div>
                <Card style={{marginTop: 10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建用户</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑用户</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>用户详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除用户</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => {
                        this.userForm = inst;
                    }}/>
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component {
    getState = (state)=>{
        return {
            '1': '管理员',
            '2': '用户'
        }[state]
    };
    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="id" {...formItemLayout}  style={{display:'none'}}>
                    {
                        type == 'detail' ? userInfo.id :
                            getFieldDecorator('id', {
                                initialValue: userInfo.id
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.username :
                            getFieldDecorator('username', {
                                initialValue: userInfo.username,
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    },
                                ]
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.password :
                            getFieldDecorator('password', {
                                initialValue: userInfo.password,
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空'
                                    },
                                    {
                                        min: 3, max: 6,
                                        message: '请输入正确的长度'
                                    }
                                ]
                            })(
                                <Input type="text" placeholder="请输入密码"/>
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex,
                                rules: [
                                    {
                                        required: true,
                                        message: '性别不能为空'
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )
                    }
                </FormItem>

                <FormItem label="年龄" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.age :
                            getFieldDecorator('age', {
                                initialValue: userInfo.age,
                                rules: [
                                    {
                                        required: true,
                                        message: '年龄不能为空'
                                    }
                                ]
                            })(
                                <Input type="text" placeholder="请输入年龄"/>
                            )
                    }
                </FormItem>

                <FormItem label="角色" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.r_type) :
                            getFieldDecorator('r_type',{
                                initialValue: userInfo.r_type,
                                rules: [
                                    {
                                        required: true,
                                        message: '角色不能为空'
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value={1}>管理员</Option>
                                    <Option value={2}>用户</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address,
                                rules: [
                                    {
                                        required: true,
                                        message: '地址不能为空'
                                    },{
                                        min: 3, max: 6,
                                        message: '请输入正确的长度'
                                    }
                                ]
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.Email :
                            getFieldDecorator('Email', {
                                initialValue: userInfo.Email,
                                rules: [
                                    {
                                        required: true,
                                        message: '邮箱不能为空'
                                    },{
                                        len:11,
                                        message: '请输入正确的长度'
                                    }
                                ]
                            })(
                                <Input type="text" placeholder="请输入E-mail"/>
                            )
                    }
                </FormItem>
                <FormItem label="电话" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.number :
                            getFieldDecorator('number', {
                                initialValue: userInfo.number,
                                rules: [
                                    {
                                        required: true,
                                        message: '电话不能为空'
                                    },{
                                        len:11,
                                        message: '请输入正确的长度'
                                    }
                                ]
                            })(
                                <Input type="text" placeholder="请输入电话号码"/>
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}

UserForm = Form.create({})(UserForm);