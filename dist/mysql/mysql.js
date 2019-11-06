"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log("class initialized.");
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connection.connect();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static execQuery(query, callback) {
        this.instance.connection.query(query, (error, results, fields) => {
            if (error) {
                console.log("Error in query");
                console.log(error);
                return callback(error);
            }
            if (results.length === 0) {
                callback("The data required doesn't exist.");
            }
            else {
                callback(null, results);
            }
        });
    }
    connectDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Database connected');
        });
    }
}
exports.default = MySQL;
// connection.end();
