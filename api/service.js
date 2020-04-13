/*
* 业务模块
* */

const db = require('./base');



//渲染主界面
exports.showAllBooks = (req, res) => {
    let sql = 'select * from book';
    db.base(sql, null, (result) => {
        res.json(result);
    })
};
//根据图书类型渲染图书
exports.getBookByType = (req, res) => {
    let type = req.params.type;
    let b_type = "'"+ type+"'";
    let sql = 'select * from book where b_type = '+b_type+'';
    db.base(sql, null, (result) => {
        res.json(result);
    });
};
//进入购买详情页
exports.showIdBook = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from book where id=?';
    let data = [id];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
};


//渲染user表
exports.showAllUsers = (req, res) => {
    let sql = 'select * from user';
    db.base(sql, null, (result) => {
        res.json(result);
    })
};
//添加用户
exports.addUsers = (req, res) => {
    let info = req.body;
    let sql = 'insert into user set?';
    db.base(sql, info, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    })
};
//用户更新资料
exports.updateUsers = (req, res) => {
    let info = JSON.parse(req.params.data);
    let sql = 'update user set username=?,password=?,r_type=?,age=?,sex=?,Email=?,address=?,number=? where id =?';
    let data = [info.username, info.password, info.r_type, info.age, info.sex, info.Email, info.address, info.number, info.id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    });
};
//编辑信息，提交表单
exports.editUsers = (req, res) => {
    let info = req.body;
    let sql = 'update user set username=?,password=?,r_type=?,age=?,sex=?,Email=?,address=?,number=? where id =?';
    let data = [info.username, info.password, info.r_type, info.age, info.sex, info.Email, info.address, info.number, info.id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    });
};

//删除员工
exports.deleteUsers = (req, res) => {
    let id = req.params.id;
    let sql = 'delete from user where id=?';
    let data = [id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    })
};

//渲染book表
exports.showAllBooks = (req, res) => {
    let sql = 'select * from book';
    db.base(sql, null, (result) => {
        res.json(result);
    })
};
//查询图书
exports.getBookByName = (req, res) => {
    let name = req.params.name;
    let b_name = "'"+ name+"'";
    let sql = 'select * from book where b_name = '+b_name+'';
    db.base(sql, null, (result) => {
        res.json(result);
    });
};
//添加图书
exports.addBooks = (req, res) => {
    let info = req.body;
    let sql = 'insert into book set?';
    db.base(sql, info, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    })
};
//编辑图书，提交表单
exports.editBooks = (req, res) => {
    let info = req.body;
    let sql = 'update book set b_name=?,b_author=?,b_desc=?,b_type=?,b_amount=?,b_img=?,b_price=? where id =?';
    let data = [info.b_name, info.b_author, info.b_desc, info.b_type, info.b_amount, info.b_img, info.b_price, info.id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    });
};

//删除图书
exports.deleteBooks = (req, res) => {
    let id = req.params.id;
    let sql = 'delete from book where id=?';
    let data = [id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    })
};

//渲染订单列表
exports.showAllOrders = (req, res) => {
    let sql = 'select * from orders';
    db.base(sql, null, (result) => {
        res.json(result);
    })
};
//编辑订单，提交表单

exports.editOrders = (req, res) => {
    let id = req.params.orderId;
    let sql = "update orders set orderState='已派发' where orderId =?";
    let data = [id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    });
};

//登录
exports.loginIn = (req, res) => {
    let data = JSON.parse(req.params.data);
    let name = data.username;

    let sql = "select * from user where username = '" + name + "'";
    db.base(sql, null, (result) => {
        res.json(result[0]);
    });
};
//渲染购物车
exports.showAllCar = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from shoppingCar where u_id = ?';
    let data = [id];
    db.base(sql, data, (result) => {
        res.json(result)
    })
};
//加入购物车
exports.addBookToCar = (req, res) => {
    let bookId = req.params.bookId;
    let sum = req.params.sum;
    let username = req.params.username;
    let sql = 'select * from book where id =?';
    let data = [bookId];
    db.base(sql, data, (req, err) => {
        if (!err) {
            //一个对象标记，让前端知道是否成功
            let book = req[0].b_name;
            let desc = req[0].b_desc;
            let img = req[0].b_img;
            let amount = sum;
            let u_id = username;
            let price = req[0].b_price;
            let data = {book, desc, price, amount, u_id, img};
            let sql = 'insert into shoppingCar set?';
            db.base(sql, data, (result => {
                if (result.affectedRows == 1) {
                    //一个对象标记， 让前端知道是否成功
                    res.json({flag: 1})
                } else {
                    res.json({flag: 2});

                }
            }))
        }
    })
};

//删除购物车
exports.deleteCar = (req, res) => {
    let id = req.params.id;
    let sql = 'delete from shoppingCar where id =?';
    let data = [id];
    db.base(sql, data, result => {
        if (result.affectedRows == 1) {
            res.json({flag: 1})
        } else {
            res.json({flag: 2})
        }
    })
};
//结算购物车
exports.settleCar = (req, res) => {
    let arr = [];
    let data = JSON.parse(req.params.carList);
    data.map((item) => {
        let orderBook = item.book;
        let orderUser = item.username;
        let orderAmount = item.amount;
        let orderPrice = item.price * orderAmount;
        let orderTime = item.time;
        let orderAddress = item.address;
        let orderState = '未发货';
        let data = {orderBook, orderUser, orderPrice, orderAmount, orderTime, orderAddress, orderState};
        arr.push(data);
    });
    let arrStr = [];
    let insertSql = '';
    arr.map(item => {
        let orderBook = "'" + item.orderBook + "'";
        let orderUser = "'" + item.orderUser + "'";
        let orderAddress = "'" + item.orderAddress + "'";
        let orderState = "'" + item.orderState + "'";
        let orderTime = "'" + item.orderTime + "'";
        insertSql = "(" + orderBook + "," + orderUser + "," + item.orderPrice + "," + item.orderAmount + "," + orderTime + "," + orderAddress + "," + orderState + ")";
        arrStr.push(insertSql);
    });

    let sql = "insert into orders (orderBook,orderUser,orderPrice,orderAmount,orderTime,orderAddress,orderState) values " + arrStr.toString() + "";

    db.base(sql, null, (result) => {

        if (result) {
            // 清空购物车
            let sql = 'TRUNCATE TABLE shoppingCar';
            db.base(sql, null, (result) => {
                res.json({flag: 1})
            });

        } else {
            res.json({flag: 2});
        }
    })
};

//购买成功，加入订单
exports.addBookToOrder = (req, res) => {
    let data = JSON.parse(req.params.data);
    let sql = 'insert into orders set?';
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            //一个对象标记，让前端知道是否成功
            res.json({flag: 1});
        } else {
            res.json({flag: 2});
        }
    })
};
//根据用户加载订单
exports.getOrderByName = (req, res) => {
    let orderUser = req.params.name;
    let sql = "select * from orders where orderUser = '" + orderUser + "'  ";
    db.base(sql, null, (result) => {
        res.json(result);
    });
};
//删除订单
exports.deleteOrder = (req, res) => {
    let id = req.params.id;
    let sql = 'delete from orders where orderId =?';
    let data = [id];
    db.base(sql, data, result => {
        if (result.affectedRows == 1) {
            res.json({flag: 1})
        } else {
            res.json({flag: 2})
        }
    })
};