'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: "mysql", //数据库类型
  log_sql: true, //是否记录 sql 语句
  log_connect: true, // 是否记录连接数据库的信息
  adapter: {
    mysql: {
      host: "127.0.0.1", //数据库 host
      port: "3306", //端口
      database: "pms", //数据库名称
      user: "root", //账号
      password: "123456", //密码
      prefix: "", //数据表前缀
      encoding: "utf8", //数据库编码
      nums_per_page: 10, //一页默认条数
    }
  }
};