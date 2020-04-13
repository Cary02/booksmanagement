
import React from 'react'
import './index.less'
import axios from 'axios'
import {
    Form,
    Input,
    Tooltip,
    Select,
    Button, message,
} from 'antd';

const {Option} = Select;


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Register extends React.Component {


    handleSubmit = () => {
        //可以获取到所有表单的值
        let history = this.props.history;
        const {form} = this.props;
        let info = form.getFieldsValue();
        axios.post('http://localhost:9000/addUser', info).then(res=>{
            if (res.data.flag==1) {
                message.success('注册成功,请登录');
            }
        }).then(()=>{
            history.push('/login');
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className='formWrap'>
                <Form {...formItemLayout}>

                    <Form.Item
                        label={<span>姓名&nbsp;
                            <Tooltip title="What do you want others to call you?"></Tooltip>
                                </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                },
                            ]
                        })(<Input placeholder='请输入您的用户名'/>)}
                    </Form.Item>

                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            initialValue:'',
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

                        })(<Input.Password placeholder='请输入您的密码'/>)}
                    </Form.Item>
                    <Form.Item label="角色" {...formItemLayout}>
                        {
                                getFieldDecorator('r_type',{
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true,
                                            message: '角色不能为空'
                                        }
                                    ]
                                })(
                                    <Select>
                                        <Option value={1}>管理员</Option>
                                        <Option value={2}>普通用户</Option>
                                    </Select>
                                )
                        }
                    </Form.Item>
                    <Form.Item label="年龄" hasFeedback>
                        {getFieldDecorator('age', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: '年龄不能为空'
                                }
                            ]
                        })(<Input type="text" placeholder='请输入您的年龄'/>)}
                    </Form.Item>
                    <Form.Item label="性别" hasFeedback>
                        {
                            getFieldDecorator('sex', {
                                initialValue:'',
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
                    </Form.Item>

                    <Form.Item label="E-mail">
                        {getFieldDecorator('Email', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: '邮箱不能为空'
                                },{
                                    len:7,
                                    message: '请输入正确的长度'
                                }
                            ]
                        })(<Input type="text" placeholder='请输入您的邮箱地址'/>)}
                    </Form.Item>

                    <Form.Item label="收货地址">
                        {getFieldDecorator('address', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '地址不能为空'
                                },{
                                    min: 3, max: 6,
                                    message: '请输入正确的长度'
                                }
                            ]
                        })(<Input type="text" placeholder='请输入您的收货地址'/>)}
                    </Form.Item>
                    <Form.Item label="电话号码">
                        {getFieldDecorator('number', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: '电话不能为空'
                                },{
                                    len:11,
                                    message: '请输入正确的长度'
                                }
                            ]
                        })(<Input placeholder='请输入您的号码'/>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            注册用户
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Register)