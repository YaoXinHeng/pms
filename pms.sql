/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : pms

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-04-01 02:48:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `a_id` varchar(11) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '管理员账号',
  `name` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '管理员姓名',
  `password` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1001', '管理员', '1234');

-- ----------------------------
-- Table structure for income
-- ----------------------------
DROP TABLE IF EXISTS `income`;
CREATE TABLE `income` (
  `c_id` varchar(11) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '卡号',
  `s_id` varchar(11) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '员工编号',
  `p_no` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '车位',
  `size` double(1,0) DEFAULT NULL COMMENT '车位大小',
  `in_time` datetime DEFAULT NULL COMMENT '车辆进入时间',
  `out_time` datetime DEFAULT NULL COMMENT '车辆离开时间',
  `cost` double(10,0) DEFAULT NULL COMMENT '收费'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of income
-- ----------------------------
INSERT INTO `income` VALUES ('159', '2002', 'A001', '1', '2016-12-05 00:59:25', '2016-12-10 01:00:47', '644');
INSERT INTO `income` VALUES ('254', '2002', 'A002', '1', '2016-12-07 00:59:30', '2016-12-10 01:02:51', '389');
INSERT INTO `income` VALUES ('265', '2002', 'B001', '2', '2016-12-06 00:59:37', '2016-12-10 01:03:17', '1034');
INSERT INTO `income` VALUES ('957', '2002', 'C001', '3', '2016-12-08 00:59:47', '2016-12-10 01:03:24', '783');
INSERT INTO `income` VALUES ('318', '2001', 'A001', '1', '2016-12-08 01:22:22', '2016-12-10 02:02:55', '265');
INSERT INTO `income` VALUES ('238', '2001', 'B001', '2', '2016-11-22 01:36:31', '2016-12-10 02:03:05', '4626');
INSERT INTO `income` VALUES ('315', '2001', 'B002', '2', '2016-11-24 12:36:43', '2016-12-10 02:06:42', '4114');
INSERT INTO `income` VALUES ('201', '2002', 'A002', '1', '2016-12-01 01:52:13', '2016-12-10 02:07:09', '1161');
INSERT INTO `income` VALUES ('246', '2001', 'A001', '1', '2016-12-10 02:06:58', '2016-12-10 02:08:04', '0');
INSERT INTO `income` VALUES ('247', '2001', 'A001', '1', '2016-12-10 02:08:18', '2016-12-10 02:08:30', '0');
INSERT INTO `income` VALUES ('117', '2001', 'A001', '1', '2016-12-10 02:00:53', '2016-12-10 02:09:08', '1');
INSERT INTO `income` VALUES ('275', '2001', 'A001', '1', '2016-12-10 02:08:18', '2016-12-10 02:09:34', '1');
INSERT INTO `income` VALUES ('364', '2001', 'B001', '2', '2016-12-08 02:21:46', '2016-12-10 14:46:09', '768');
INSERT INTO `income` VALUES ('584', '2001', 'A001', '1', '2016-12-09 12:21:57', '2016-12-10 14:46:41', '256');
INSERT INTO `income` VALUES ('233', '2001', 'A006', '1', '2016-12-10 02:30:35', '2016-12-10 02:30:38', '0');
INSERT INTO `income` VALUES ('521', '2001', 'A006', '1', '2016-12-10 08:01:59', '2016-12-10 08:02:03', '0');
INSERT INTO `income` VALUES ('525', '2001', 'A006', '1', '2016-12-10 08:56:12', '2016-12-10 08:56:17', '0');
INSERT INTO `income` VALUES ('q', '2001', 'A006', '1', '2016-12-10 10:52:26', '2016-12-10 10:52:30', '0');
INSERT INTO `income` VALUES ('235', '2001', 'A006', '1', '2016-12-10 11:07:40', '2016-12-10 11:07:49', '0');
INSERT INTO `income` VALUES ('144', '2001', 'A001', '1', '2017-02-11 18:31:46', '2017-02-11 18:31:50', '0');
INSERT INTO `income` VALUES ('粤A255', '2001', 'A001', '1', '2017-02-27 16:46:37', '2017-02-27 16:47:13', '0');
INSERT INTO `income` VALUES ('3221', '2001', 'A007', '1', '2017-03-18 00:22:41', '2017-03-18 00:22:46', '0');
INSERT INTO `income` VALUES ('123', '2001', 'A007', '1', '2017-03-18 00:33:23', '2017-03-18 00:48:03', '1');
INSERT INTO `income` VALUES ('123', '2001', 'A007', '1', '2017-03-18 00:49:55', '2017-03-18 00:49:58', '0');
INSERT INTO `income` VALUES ('101', '2001', 'A007', '1', '2017-03-24 23:29:44', '2017-03-24 23:34:29', '1');
INSERT INTO `income` VALUES ('101', '2001', 'A001', '1', '2017-03-25 00:18:03', '2017-03-25 00:18:09', '0');
INSERT INTO `income` VALUES ('101', '2001', 'A001', '1', '2017-03-25 00:25:10', '2017-03-30 01:14:28', '645');
INSERT INTO `income` VALUES ('3', '2001', 'A002', '1', '2017-03-30 01:07:08', null, null);
INSERT INTO `income` VALUES ('111', '2001', 'A004', '1', '2017-03-30 01:07:21', '2017-03-30 01:17:39', '1');
INSERT INTO `income` VALUES ('1', '2001', 'A006', '1', '2017-03-30 01:12:42', null, null);
INSERT INTO `income` VALUES ('qwe', '2001', 'A007', '1', '2017-03-30 01:12:54', '2017-03-30 01:13:00', '0');
INSERT INTO `income` VALUES ('212', '2001', 'A001', '1', '2017-03-30 01:17:47', '2017-03-30 01:17:51', '0');

-- ----------------------------
-- Table structure for parking
-- ----------------------------
DROP TABLE IF EXISTS `parking`;
CREATE TABLE `parking` (
  `p_no` varchar(11) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '车位编号',
  `c_id` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT '' COMMENT '卡号',
  `size` double(1,0) DEFAULT NULL COMMENT '车位大小',
  `repair` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '维修状态',
  PRIMARY KEY (`p_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of parking
-- ----------------------------
INSERT INTO `parking` VALUES ('A001', '', '1', '正常');
INSERT INTO `parking` VALUES ('A002', '3', '1', '正常');
INSERT INTO `parking` VALUES ('A003', '', '1', '维修');
INSERT INTO `parking` VALUES ('A004', '', '1', '正常');
INSERT INTO `parking` VALUES ('A005', '', '1', '维修');
INSERT INTO `parking` VALUES ('A006', '1', '1', '正常');
INSERT INTO `parking` VALUES ('A007', '', '1', '正常');
INSERT INTO `parking` VALUES ('A008', '', '1', '维修');
INSERT INTO `parking` VALUES ('A009', '', '1', '正常');
INSERT INTO `parking` VALUES ('A010', '', '1', '正常');
INSERT INTO `parking` VALUES ('A011', '', '1', '正常');
INSERT INTO `parking` VALUES ('A012', '', '1', '正常');
INSERT INTO `parking` VALUES ('A013', '', '1', '正常');
INSERT INTO `parking` VALUES ('A014', '', '1', '正常');
INSERT INTO `parking` VALUES ('A015', '', '1', '正常');
INSERT INTO `parking` VALUES ('A016', '', '1', '正常');
INSERT INTO `parking` VALUES ('A017', '', '1', '正常');
INSERT INTO `parking` VALUES ('A018', '', '1', '正常');
INSERT INTO `parking` VALUES ('A019', '', '1', '正常');
INSERT INTO `parking` VALUES ('A020', '', '1', '正常');
INSERT INTO `parking` VALUES ('A021', '', '1', '正常');
INSERT INTO `parking` VALUES ('A022', '', '1', '正常');
INSERT INTO `parking` VALUES ('A023', '', '1', '正常');
INSERT INTO `parking` VALUES ('A024', '', '1', '正常');
INSERT INTO `parking` VALUES ('A025', '', '1', '正常');
INSERT INTO `parking` VALUES ('A026', '', '1', '正常');
INSERT INTO `parking` VALUES ('A027', '', '1', '正常');
INSERT INTO `parking` VALUES ('A028', '', '1', '正常');
INSERT INTO `parking` VALUES ('A029', '', '1', '正常');
INSERT INTO `parking` VALUES ('A030', '', '1', '正常');
INSERT INTO `parking` VALUES ('A031', '', '1', '正常');
INSERT INTO `parking` VALUES ('A032', '', '1', '正常');
INSERT INTO `parking` VALUES ('A033', '', '1', '正常');
INSERT INTO `parking` VALUES ('A034', '', '1', '正常');
INSERT INTO `parking` VALUES ('A035', '', '1', '正常');
INSERT INTO `parking` VALUES ('B001', '', '2', '正常');
INSERT INTO `parking` VALUES ('B002', '', '2', '正常');
INSERT INTO `parking` VALUES ('B003', '', '2', '正常');
INSERT INTO `parking` VALUES ('B004', '', '2', '正常');
INSERT INTO `parking` VALUES ('B005', '', '2', '正常');
INSERT INTO `parking` VALUES ('B006', '', '2', '正常');
INSERT INTO `parking` VALUES ('B007', '', '2', '正常');
INSERT INTO `parking` VALUES ('B008', '', '2', '正常');
INSERT INTO `parking` VALUES ('B009', '', '2', '正常');
INSERT INTO `parking` VALUES ('B010', '', '2', '正常');
INSERT INTO `parking` VALUES ('B011', '', '2', '正常');
INSERT INTO `parking` VALUES ('B012', '', '2', '正常');
INSERT INTO `parking` VALUES ('B013', '', '2', '正常');
INSERT INTO `parking` VALUES ('B014', '', '2', '正常');
INSERT INTO `parking` VALUES ('B015', '', '2', '正常');
INSERT INTO `parking` VALUES ('B016', '', '2', '正常');
INSERT INTO `parking` VALUES ('B017', '', '2', '正常');
INSERT INTO `parking` VALUES ('B018', '', '2', '正常');
INSERT INTO `parking` VALUES ('B019', '', '2', '正常');
INSERT INTO `parking` VALUES ('B020', '', '2', '正常');
INSERT INTO `parking` VALUES ('C001', '', '3', '正常');
INSERT INTO `parking` VALUES ('C002', '', '3', '正常');
INSERT INTO `parking` VALUES ('C003', '', '3', '维修');
INSERT INTO `parking` VALUES ('C004', '', '3', '正常');
INSERT INTO `parking` VALUES ('C005', '', '3', '正常');
INSERT INTO `parking` VALUES ('C006', '', '3', '正常');
INSERT INTO `parking` VALUES ('C007', '', '3', '正常');
INSERT INTO `parking` VALUES ('C008', '', '3', '正常');
INSERT INTO `parking` VALUES ('C009', '', '3', '正常');
INSERT INTO `parking` VALUES ('C010', '', '3', '正常');

-- ----------------------------
-- Table structure for price
-- ----------------------------
DROP TABLE IF EXISTS `price`;
CREATE TABLE `price` (
  `time1` time DEFAULT NULL COMMENT '高峰开始时间',
  `time2` time DEFAULT NULL COMMENT '高峰结束时间',
  `price1` double(10,2) DEFAULT NULL COMMENT '高峰收费',
  `price2` double(10,2) DEFAULT NULL COMMENT '普通收费',
  `dayprice` double(10,2) DEFAULT NULL COMMENT '日收费'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of price
-- ----------------------------
INSERT INTO `price` VALUES ('08:00:00', '20:00:00', '4.00', '1.00', '128.00');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `s_id` varchar(11) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '员工编号',
  `name` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '员工姓名',
  `password` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('2001', '利某', '1234');
INSERT INTO `staff` VALUES ('2002', '都sd', '1234');
INSERT INTO `staff` VALUES ('2003', '喝喝', '1234');
INSERT INTO `staff` VALUES ('2004', 'koko', '1234');
INSERT INTO `staff` VALUES ('2005', 'oppp', '1234');
INSERT INTO `staff` VALUES ('2006', '居然说', '4534');

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '工作表id',
  `s_id` varchar(11) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '员工编号',
  `login_time` datetime DEFAULT NULL COMMENT '员工上班时间',
  `logout_time` datetime DEFAULT NULL COMMENT '员工下班时间',
  `sum` double DEFAULT NULL COMMENT '本班收入',
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES ('99', '2001', '2016-12-10 00:56:37', '2016-12-10 01:59:31', '0');
INSERT INTO `work` VALUES ('102', '2001', '2016-12-10 02:06:30', '2016-12-10 02:06:48', '4114');
INSERT INTO `work` VALUES ('103', '2002', '2016-12-10 02:07:00', '2016-12-10 02:07:20', '1554');
INSERT INTO `work` VALUES ('104', '2001', '2016-12-10 02:07:41', '2016-12-10 02:21:30', '2');
INSERT INTO `work` VALUES ('105', '2004', '2016-12-10 02:21:37', '2016-12-10 08:56:56', '0');
INSERT INTO `work` VALUES ('106', '2001', '2016-12-10 02:24:03', '2016-12-10 02:24:53', '0');
INSERT INTO `work` VALUES ('107', '2005', '2016-12-10 02:24:59', '2016-12-10 02:25:01', '0');
INSERT INTO `work` VALUES ('108', '2001', '2016-12-10 02:27:08', '2016-12-10 02:36:57', '0');
INSERT INTO `work` VALUES ('109', '2001', '2016-12-10 08:01:52', '2016-12-10 08:56:22', '0');
INSERT INTO `work` VALUES ('110', '2001', '2016-12-10 10:49:39', '2016-12-10 10:53:03', '0');
INSERT INTO `work` VALUES ('111', '2001', '2016-12-10 11:07:26', '2016-12-10 11:08:09', '0');
INSERT INTO `work` VALUES ('112', '2001', '2016-12-10 11:34:55', '2016-12-10 11:35:02', '0');
INSERT INTO `work` VALUES ('113', '2001', '2016-12-10 13:44:55', '2016-12-10 13:45:08', '0');
INSERT INTO `work` VALUES ('114', '2001', '2016-12-10 13:58:38', '2016-12-10 13:58:51', '0');
INSERT INTO `work` VALUES ('115', '2001', '2016-12-10 14:40:26', '2016-12-10 14:44:28', '0');
INSERT INTO `work` VALUES ('116', '2001', '2016-12-10 14:45:56', '2016-12-10 14:50:00', '1024');
INSERT INTO `work` VALUES ('117', '2001', '2017-02-11 18:31:17', '2017-02-11 18:32:00', '0');
INSERT INTO `work` VALUES ('118', '2001', '2017-02-27 16:12:38', '2017-03-11 17:59:00', '0');
INSERT INTO `work` VALUES ('119', '2001', '2017-03-17 16:49:37', '2017-03-17 16:49:43', '0');
INSERT INTO `work` VALUES ('120', '2001', '2017-03-17 23:52:55', '2017-03-18 00:58:12', '1');
INSERT INTO `work` VALUES ('121', '2001', '2017-03-18 01:04:15', '2017-03-18 01:06:31', '0');
INSERT INTO `work` VALUES ('122', '2001', '2017-03-24 00:01:58', '2017-03-25 00:33:31', '1');
INSERT INTO `work` VALUES ('123', '2001', '2017-03-30 00:52:32', '2017-03-30 00:56:28', '0');
INSERT INTO `work` VALUES ('124', '2001', '2017-03-30 01:05:44', '2017-03-30 01:28:43', '646');
SET FOREIGN_KEY_CHECKS=1;
