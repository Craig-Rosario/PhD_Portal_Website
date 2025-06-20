import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // your db connection

const PersonalDetails = sequelize.define('PersonalDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  firstName: { type: DataTypes.STRING, allowNull: false },
  middleName: DataTypes.STRING,
  lastName: { type: DataTypes.STRING, allowNull: false },
  motherName: DataTypes.STRING,
  fatherName: DataTypes.STRING,
  addressLine1: DataTypes.STRING,
  addressLine2: DataTypes.STRING,
  district: DataTypes.STRING,
  state: DataTypes.STRING,
  pinCode: {
    type: DataTypes.STRING,
    validate: { is: /^[1-9][0-9]{5}$/ },
  },
  permanentAddressLine1: DataTypes.STRING,
  permanentAddressLine2: DataTypes.STRING,
  permanentDistrict: DataTypes.STRING,
  permanentState: DataTypes.STRING,
  permanentPinCode: {
    type: DataTypes.STRING,
    validate: { is: /^[1-9][0-9]{5}$/ },
  },
  gender: { type: DataTypes.STRING, allowNull: false },
  aadhar: {
    type: DataTypes.STRING,
    validate: { len: [12, 12] }, // Basic Aadhar check
  },
  maritalStatus: {
    type: DataTypes.STRING,
    defaultValue: "Unmarried",
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altMobile: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  altEmail: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
}, {
  tableName: 'personal_details',
  timestamps: true,
  underscored: true,
});

export default PersonalDetails;
