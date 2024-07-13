import { Sequelize } from 'sequelize';
const sql = 'postgresql://postgres.nqtjyuqvfoxexynfcsww:in5uSxULGNEBt5dr@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
const sequelize = new Sequelize(sql);

export { sequelize };
