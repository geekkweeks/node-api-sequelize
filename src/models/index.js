import db from "../config/db.js";
import User from "./userModel.js";

db.define("User", User, {
  tableName: "users",
  underscored: true,
  timestamps: false,
  indexes: [
    { fields: ["email"], unique: true },
    { fields: ["first_name"], unique: true },
    
  ],
});
db.sync();

export default db;
