import Mock from 'mockjs'
Mock.mock('/api/user/login.json', {
  "status": 0,
  "data": {
    "id|1-3": 0,
    "username": "@cname",
    "email": "admin@51purse.com",
    "phone": null,
    "role": 0,
    "createTime": 1479048325000,
    "updateTime": 1479048325000
  }
})