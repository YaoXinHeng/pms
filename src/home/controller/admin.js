'use strict';

import Base from './base.js';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */

	//验证登录，显示登录信息
	async admindata() {
		//验证登录
		let a_data = await this.session("a_data");
		console.log("管理员登录验证a_data：", a_data);
		if (think.isEmpty(a_data)) {
			this.redirect("/home/admin/login");
		}
		//ejs渲染
		await this.assign({
			a_id: a_data['a_id'],
			name: a_data['name'],
		});
	}

	//个人首页
	async indexAction() {
		await this.admindata();
		await this.display();
	}

	//登录页面
	async loginAction() {
		await this.display();
	}

	//登录验证
	async loginchreckAction() {
		//获取账号密码
		let a_id = this.post('a_id');
		let password = this.post('password');
		//验证登录信息
		let model = await this.model('admin');
		let a_data = await model.where({ a_id: a_id, password: password }).find();
		//判断账号是否存在
		if (think.isEmpty(a_data)) {
			console.log("登录验证 a_data 为空", a_data);
			this.redirect("/home/admin/loginfail");
		}
		console.log("登录验证 a_data:", a_data);
		//设置session
		await this.session("a_data", a_data);
		await this.redirect("/home/admin/index");
	}

	//登陆失败
	async loginfailAction() {
		await this.display();
	}

	//退出登录
	async logoutAction() {
		//清空sesion
		await this.session();
		await this.redirect("/home/admin/index");
	}

	//修改密码页面
	async changepasswordAction() {
		await this.admindata();
		await this.display();
	}

	//修改数据库管理员密码
	async changepasswordchreckAction() {
		await this.admindata();
		let a_data = await this.session("a_data");
		let a_id = a_data['a_id'];
		let password = await this.post("password");
		let model = await this.model("admin");
		let affectedRows = await model.where({ a_id: a_id }).update({ password: password });
		await this.redirect("/home/admin/index");
	}

	//显示车位列表
	async parkinglistAction() {
		await this.admindata();
		//读取数据库车位表
		let model = await this.model('parking');
		let p_data = await model.select();
		//ejs渲染
		await this.assign({
			p_data: p_data,
		})
		await this.display();
	}

	//添加车位页面
	async addparkingAction() {
		await this.admindata();
		await this.display();
	}

	//添加一个车位
	async insertparkingAction() {
		await this.admindata();
		//获取车位信息
		let p_no = this.post("p_no");
		let size = this.post("size");
		let repair = "正常";
		let model = await this.model('parking');
		let pnos = await model.where({ p_no: p_no }).count();
		//验证P_no是否正确，是否重复
		if (p_no == 0) {
			this.redirect("/home/admin/nopno");
		} else if (pnos > 0) {
			this.redirect("/home/admin/pnousing");
		} else {
			//数据库添加一条车位信息
			let insertID = await model.thenAdd({ p_no: p_no, size: size, repair: repair }, { p_no: p_no });
			console.log("添加一个车位:", insertID);
			await this.redirect("/home/admin/parkinglist");
		}
	}

	//添加车位p_no没有输入
	async nopnoAction() {
		await this.admindata();
		await this.display();
	}

	//添加车位p_no已经存在
	async pnousingAction() {
		await this.admindata();
		await this.display();
	}

	//删除一个车位
	async deleteparkingAction() {
		await this.admindata();
		//获取车位id
		let p_no = this.get("p_no");
		//数据库删除一条信息
		let model = await this.model("parking");
		let affectedRows = await model.where({ p_no: p_no }).delete();
		console.log("删除一个车位:", affectedRows);
		await this.redirect("/home/admin/parkinglist");
	}

	//设置车位维修
	async repairparkingAction() {
		await this.admindata();
		//读取数据库判断车位是否维修
		let p_no = this.get("p_no");
		let model = await this.model('parking');
		let repair = "维修中";
		let affectedRows = await model.where({ p_no: p_no }).update({ repair: repair });
		await this.redirect("/home/admin/parkinglist");
	}

	//设置车位可用
	async useparkingAction() {
		await this.admindata();
		//读取数据库判断车位是否维修
		let p_no = this.get("p_no");
		let model = await this.model('parking');
		let repair = "正常";
		let affectedRows = await model.where({ p_no: p_no }).update({ repair: repair });
		await this.redirect("/home/admin/parkinglist");
	}

	//设置停车费页面
	async setmoneyAction() {
		await this.admindata();
		//获取停车费
		let model = await this.model("price");
		let price_data = await model.find();
		//ejs渲染
		await this.assign({
			price_data: price_data,
		})
		await this.display();
	}

	//设置停车费修改数据库
	async updatemoneyAction() {
		await this.admindata();
		//获取停车费信息
		let time1 = this.post("time1");
		let time2 = this.post("time2");
		let price1 = this.post("price1");
		let price2 = this.post("price2");
		let dayprice = this.post("dayprice");
		//修改数据库
		let model = await this.model("price");
		let affectedRows = await model.where("1=1").update({
			time1: time1,
			time2: time2,
			price1: price1,
			price2: price2,
			dayprice: dayprice,
		});
		await this.display();
	}

	//查看交易记录列表
	async incomeAction() {
		await this.admindata();
		//读取数据库收入列表
		let model = await this.model("income");
		let income_data = await model.select();
		//ejs渲染
		await this.assign({
			income_data: income_data,
		})
		await this.display();
	}

	//时间范围内的交易列表
	async timeincomeAction() {
		await this.admindata();
		//读取数据库收入列表
		let start_time = this.post("start_time");
		let end_time = this.post("end_time");
		let i_model = await this.model("income");
		let income_data = await i_model.where({ out_time: { '>': start_time, '<': end_time } }).select();
		//ejs渲染
		await this.assign({
			income_data: income_data,
		})
		await this.display();
	}

	//查看工作记录
	async workAction() {
		await this.admindata();
		//读取数据库收入列表
		let w_model = await this.model("work");
		let work_data = await w_model.select();
		//ejs渲染
		await this.assign({
			work_data: work_data,
		})
		await this.display();
	}

	//员工列表页面
	async stafflistAction() {
		await this.admindata();
		//读取数据库员工表
		let model = await this.model('staff');
		let staff_data = await model.select();
		//ejs渲染
		await this.assign({
			staff_data: staff_data,
		})
		await this.display();
	}

	//添加员工
	async addstaffAction() {
		await this.admindata();
		//获取员工信息
		let s_id = this.post("s_id");
		let name = this.post("name");
		let password = this.post("password");
		let s_model = await this.model('staff');
		let sid = await s_model.where({ s_id: s_id }).count();
		//判断员工信息
		if (s_id == "") {
			await this.redirect("/home/admin/nostaffinfo");
		} else if (name == "") {
			await this.redirect("/home/admin/nostaffinfo");
		} else if (password == "") {
			await this.redirect("/home/admin/nostaffinfo");
		} else if (sid > 0) {
			await this.redirect("/home/admin/sidusing");
		} else {
			//写入数据库
			let insertID = await s_model.thenAdd({ s_id: s_id, name: name, password: password }, { s_id: s_id });
			console.log("添加一个员工:", insertID);
			await this.redirect("/home/admin/stafflist");
		}
	}

	//添加员工信息不完全
	async nostaffinfoAction() {
		await this.admindata();
		await this.display();
	}

	//添加员工s_id已存在
	async sidusingAction() {
		await this.admindata();
		await this.display();
	}


	//修改员工信息
	async updatestaffAction() {
		await this.admindata();
		//获取员工信息
		let s_id = this.post("s_id");
		let name = this.post("name");
		let password = this.post("password");
		//修改数据库
		let model = await this.model('staff');
		let affectedRows = await model.where({ s_id: s_id }).update({ name: name, password: password });
		console.log("更新一个员工信息:", affectedRows);
		await this.redirect("/home/admin/stafflist");
	}

	//删除员工
	async deletestaffAction() {
		await this.admindata();
		//获取员工id
		let s_id = this.get("s_id");
		//从数据库删除
		let model = await this.model('staff');
		let affectedRows = await model.where({ s_id: s_id }).delete();
		console.log("删除一个员工:", affectedRows);
		await this.redirect("/home/admin/stafflist");
	}

}