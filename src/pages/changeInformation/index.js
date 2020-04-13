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

class ChangeInformation extends React.Component {
    state = {
        userInfo: {}
    };

    componentDidMount() {
        this.getUserToken();
    }
    getUserToken = ()=>{
        let userInfo = JSON.parse(localStorage.getItem('token'));
        this.setState({
            userInfo
        })
    }

    handleSubmit = () => {
        //可以获取到所有表单的值
        const {form} = this.props;
        let info = form.getFieldsValue();
        axios.put('http://localhost:9000/updateUser/' + `${JSON.stringify(info)}`).then(res=>{
            if (res.data.flag==1) {
                message.success('修改成功');
                localStorage.setItem('token',`${JSON.stringify(info)}`);
                this.getUserToken();
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {id,username, password, r_type, age, sex, Email, address, number} = this.state.userInfo;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        return (
            <div className='formWrap'>
                <Form {...formItemLayout}>
                    <Form.Item label="id" hasFeedback style={{display:'none'}}>
                        {getFieldDecorator('id', {
                            initialValue:id,

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        label={<span>姓名&nbsp;
                            <Tooltip title="What do you want others to call you?"></Tooltip>
                                </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            initialValue: username,
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            initialValue:password,

                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="角色" hasFeedback>
                        {getFieldDecorator('r_type', {
                            initialValue: r_type,

                        })(<Input type="text" disabled={true}/>)}
                    </Form.Item>
                    <Form.Item label="年龄" hasFeedback>
                        {getFieldDecorator('age', {
                            initialValue:age,

                        })(<Input type="text"/>)}
                    </Form.Item>
                    <Form.Item label="性别" hasFeedback>
                        {
                            getFieldDecorator('sex', {
                                initialValue: sex==1?'男': '女'
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
                            initialValue:Email,

                        })(<Input type="text"/>)}
                    </Form.Item>

                    <Form.Item label="收货地址">
                        {getFieldDecorator('address', {
                            initialValue: address,

                        })(<Input type="text"/>)}
                    </Form.Item>
                    <Form.Item label="电话号码">
                        {getFieldDecorator('number', {
                            initialValue:number,

                        })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            保存更新
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(ChangeInformation)