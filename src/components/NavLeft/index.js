import React from 'react'
import './index.less'
import userMenuList from "../../menuConfig/userMenuConfig";
import adminMenuList from "../../menuConfig/adminMenuConfig";
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';
const { SubMenu } = Menu;


export default class NavLeft extends React.Component{
    componentWillMount() {

        if (localStorage.getItem('token')==null ||localStorage.getItem('loginState')==null) {
            const menuTreeNode = this.renderMenu(userMenuList);
            this.setState({
                menuTreeNode
            });

        }else {
            let user = localStorage.getItem('token');
            let userObj = JSON.parse(user);
            let userRole = userObj.r_type;

            if (userRole== 1) {
                const menuTreeNode = this.renderMenu(adminMenuList);
                this.setState({
                    menuTreeNode
                })
                // window.location.replace('/userManagement')
            }else if (userRole== 2){
                const menuTreeNode = this.renderMenu(userMenuList);
                this.setState({
                    menuTreeNode
                });

            }

        }



    }
// 菜单渲染
    renderMenu = (data)=>{
        return data.map((item)=>{
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key} >
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} style={{fontSize:'24px', marginTop:'30px'}}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
        })
    };
    render() {
        return (
            <div
            className='nav-left'>
                <div className='logo'>
                    <img src="http://img1.imgtn.bdimg.com/it/u=73949841,2432346826&fm=26&gp=0.jpg" alt=""/>
                    <h1>Books MS</h1>
                </div>
                <Menu theme={"dark"} style={{marginTop:'20px'}}>
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
};
