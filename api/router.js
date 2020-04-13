/*
* 路由
* */

const express = require('express');
const service = require('./service');
// const app = express();
const router = express.Router();
//渲染主界面
router.get('/home',service.showAllBooks);
//点击商品进入购买页
router.get('/buyBooks/:id', service.showIdBook);
//渲染user表
router.get('/users',service.showAllUsers);
//创建用户
router.post('/addUser',service.addUsers);
//用户更新信息
router.put('/updateUser/:data',service.updateUsers);
//编辑用户信息，提交表单
router.put('/editUser',service.editUsers);
//删除员工
router.delete('/deleterUser/:id',service.deleteUsers);

//渲染book表
router.get('/books',service.showAllBooks);
//根据图书名称查询图书
router.get('/books/:name',service.getBookByName);
//根据图书类型渲染图书图书
router.get('/getBooks/:type',service.getBookByType);
//添加图书
router.post('/addBook',service.addBooks);
//编辑图书信息，提交表单
router.put('/editBook',service.editBooks);
//删除图书
router.delete('/deleterBook/:id',service.deleteBooks);

//渲染订单列表
router.get('/orders',service.showAllOrders);
//派发订单
router.put('/editOrder/:orderId',service.editOrders);

//登录
router.post('/login/:data',service.loginIn);
//渲染购物车
router.get('/shoppingCar/:id',service.showAllCar);
//加入购物车
router.post('/addBook/:bookId/:sum/:username',service.addBookToCar);
//删除购物车
router.delete('/deleteCar/:id',service.deleteCar);
//结算购物车
router.post('/settleCar/:carList',service.settleCar);

// 根据用户加载订单
router.get('/getOrder/:name',service.getOrderByName);
//生成订单
router.post('/createOrder/:data',service.addBookToOrder);
//删除订单
router.delete('/deleteOrder/:id',service.deleteOrder);
module.exports = router;