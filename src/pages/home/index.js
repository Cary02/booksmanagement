import React from 'react'
import axios from 'axios'
import './index.less'
import {Link} from "react-router-dom";
import {Input, Select} from 'antd'

const Search = Input.Search;
const Option = Select.Option;

export default class Home extends React.Component {
    state = {
        content: [],
        bookType: ''
    };

    componentDidMount() {
        axios.get('http://localhost:9000/home').then(res => {
            const result = res.data;
            this.setState({
                content: result
            })
        })
    }

    handleChange = (value) => {
        console.log(value);
        value == 'allBook' ? axios.get('http://localhost:9000/home').then(res => {
                const result = res.data;
                this.setState({
                    content: result
                })
            }) :
            axios.get('http://localhost:9000/getBooks/' + value).then(res => {
                const result = res.data;
                this.setState({
                    content: result
                })
            })


    };
    handelSearch = (value)=>{
        axios.get('http://localhost:9000/books/' + value).then(res => {
            const result = res.data;
            this.setState({
                content: result
            })
        })
    };

    render() {

        return (
            <div>
                <div className='bookType'>
                    <div className='searchWrap'>
                        <div style={{width: '800px'}}>
                            <Search
                                placeholder="请输入想要搜索的书名"
                                enterButton="Search"
                                size="large"
                                onSearch={(value)=>{this.handelSearch(value)}}
                            />
                        </div>
                    </div>
                    <span style={{marginLeft: '20px'}}>图书类型</span>
                    <Select defaultValue="全部图书" style={{width: 120}} onChange={(value) => {
                        this.handleChange(value)
                    }}>
                        <Option value="allBook">全部图书</Option>
                        <Option value="文学">文学</Option>
                        <Option value="漫画">漫画</Option>
                        <Option value="艺术">艺术</Option>
                        <Option value="科技">科技</Option>
                    </Select>
                </div>

                {
                    this.state.content.map((item, i) => {
                        const {b_img, b_desc, b_name, b_author, b_price} = item;
                        return (
                            <Link to={'/buyBooks/' + item.id} key={i}>

                                <div className='contentList'>
                                    <div className='content-img'>
                                        <img src={b_img}
                                             alt=""/>
                                    </div>
                                    <div className="content">
                                        <div className='content-desc'>
                                            <p style={{textIndent: '15px'}}>{b_desc}</p>
                                        </div>
                                        <p className='bookName'>书名:{b_name}</p>
                                        <p className='title'>作者: {b_author}</p>
                                        <p className='price'>价格: {b_price}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}