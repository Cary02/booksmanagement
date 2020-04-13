import React from 'react'
import './index.less'
import ETable from "../../components/ETable";
import Utils from '../../utils/utils';
import axios from 'axios';
import {Card, Button, Modal, Form, Input, message} from 'antd'

const FormItem = Form.Item;


export default class AdminOrderManagement extends React.Component {
    state = {
        list: [],
        isVisible: false
    };

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        axios.get('http://localhost:9000/orders').then(res => {
            const result = res.data;
            this.setState({
                list: result
            })
        })
    };

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;

        if (type == 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                orderInfo: item
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
                title: '确认派送',
                content: '是否要派送当前订单',
                onOk() {
                    axios.put('http://localhost:9000/editOrder/' + item.orderId).then((res) => {
                        if (res.data.flag == 1) {
                            _this.requestList();
                        }
                    });
                    message.success('派发成功!')
                }
            })
        }
    }

    render() {
        //渲染表头
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderId'
            }, {
                title: '订单书名',
                dataIndex: 'orderBook'
            }, {
                title: '订单用户',
                dataIndex: 'orderUser'
            },
            {
                title: '订单数量',
                dataIndex: 'orderAmount',
            }, {
                title: '订单日期',
                dataIndex: 'orderTime'
            }, {
                title: '订单地址',
                dataIndex: 'orderAddress',
            }, {
                title: '订单状态',
                dataIndex: 'orderState'
            }
        ];
        let footer = {};

        return (
            <div>
                <Card style={{marginTop: 10}} className="operate-wrap">
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('order')}>派发订单</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>订单详情</Button>

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
                                <Input type="text" placeholder="请输入订单编号"/>
                            )
                    }
                </FormItem>
                <FormItem label="订单书名" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderBook :
                            getFieldDecorator('orderBook', {
                                initialValue: orderInfo.orderBook
                            })(
                                <Input type="text" placeholder="请输入订单书名"/>
                            )
                    }
                </FormItem>
                <FormItem label="订单用户" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderUser :
                            getFieldDecorator('orderUser', {
                                initialValue: orderInfo.orderUser
                            })(
                                <Input type="text" placeholder="请输入订单用户"/>
                            )
                    }
                </FormItem>
                <FormItem label="订单数量" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderAmount :
                            getFieldDecorator('orderAmount', {
                                initialValue: orderInfo.orderAmount
                            })(
                                <Input type="text" placeholder="请输入订单数量"/>
                            )
                    }
                </FormItem>

                <FormItem label="订单日期" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderTime :
                            getFieldDecorator('orderTime', {
                                initialValue: orderInfo.orderTime
                            })(
                                <Input type="text" placeholder="请输入订单日期"/>
                            )
                    }
                </FormItem>

                <FormItem label="订单地址" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderAddress :
                            getFieldDecorator('orderAddress', {
                                initialValue: orderInfo.orderAddress
                            })(
                                <Input rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
                <FormItem label="订单状态" {...formItemLayout}>
                    {
                        type == 'detail' ? orderInfo.orderState :
                            getFieldDecorator('orderState', {
                                initialValue: orderInfo.orderState
                            })(
                                <Input type="text" placeholder="请输入订单状态"/>
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}

OrderForm = Form.create({})(OrderForm);