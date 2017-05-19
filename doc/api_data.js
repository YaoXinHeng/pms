define({ "api": [
  {
    "type": "get",
    "url": "/home/admin/login",
    "title": "管理员登录页面",
    "name": "login",
    "group": "admin",
    "version": "1.0.0",
    "filename": "src/home/controller/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/home/staff/index",
    "title": "员工首页",
    "name": "index",
    "group": "staff",
    "version": "1.0.0",
    "filename": "src/home/controller/staff.js",
    "groupTitle": "staff"
  },
  {
    "type": "get",
    "url": "/home/staff/login",
    "title": "员工登录页面",
    "name": "login",
    "group": "staff",
    "version": "1.0.0",
    "filename": "src/home/controller/staff.js",
    "groupTitle": "staff"
  },
  {
    "type": "post",
    "url": "/home/staff/loginchreck",
    "title": "后端登录验证",
    "name": "loginchreck",
    "group": "staff",
    "version": "1.0.0",
    "description": "<p>验证成功把员工编号和姓名存入session</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "s_id",
            "description": "<p>员工编号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "s_id",
            "description": "<p>员工编号(存入session)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>员工姓名(存入session)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "/home/staff/index 员工首页\n  {\n    \"s_id\": 2001,\n    \"name\": 利某,\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error loginfail": [
          {
            "group": "Error loginfail",
            "optional": false,
            "field": "loginfail",
            "description": "<p>账号密码错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "/home/staff/loginfail 账号密码错误信息\n  {\n   \"error\": 账号密码错误，请重新输入，\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/home/controller/staff.js",
    "groupTitle": "staff"
  },
  {
    "type": "get",
    "url": "/home/staff/loginchreck",
    "title": "退出登录",
    "name": "logout",
    "group": "staff",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "s_id",
            "description": "<p>员工编号(session中获取)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "s_id",
            "description": "<p>员工编号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>员工姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "login_time",
            "description": "<p>登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "logout_time",
            "description": "<p>退出时间</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "sum",
            "description": "<p>收入</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "/home/staff/logout 计算本班收入\n  {\n    \"s_id\": 员工ID,\n    \"name\": 员工姓名,\n    \"login_time\":登录时间,\n    \"logout_time\":退出时间，\n    \"sum\":收入,\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/home/controller/staff.js",
    "groupTitle": "staff"
  },
  {
    "type": "get",
    "url": "/home/staff/remainingparking",
    "title": "查看剩余车位(AJAX)",
    "name": "remainingparking",
    "group": "staff",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "remainingparking",
            "description": "<p>剩余车位信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "剩余车位信息\n  {\n    \"remainingparking\":小型车位：10 中型车位：10 大型车位：10\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/home/controller/staff.js",
    "groupTitle": "staff"
  }
] });
