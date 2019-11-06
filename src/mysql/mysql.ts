import { MysqlError } from 'mysql';
import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    connection: mysql.Connection;
    connected: boolean = false;

    constructor(){
        console.log("class initialized.");
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
          });
          this.connection.connect();
    }
    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    static execQuery(query: string, callback: Function){

        this.instance.connection.query(query,  (error, results: Object[], fields) => {
            if (error) {
                console.log("Error in query");
                console.log(error);
                return callback(error);
            }
            if(results.length === 0){
                callback("The data required doesn't exist.");
            }else{
                callback(null, results);
            }
        });
        
    }
    
    private connectDB(){
        this.connection.connect((err: mysql.MysqlError) => {
            if(err){
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Database connected');
        })
    }


}


// connection.end();
