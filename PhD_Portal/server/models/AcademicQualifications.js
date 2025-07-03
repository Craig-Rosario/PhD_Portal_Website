import { DataTypes } from 'sequelize';
import { define } from '../config/db.js';

const AcademicQualification = define('AcademicQualification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  type: {
    type: DataTypes.ENUM('UG', 'PG'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institute: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  yearOfPassing: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1960,
      max: new Date().getFullYear(), // ensures logical year
    },
  },
}, {
  tableName: 'academic_qualifications',
  timestamps: true,
  underscored: true,
});

export default AcademicQualification;
