// models/PersonalDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PersonalDetails = sequelize.define('PersonalDetails', {
  title: DataTypes.STRING,
  firstName: DataTypes.STRING,
  middleName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  motherName: DataTypes.STRING,
  fatherName: DataTypes.STRING,
  addressLine1: DataTypes.STRING,
  addressLine2: DataTypes.STRING,
  district: DataTypes.STRING,
  state: DataTypes.STRING,
  pinCode: DataTypes.STRING,
  permanentAddressLine1: DataTypes.STRING,
  permanentAddressLine2: DataTypes.STRING,
  permanentDistrict: DataTypes.STRING, // fixed typo
  permanentState: DataTypes.STRING,
  permanentPinCode: DataTypes.STRING,
  gender: DataTypes.STRING,
  aadhar: DataTypes.STRING,
  maritalStatus: DataTypes.STRING,
  mobile: DataTypes.STRING,
  altMobile: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  altEmail: DataTypes.STRING,
});

module.exports = PersonalDetails;
