// import sequelize from "../config/db.js";

import { Sequelize } from "sequelize";

// const User = sequelize.define(
//   "User",
//   {
//     // Model attributes are defined here
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//   },
//   { tableName: "users" }
// );

// if table doesn't exist then model will create it to table
// sequelize.sync();

const User = {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  email: {
    type: Sequelize.STRING,
  },
};

export default User;
