import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('phd_portal', 'postgres', 'V21', {
  host: 'localhost',
  dialect: 'postgres',
});

export const define = () => sequelize;
export default sequelize;
