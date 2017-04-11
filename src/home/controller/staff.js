//员工
'use strict';

import Base from './base.js';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */

	//验证session，显示登录信息
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

	//AJAX显示剩余车位
	async remainingparkingAction() {
		var http = require("http");
		var url = require("url");
		//读取数据库,计算剩余车位
		let p_model = await this.model("parking");
		let remainingparking1 = await p_model.where({ c_id: "", repair: "正常", size: "1" }).count();
		let remainingparking2 = await p_model.where({ c_id: "", repair: "正常", size: "2" }).count();
		let remainingparking3 = await p_model.where({ c_id: "", repair: "正常", size: "3" }).count();
		console.log("剩余车位：", remainingparking1, remainingparking2, remainingparking3);
		let remainingparking = "小型车位：" + remainingparking1 + "<br>" + "中型车位：" + remainingparking2 + "<br>" + "大型车位：" + remainingparking3;
		this.http.end(remainingparking);
	}

	//个人首页
	async indexAction() {
		await this.staffdata();
		await this.display();
	}

	//登录页面
	async loginAction() {
		await this.display();
	}

	//登录验证数据库
	async loginchreckAction() {
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

	//退出登录
	async logoutAction() {
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
			login_time: logout_time,
			logout_time: logout_time,
			sum: sum,
		});
		await this.display();
	}

	//车辆登记没有车位页面
	async noparkingAction() {
		await this.staffdata();
		await this.display();
	}

	//车辆登记cid已经使用
	async ciduseingAction() {
		await this.staffdata();
		await this.display();
	}

	//车辆登记没有 输入卡号
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

	//c_id没有在停车
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