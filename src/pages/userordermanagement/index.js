import React from 'react'
import './index.less'
import ETable from "../../components/ETable";
import Utils from '../../utils/utils';
import axios from 'axios';
import {Card, Button, Modal, Form, Input, Radio, DatePicker, Select} from 'antd'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class OrderManagement extends React.Component {
    state = {
        list: [],
        isVisible: false
    };

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let data = JSON.parse(localStorage.getItem('token'));
        let username = data.username;
        axios.get('http://localhost:9000/getOrder/'+`${username}`).then(res => {
            const result = res.data;
            this.setState({
                list: result
            })
        })
    }

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;

        if (type == 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: '订单详情',
                orderInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个订单'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前订单',
                onOk() {
                    axios.delete('http://localhost:9000/deleteOrder/' + item.orderId).then((res) => {
                        if (res.data.flag == 1) {
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    render() {
        //渲染表头
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
            },
            {
                title: '图书信息',
                dataIndex: 'orderBook'
            },
            {
                title: '订单数量',
                dataIndex: 'orderAmount'
            },
            {
                title: '支付金额',
                dataIndex: 'orderPrice'
            },
            {
                title: '下单时间',
                dataIndex: 'orderTime'
            },
            {
                title: '配送地址',
                dataIndex: 'orderAddress',

            },
            {
                title: '配送状态',
                dataIndex: 'orderState',

            }
        ];

        let footer = {};
        // if(this.state.type == 'detail'){
        //     footer = {
        //         footer: null
        //     }
        // }
        return (
            <div>
                <Card style={{marginTop: 10}} className="operate-wrap">

                    <Button type="primary" onClick={() => this.handleOperate('detail')}>订单详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除订单</Button>
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
                        this.orderForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <OrderForm type={this.state.type} orderInfo={this.state.orderInfo} wrappedComponentRef={(inst) => {
                        this.orderForm = inst;
                    }}/>
                </Modal>
            </div>
        );
    }
}

class OrderForm extends React.Component {


    render() {
        let type = this.props.type;
        let orderInfo = this.props.orderInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="订单编号" {...formItemLayout} style={{display: 'none'}}>
                    {
                        type == 'detail' ? orderInfo.orderId :
                            getFieldDecorator('orderId', {
                                initialValue: orderInfo.orderId
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="订单书名" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderBook :
                            getFieldDecorator('orderBook', {
                                initialValue: orderInfo.orderBook
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="支付金额" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderPrice :
                            getFieldDecorator('orderPrice', {
                                initialValue: orderInfo.orderPrice
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>

                <FormItem label="订单数量" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderAmount:
                            getFieldDecorator('orderAmount', {
                                initialValue: orderInfo.orderAmount
                            })(
                                <Input type="text" placeholder="请输入密码"/>
                            )
                    }
                </FormItem>

                <FormItem label="下单时间" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderTime :
                            getFieldDecorator('orderTime', {
                                initialValue: orderInfo.orderTime
                            })(
                                <Input type="text" placeholder="请输入年龄"/>
                            )
                    }
                </FormItem>


                <FormItem label="配送地址" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderAddress :
                            getFieldDecorator('orderAddress', {
                                initialValue: orderInfo.orderAddress
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
                <FormItem label="配送状态" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderState :
                            getFieldDecorator('orderState', {
                                initialValue: orderInfo.orderState
                            })(
                                <Input type="text" placeholder="请输入E-mail"/>
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}

OrderForm = Form.create({})(OrderForm);