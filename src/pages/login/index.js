import React from "react";
import './index.less'
import {Form, Input, Button, message, Icon, Select,} from 'antd'
import axios from 'axios'
import {Link} from 'react-router-dom'


const FormItem = Form.Item;
const Option = Select.Option;

class Login extends React.Component {
    state = {
        userList: []
    };


    //校验
    handleSubmit = () => {
        //可以获取到所有表单的值
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = JSON.stringify(values);
                axios.post('http://localhost:9000/login/' + `${data}`).then(res => {
                    const result = res.data;
                    let users = JSON.stringify(result);

                    if (values.username == result.username && values.password == result.password && values.type === result.r_type) {
                        message.success(`${result.username}恭喜你，登录成功`);
                        localStorage.setItem('token', `${users}`);
                        localStorage.setItem('loginState', 'true');
                        if (values.type == 1) {
                            window.location.replace('/userManagement');
                        } else {
                            window.location.replace('/home');
                        }

                    } else if (result == '') {
                        message.success('不存在这个用户，请注册');

                    } else {
                        message.success(`账号或密码错误，请重新输入`);

                    }
                });


            }
        })


    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='loginWrapper'>
                <div className='main'>
                    <h4>请登录</h4>
                    <div className='sign'>
                        <Form>
                            <FormItem>
                                {
                                    getFieldDecorator('username', {
                                        initialValue: '',

                                    })(
                                        <Input placeholder='请输入用户名' prefix={<Icon type='user'></Icon>}></Input>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
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
                                        <Input placeholder='请输入密码' prefix={<Icon type='lock'></Icon>}></Input>
                                    )
                                }
                            </FormItem>
                            <FormItem style={{width: '100px'}}>
                                {
                                    getFieldDecorator('type', {
                                        initialValue: 1
                                    })(
                                        <Select>
                                            <Option value={1}>管理员</Option>
                                            <Option value={2}>用户</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>
                                登录
                            </Button>
                            <Link to='/register'>
                                <Button type="primary">
                                    注册
                                </Button>
                            </Link>


                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Login);