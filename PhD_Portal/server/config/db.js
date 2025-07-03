import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('phd_portal', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

export const define = (modelName, attributes, options) => sequelize.define(modelName, attributes, options);
export default sequelize;
