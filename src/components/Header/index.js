import React from 'react'
import './index.less'
import utils from '../../utils/utils'
import {Row, Col} from 'antd'
import {Link} from "react-router-dom";


export default class Header extends React.Component {
    state = {
        username: '',
        loginState: false
    };

    componentWillMount() {
    if (localStorage.getItem('token')==null ||localStorage.getItem('loginState')==null) {
            console.log('meiyou');
    }else {
        let user = localStorage.getItem('token');
        let loginState = localStorage.getItem('loginState');
        let userObj = JSON.parse(user);
        let username = userObj.username;
        this.setState({
            username,
            loginState
        });
    }

        //时间
        setInterval(() => {
            const sysDate = utils.formateDate(new Date().getTime());
            this.setState({
                sysDate
            })
        }, 1000)
    }
    //退出
    handelExit = () => {
        localStorage.clear();
        window.location.replace('/')
    };

    render() {
        const {username} = this.state;
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={18}>
                        网上图书销售管理系统
                    </Col>
                    <Col span={6}>
                        <span>欢迎，{username ? username : ''}</span>
                        {this.state.loginState ? <Link to="/home" onClick={this.handelExit}>退出</Link> :
                            <Link to="/login">登录</Link>}
                    </Col>
                </Row>
                <Row className='sysTime'>
                    {this.state.sysDate}
                </Row>
            </div>
        );
    }
}