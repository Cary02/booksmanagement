import React from 'react'
import './index.less'
import ETable from "../../components/ETable";
import Utils from '../../utils/utils';
import axios from 'axios';
import {Card, Button, Modal, Form, Input} from 'antd'

const FormItem = Form.Item;


export default class BookManagement extends React.Component {
    state = {
        list: [],
        isVisible: false
    };

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        axios.get('http://localhost:9000/books').then(res => {
            const result = res.data;
            this.setState({
                list: result
            })
        })
    }

    // 功能区操作
    handleOperation = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '上架图书'
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择图书'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑图书',
                bookInfo: item
            })
        } else if (type == 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: '图书详情',
                bookInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择图书'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认下架',
                content: '是否要下架当前选中的图书',
                onOk() {
                    axios.delete('http://localhost:9000/deleterBook/' + item.id).then((res) => {
                        if (res.data.flag == 1) {
                            _this.setState({
                                isVisible: false,
                            });
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }
    //添加图书
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.bookFrom.props.form.getFieldsValue();
        if (type == 'create') {
            axios.post('http://localhost:9000/addBook', data).then((res) => {
                if (res.data.flag == 1) {
                    this.bookFrom.props.form.resetFields();
                    this.setState({
                        isVisible: false
                    })
                    this.requestList();
                }
            })
        } else {
            axios.put('http://localhost:9000/editBook', data).then((res) => {
                if (res.data.flag == 1) {
                    this.bookFrom.props.form.resetFields();
                    this.setState({
                        isVisible: false
                    });
                    this.requestList();
                }
            })
        }
    };
    //查询图书
    handelSearch = () => {
        let data = this.searchFrom.props.form.getFieldsValue();
        axios.get('http://localhost:9000/books/' + data.id).then((res) => {
            const data = res.data;
            this.setState({
                list: data
            })
        })
    };

    render() {
        //渲染表头
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '图书名称',
                dataIndex: 'b_name'
            }, {
                title: '图书作者',
                dataIndex: 'b_author'
            },
            {
                title: '图书描述',
                dataIndex: 'b_desc',

            },
            {
                title: '图书类型',
                dataIndex: 'b_type'
            }, {
                title: '图书数量',
                dataIndex: 'b_amount'
            }, {
                title: '图书图片',
                dataIndex: 'b_img',

            }, {
                title: '图书金额',
                dataIndex: 'b_price'
            }
        ];
        let footer = {};

        return (
            <div>
                <Card className="operate-wrap">
                    <div style={{width: '200px'}}>
                        <SearchFrom searchInfo={this.state.searchInfo}
                                    wrappedComponentRef={(inst) => {
                                        this.searchFrom = inst;
                                    }
                                    }

                        >
                        </SearchFrom>
                        <Button type='primary' onClick={this.handelSearch} style={{}}>查询</Button>
                    </div>

                </Card>
                <Card style={{marginTop: 10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperation('create')}>上架图书</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperation('edit')}>编辑图书</Button>
                    <Button type="primary" onClick={() => this.handleOperation('detail')}>图书详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperation('delete')}>下架图书</Button>
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
                        this.bookFrom.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <BookFrom type={this.state.type} bookInfo={this.state.bookInfo} wrappedComponentRef={(inst) => {
                        this.bookFrom = inst;
                    }}/>
                </Modal>
            </div>
        );
    }
}

class SearchFrom extends React.Component {
    render() {
        let searchInfo = this.props.searchInfo || {};
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="图书名称">
                    {
                        getFieldDecorator('id', {
                            initialValue: searchInfo.id
                        })(
                            <Input type="text" placeholder="请输入图书名称"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }

}

SearchFrom = Form.create({})(SearchFrom);

class BookFrom extends React.Component {

    render() {
        let type = this.props.type;
        let bookInfo = this.props.bookInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="id" {...formItemLayout} style={{display: 'none'}}>
                    {
                        type == 'detail' ? bookInfo.id :
                            getFieldDecorator('id', {
                                initialValue: bookInfo.id
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="图书名称" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_name :
                            getFieldDecorator('b_name', {
                                initialValue: bookInfo.b_name
                            })(
                                <Input type="text" placeholder="请输入图书名称"/>
                            )
                    }
                </FormItem>
                <FormItem label="图书作者" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_author :
                            getFieldDecorator('b_author', {
                                initialValue: bookInfo.b_author
                            })(
                                <Input type="text" placeholder="请输入图书作者"/>
                            )
                    }
                </FormItem>
                <FormItem label="图书描述" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_desc :
                            getFieldDecorator('b_desc', {
                                initialValue: bookInfo.b_desc
                            })(
                                <Input type="text" placeholder="请输入图书的描述"/>
                            )
                    }
                </FormItem>
                <FormItem label="图书类型" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_type :
                            getFieldDecorator('b_type', {
                                initialValue: bookInfo.b_type
                            })(
                                <Input type="text" placeholder="请输入图书的类型"/>
                            )
                    }
                </FormItem>

                <FormItem label="图书数量" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_amount :
                            getFieldDecorator('b_amount', {
                                initialValue: bookInfo.b_amount
                            })(
                                <Input type="text" placeholder="请输入图书数量"/>
                            )
                    }
                </FormItem>

                <FormItem label="图书图片" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_img :
                            getFieldDecorator('b_img', {
                                initialValue: bookInfo.b_img
                            })(
                                <Input type='text' placeholder="请输入图书图片地址"/>
                            )
                    }
                </FormItem>
                <FormItem label="图书金额" {...formItemLayout}>
                    {
                        type == 'detail' ? bookInfo.b_price :
                            getFieldDecorator('b_price', {
                                initialValue: bookInfo.b_price
                            })(
                                <Input type="text" placeholder="请输入图书金额"/>
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}

BookFrom = Form.create({})(BookFrom);