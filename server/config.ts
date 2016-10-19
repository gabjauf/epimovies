import * as mysql from 'mysql';

export class Db {
  private static connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'epimovies',
      password : 'epimovies',
      database : 'epimovies'
    });

  static connect() {
    this.connection.connect();
  }

  public static getConnection() {
    return Db.connection;
  }
}
Db.connect();