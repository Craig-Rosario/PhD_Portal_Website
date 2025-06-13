// models/AcademicQualification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AcademicQualification = sequelize.define('AcademicQualification', {
  email: { type: DataTypes.STRING, allowNull: false },
  type: { // 'UG' or 'PG'
    type: DataTypes.ENUM('UG', 'PG'),
    allowNull: false,
  },
  degreeName: DataTypes.STRING,
  university: DataTypes.STRING,
  yearOfPassing: DataTypes.INTEGER,
  grade: DataTypes.STRING,
});

module.exports = AcademicQualification;
