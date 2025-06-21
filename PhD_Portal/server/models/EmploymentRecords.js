import { DataTypes } from 'sequelize';
import { define } from '../config/db.js';

const EmploymentRecord = define('EmploymentRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true, // optional for currently employed
    validate: {
      isDate: true,
    },
  },
}, {
  tableName: 'employment_records',
  timestamps: true,
  underscored: true,
});

export default EmploymentRecord;
