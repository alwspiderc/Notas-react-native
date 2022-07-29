import * as SQLite from 'expo-sqlite'

function abreConexao() {
 const database = SQLite.openDatabase("sqlite.db")
 return database
}

export const db = abreConexao()