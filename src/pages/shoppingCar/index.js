import React from 'react'
import './index.less'
import {Card, Icon, InputNumber, Button, message} from 'antd';
import axios from 'axios';
import utils from "../../utils/utils";

export default class ShoppingCar extends React.Component {
    state = {
        carList: [],
        data:'',
        sum:''
    };

    componentDidMount() {
        this.showCar();
    }

    //渲染购物车
    showCar = () => {
        let data = localStorage.getItem('token');
        let userList = JSON.parse(data);
        this.setState({
            data
        });
        axios.get('http://localhost:9000/shoppingCar/' + userList.id).then(res => {
            const result = res.data;
            this.setState({
                carList: result
            });

            let sum = 0;
            result.map((item) => {
                sum += (item.amount * item.price);
            });
            this.setState({
                sum
            });
        });
    };
    // 删除购物车
    handelDelete = (i) => {

        axios.delete('http://localhost:9000/deleteCar/' + this.state.carList[i].id).then(res => {
            if (res.data.flag == 1) {
                message.success('删除成功！');
                this.showCar();

            }
        })
    };
    //结算
    handelSettle = () => {
        let history = this.props.history;

        const {data} = this.state;
        let arr = [];
        this.state.carList.map((item)=>{
            delete item.img;
            item.time =utils.formateDate(new Date().getTime());
            item.address = JSON.parse(data).address;
            item.username = JSON.parse(data).username;
            arr.push(item);
        });

            axios.post('http://localhost:9000/settleCar/'+ `${JSON.stringify(arr)}`).then(res => {
                if (res.data.flag==1) {
                    message.success('您已经成功支付');
                    this.showCar();
                    history.push('/userOrder');
                }
            })


    };

    render() {
        return (
            <div className='carWrap'>
                <p style={{textAlign: 'start'}}>全部商品</p>
                {
                    this.state.carList.map((item, i) => {

                        return (
                            <div className='car_item' key={i}>
                                <Card>
                                    <ul>
                                        <li>
                                            <div className='item_desc'>
                                                <div className='desc_title'>
                                                    <p style={{fontSize: '14px', textAlign: 'start'}}>{item.book}</p>
                                                    {item.desc}
                                                </div>
                                                <img
                                                    src={item.img}
                                                    alt=""/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='item_price'>
                                                <Icon type="account-book"/> {item.price}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='item_amount'>
                                                <InputNumber min={0} max={100} defaultValue={item.amount} size='small'
                                                             />
                                            </div>
                                        </li>
                                        <li>
                                            <div className='item_total'>
                                                <Icon type="money-collect" style={{
                                                    fontSize: '16px',
                                                    marginRight: '8px'
                                                }}/>{(item.amount * item.price)}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='item_del'>
                                                <Button type="link" onClick={() => {
                                                    this.handelDelete(i)
                                                }}>
                                                    删除
                                                </Button>
                                            </div>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        )
                    })
                }

                <div className='total_car'>
                    <span style={{paddingRight: '20px'}}>合计金额：{this.state.sum}</span>
                    <Button type='danger' onClick={this.handelSettle}>
                        结算
                    </Button>
                </div>


            </div>
        )
    }
}