import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const Transaction = sequelize.define(
  'Transaction',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
        type: DataTypes.ENUM,
        values: ['Income', 'Expense'],
        allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL,
      require: true,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false
  }
);

export { Transaction };
