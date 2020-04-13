import React from 'react'
import './index.less'
import axios from 'axios'
import {Row, Col, Icon, InputNumber, Button, message} from 'antd';
import utils from "../../utils/utils";


export default class BuyBook extends React.Component {
    state = {
        //图书信息
        bookContent: {},
        value: 0,
        username: '',
        // 用户信息
        data: {}
    };

    componentDidMount() {
        axios.get('http://localhost:9000/buyBooks/' + this.props.match.params.id).then((res) => {
            const result = res.data;
            this.setState({
                bookContent: result
            })
        })
        let data = localStorage.getItem('token');
        let username = JSON.parse(data).id;
        this.setState({
            username,
            data
        })
    }

    //获取inputNumber的value值
    handelInputNumber = (val) => {
        //val永远都是number，不需要判断
        this.setState({value: val});

    };
    //加入购物车
    handelAddCar = () => {
        let history = this.props.history;
        let book = this.state.bookContent;
        let sum = this.state.value;
        let username = this.state.username;
        axios.post('http://localhost:9000/addBook/' + book.id + '/' + sum + '/' + username).then(res => {
            if (res.data.flag == 1) {
                message.success('成功加入购物车');
            }
        }).then(()=>{
            //
            history.push('/shoppingCar');
        });

    };
    //购买图书
    handelBuy = () => {
        const {value, data, bookContent} = this.state;
        let orderBook = bookContent.b_name;
        let price = bookContent.b_price;
        let orderUser = JSON.parse(data).username;
        let orderAmount = value;
        let orderPrice = price*value;
        let orderTime = utils.formateDate(new Date().getTime());
        let orderAddress = JSON.parse(data).address;
        let orderState = '未派发';
        let oData = {orderBook, orderUser,orderPrice, orderAmount, orderTime, orderAddress, orderState};
        let orderData = JSON.stringify(oData);
        axios.post('http://localhost:9000/createOrder/' + `${orderData}`).then(res => {
            if (res.data.flag == 1) {
                message.success('购买成功！');
            }
        }).then(()=>{
            let history = this.props.history;
            history.push('/userOrder');
        });

    };

    render() {
        //解构赋值，把变量提到外面来
        const {b_name, b_amount, b_img, b_desc, b_price} = this.state.bookContent;
        return (
            <div className='buyWrap'>
                <p>{b_name}</p>
                <Row className='buyContainer'>
                    <Col span={10} style={{borderRight: '1px dashed #eee', paddingRight: '10px'}}>
                        <img src={b_img} alt=""/>
                    </Col>
                    <Col span={13}>
                        <p>{b_desc}</p>
                        <div className='priceWrap'>
                            <span>促销价</span>
                            <span className='money'>
                                <Icon type="money-collect" style={{fontSize: '16px', marginRight: '8px'}}/>
                                {b_price}
                            </span>
                        </div>
                        <div className='tb_skin'>
                            <span>数量</span>
                            {b_amount && <InputNumber min={0}
                                                      defaultValue={0}
                                                      max={b_amount}
                                                      onChange={this.handelInputNumber}
                            />}
                            <span style={{paddingLeft: '20px'}}>库存{b_amount}件</span>
                            <div className='skin_btn'>
                                <Button type="danger" onClick={this.handelAddCar}>加入购物车</Button>

                                <Button type="danger" onClick={this.handelBuy}>立即购买</Button>


                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}