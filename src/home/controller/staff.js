//员工
'use strict';

import Base from './base.js';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */

	//test测试页面
	async testAction(){
		await this.display();
	}

	//登录页面
	async loginAction() {
		/**
		 * @api {get} /home/staff/login 员工登录页面
		 * @apiName login
		 * @apiGroup staff
		 * @apiVersion 1.0.0
		 */
		await this.display();
	}

	//登录验证数据库
	async loginchreckAction() {
		/**
		 * @api {post} /home/staff/loginchreck 后端登录验证
		 * @apiName loginchreck
		 * @apiGroup staff
		 * @apiVersion 1.0.0
		 * @apiDescription 验证成功把员工编号和姓名存入session
		 * 
		 * @apiParam {String} s_id 员工编号
		 * @apiParam {String} password 密码
		 * 
		 * @apiSuccess {String} s_id 员工编号(存入session)
		 * @apiSuccess {String} name 员工姓名(存入session)
		 * @apiSuccessExample Success-Response:
 		 * /home/staff/index 员工首页
 		 *   {
		 *     "s_id": 2001,
		 *     "name": 利某,
		 *   }
		 * 
		 * @apiError (Error loginfail) loginfail 账号密码错误
		 * @apiErrorExample Error-Response:
 		 * /home/staff/loginfail 账号密码错误信息
 		 *   {
		 *    "error": 账号密码错误，请重新输入，
		 *   }
		 */
		//获取账号密码
		let s_id = this.post('s_id');
		let password = this.post('password');
		//验证登录信息
		let model = await this.model('staff');
		let s_data = await model.where({ s_id: s_id, password: password }).find();
		//判断账号是否存在
		if (think.isEmpty(s_data)) {
			console.log("登录失败 s_data 为空", s_data);
			this.redirect("/home/staff/loginfail");
		}
		console.log("登录成功 s_data:", s_data);
		//判断work表有没有已经打卡
		let w_model = await this.model("work");
		let w_data = await w_model.where({ s_id: s_id, logout_time: null }).find();
		if (think.isEmpty(w_data)) {
			//判断是否登录
			if (!think.isEmpty(s_data)) {
				//记录登录时间为上班时间
				let login_time = await think.datetime();
				let insertID = await w_model.add({ s_id: s_id, login_time: login_time });
				console.log("上班打卡登记成功:", insertID);
			}
		}
		//设置session
		await this.session("s_data", s_data);
		await this.redirect("/home/staff/index");
	}

	//登陆失败
	async loginfailAction() {
		await this.display();
	}

	//验证session是否有登录
	async staffdata() {
		//验证登录
		let s_data = await this.session("s_data");
		console.log("员工登录验证s_data：", s_data);
		if (think.isEmpty(s_data)) {
			this.redirect("/home/staff/login");
		}
		//ejs渲染
		await this.assign({
			s_id: s_data['s_id'],
			name: s_data['name'],
		});
	}

	//个人首页
	async indexAction() {
		/**
		 * @api {get} /home/staff/index 员工首页
		 * @apiName index
		 * @apiGroup staff
		 * @apiVersion 1.0.0
		 */
		await this.staffdata();
		await this.display();
	}

	//AJAX显示剩余车位
	async remainingparkingAction() {
			/**
		 * @api {get} /home/staff/remainingparking 查看剩余车位(AJAX)
		 * @apiName remainingparking
		 * @apiGroup staff
		 * @apiVersion 1.0.0
		 * 
		 * @apiSuccess {String} remainingparking 剩余车位信息
		 * @apiSuccessExample Success-Response:
 		 * 剩余车位信息
 		 *   {
		 *     "remainingparking":小型车位：10 中型车位：10 大型车位：10
		 *   }
		 * 
		 */
		var http = require("http");
		var url = require("url");
		//读取数据库,计算剩余车位
		let p_model = await this.model("parking");
		let remainingparking1 = await p_model.where({ c_id: "", repair: "正常", size: "1" }).count();
		let remainingparking2 = await p_model.where({ c_id: "", repair: "正常", size: "2" }).count();
		let remainingparking3 = await p_model.where({ c_id: "", repair: "正常", size: "3" }).count();
		console.log("剩余车位：", remainingparking1, remainingparking2, remainingparking3);
		//链接字符串
		let remainingparking = "小型车位：" + remainingparking1 + "<br>" + "中型车位：" + remainingparking2 + "<br>" + "大型车位：" + remainingparking3;
		//输出到页面
		this.http.end(remainingparking);
	}

	//退出登录
	async logoutAction() {
		/**
		 * @api {get} /home/staff/loginchreck 退出登录
		 * @apiName logout
		 * @apiGroup staff
		 * @apiVersion 1.0.0
		 * 
		 * @apiParam {string} s_id 员工编号(session中获取)
		 * 
		 * @apiSuccess {String} s_id 员工编号
		 * @apiSuccess {String} name 员工姓名
		 * @apiSuccess {date} login_time 登录时间
		 * @apiSuccess {date} logout_time 退出时间
		 * @apiSuccess {double}sum 收入
		 * @apiSuccessExample Success-Response:
 		 * /home/staff/logout 计算本班收入
 		 *   {
		 *     "s_id": 员工ID,
		 *     "name": 员工姓名,
		 *     "login_time":登录时间,
		 *     "logout_time":退出时间，
		 *     "sum":收入,
		 *   }
		 */
		//记录下班时间	
		let s_data = await this.session("s_data");
		let s_id = s_data['s_id'];
		console.log("员工号", s_id);
		let w_model = await this.model("work");
		let w_data = await w_model.where({ s_id: s_id, logout_time: null }).find();
		let login_time = await think.datetime(w_data['login_time']);
		console.log("登录时间：", login_time);
		let logout_time = await think.datetime();
		console.log("退出时间：", logout_time);
		//计算工作期间收入
		let i_model = await this.model("income");
		let sum = await i_model.where({ s_id: s_id, out_time: { '>': login_time, '<': logout_time } }).sum("cost") + 0;
		console.log("本次工作一共收入：", sum);
		let affectedRows = await w_model.where({ s_id: s_id, logout_time: null }).update({ logout_time: logout_time, sum: sum });
		console.log("下班打卡成功：", affectedRows);
		//清空sesion
		await this.session();
		//ejs渲染
		await this.assign({
			s_id: s_id,
			name: s_data['name'],
			login_time: login_time,
			logout_time: logout_time,
			sum: sum,
		});
		await this.display();
	}

	//车辆进入登记没有车位页面
	async noparkingAction() {
		await this.staffdata();
		await this.display();
	}

	//车辆进入登记c_id已经使用
	async ciduseingAction() {
		await this.staffdata();
		await this.display();
	}

	//车辆进入登记没有输入卡号
	async nocidAction() {
		await this.staffdata();
		await this.display();
	}

	//车辆进入安排车位
	async checkinAction() {
		await this.staffdata();
		//查询数据库有无车位
		let size = await this.post("size");
		let p_model = await this.model("parking");
		let remainingparking = await p_model.where({ c_id: "", repair: "正常", size: size }).count();
		let c_id = await this.post('c_id');
		let cid = await p_model.where({ c_id: c_id }).count();
		console.log("remainingparking:", remainingparking);
		console.log("cid数量:", cid);
		if (remainingparking == 0) {
			await this.redirect("/home/staff/noparking");//没有车位
			// }else if(c_id==""){
			// 	await this.redirect("/home/staff/nocid");//没输入卡号
		}
		else if (cid > 0) {
			await this.redirect("/home/staff/ciduseing");//cid已经在使用
		}
		else {
			//系统安排车位记录parking表卡号
			let p_data = await p_model.where({ c_id: "", repair: "正常", size: size }).find();
			let p_no = p_data['p_no'];
			let c_id = await this.post('c_id');
			let affectedRows = await p_model.where({ p_no: p_no }).update({ c_id: c_id });
			console.log("设置车位已用：", affectedRows);
			//income表记录员工id，进入时间，卡号，车位，大小
			let s_data = await this.session("s_data");
			let s_id = s_data['s_id'];
			let in_time = await think.datetime();
			let i_model = this.model("income");
			let insertID = await i_model.add({ s_id: s_id, c_id: c_id, p_no: p_no, size: size, in_time: in_time });
			console.log("income表记录信息：", insertID);
			//ejs显示安排停放的车位
			await this.assign({
				p_no: p_no,
				size: size,
			});
			await this.display();
		}
	}

	//车辆离开显示收费信息
	async checkoutAction() {
		await this.staffdata();
		//获取卡号
		let c_id = await this.post('c_id');
		console.log("c_id", c_id);
		if (c_id == "") {
			await this.redirect("/home/staff/nocid");//没输入卡号
		}
		//income表获取进入时间
		let i_model = await this.model("income");
		let i_data = await i_model.where({ c_id: c_id, out_time: null }).find();
		if (think.isEmpty(i_data)) {
			await this.redirect("/home/staff/withoutcid");
		}
		let in_time = await think.datetime(i_data['in_time']);
		console.log("进入时间：", in_time);
		//获取离开时间
		let out_time = await think.datetime();
		console.log("离开时间：", out_time);
		//获取车位大小
		let p_no = await i_data['p_no'];
		let size = await i_data['size'];
		console.log("车位大小：", size);
		//price表获取收费标准
		let price_model = await this.model('price');
		let price_data = await price_model.find();
		let time1 = price_data['time1'];
		let time2 = price_data['time2'];
		let price1 = price_data['price1'];
		let price2 = price_data['price2'];
		let dayprice = price_data['dayprice'];
		//ejs显示收费信息，停车时长
		await this.assign({
			c_id: c_id,
			p_no: p_no,
			size: size,
			in_time: in_time,
			out_time: out_time,
			time1: time1,
			time2: time2,
			price1: price1,
			price2: price2,
			dayprice: dayprice,
		});
		await this.display();
	}

	//车辆离开登记c_id没有在停车
	async withoutcidAction() {
		await this.staffdata();
		await this.display();
	}

	//确认收费
	async confirmchargeAction() {
		await this.staffdata();
		//获取s_id,c_id,p_no,in_time,out_time,cost
		let s_data = await this.session("s_data");
		let s_id = s_data['s_id'];
		let c_id = await this.post("c_id");
		let p_no = await this.post("p_no");
		let in_time = await this.post("in_time");
		let out_time = await this.post("out_time");
		let cost = await this.post("cost");
		//income表记录离开时间，收费人员，收费金额
		let i_model = await this.model("income");
		let affectedRows = await i_model.where({ c_id: c_id, out_time: null }).update({ out_time: out_time, s_id: s_id, cost: cost, });
		//设置车位可用c_id为空
		let p_model = await this.model("parking");
		let affectedRows2 = await p_model.where({ c_id: c_id }).update({ c_id: "" });
		console.log("设置车位无人使用：", affectedRows2);
		await this.display();
	}
}