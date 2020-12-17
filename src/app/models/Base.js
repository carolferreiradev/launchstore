const db = require('../../config/db')

function find(filters, table) {
  let query = `SELECT * FROM ${table}`

  Object.keys(filters).map(key => {
    //WHERE | OR | AND
    query += ` ${key}`

    Object.keys(filters[key]).map(field => {
      query += ` ${field} = '${filters[key][field]}'`
    })
  })

  return db.query(query)
}

const Base = {
  init({ table }) {//cria a inicialização do objeto pegando o nome da tabela
    if (!table) throw new Error('Invalid params')

    this.table = table

    return this
  },
  async find(id) {
    const results = await find({where: {id}}, this.table)
    return results.rows[0]
  },
  async findAll() {
    const results = await find(filters, this.table)
    return results.rows
  },
  async findOne(filters) {
    const results = await find(filters, this.table)
    return results.rows[0]
  },
  async create(fields) {
    try {
      let keys = [],
        values = []

      Object.keys(fields).map(key => {
        keys.push(keys)

        values.push(fields[key])

      })
      const query = `INSERT INTO ${this.table}
        (${keys.join(',')})
        VALUES (${values.join(',')})
        RETURNING id`

      const results = await db.query(query)
      return results.rows[0].id
    } catch (error) {
      console.error(error)
    }
  },
  update(id, fields) {

    try {
      let update = []

      Object.keys(fields).map((key) => {
        // category_id = ($1)
        const line = `${key} = '${fields[key]}'`
        update.push(line)
      })

      let query = `UPDATE ${this.table} SET
      ${update.join(',')} WHERE id = ${id}`

      return db.query(query)

    } catch (error) {
      console.log(error)
    }
  },
  delete(id) {
    return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
  },
}

module.exports = Base