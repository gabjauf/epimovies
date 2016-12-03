import neo4j = require('neo4j');
import * as mysql from 'mysql';


export class Db {
  private static connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'epimovies',
      password : 'epimovies',
      database : 'epimovies'
    });

  static connect() {
    
    this.connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        throw err;
      }

      console.log('connected as id ' + this.connection.threadId);
    });
  }

  public static getConnection() {
      return Db.connection;
  }
}

export class NeoDb {
    private static connection = new neo4j.GraphDatabase('http://neo4j:root@localhost:7474');

    public static getConnection() {
        return NeoDb.connection;
    }
}