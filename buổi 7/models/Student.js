const pool = require("./db");
class Student {
  constructor(id, name, birthday, gender) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
  }

  static buildLimit = (page = null, item_per_page = null) => {
    let limit = '';
      if(page && item_per_page) {
        const row_index = (page - 1) * item_per_page;
        limit = `LIMIT ${row_index}, ${item_per_page}`;
      };
      return limit;
  };

  static async all(page = null, item_per_page = null) {
    try {
      const limit = this.buildLimit(page, item_per_page);
      const [rows] = await pool.execute(`SELECT * FROM student ${limit}`);
      return this.convertArrayToObject(rows);
    } catch (error) {
      throw new Error(error);
    }
  };

  static convertArrayToObject = (rows) => {
    const students = rows.map(
      (row) => new Student(row.id, row.name, row.birthday, row.gender)
    );
    return students;
  };

  static getByPattern = async (search, page = null, item_per_page = null) => {
    try {
      const limit = this.buildLimit(page, item_per_page);
      const [rows] = await pool.execute(`SELECT * FROM student WHERE name LIKE ? ${limit}`, [`%${search}%`]);
      return this.convertArrayToObject(rows);
    } catch (error) {
      throw new Error(error)
    }
  };

  static save = async (data) => {
    try {
      const [result] = await pool.execute(
        "INSERT INTO student VALUE(?, ?, ?, ?)",
        [null, data.name, data.birthday, data.gender]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  };

  static find = async (id) => {
    try {
      const [rows] = await pool.execute('SELECT* FROM student WHERE id=?', [id]);
      if(rows.length === 0) {return null};
      const row = rows[0];
      const student = new Student(row.id, row.name, row.birthday, row.gender);
      return student;
    } catch (error) {
      throw new Error (error)
    }
  };
  update = async () => {
    try {
      await pool.execute('UPDATE student SET name=?, birthday=?, gender=? WHERE id=?', [this.name, this.birthday, this.gender, this.id]);
      return true;
    } catch (error) {
      throw new Error(error)
    }
  };
}
module.exports = Student;
