1. 删除接口 
* 路径 /remove
* get  
前端发送数据的id值  
* 传递querystring数据  req.query


2. 修改借口 
* 路径 /alter
* post
* 前端先开发修改view页面 点击修改后 可以跳到修改页面 同时获得这一行的id值  再把id值发送给后端 后端更新数据库


3. 保存 
* 路径 /list/save
* post 
* 前端提交数据给后端 后端保存到数据库 并且放回给前端  
* 增加了图片提交 前端发送数据  后端设置中间件来处理图片 并将图片路径保存在数据库中 

4. 查找数据
* 路径 find 
* get req.query
* 接受前端的数据 进行查询 最多5条数据 可以是中文和数字

5. 翻页效果
* 路径 limit-list 
* get
* 接受前端发来的信号 当前页和需要几页 pageNo pageSize

6. 注册
* sigin
* post 
* 前端发送 用户名 密码 以及nickname 给后端 后端存入数据库