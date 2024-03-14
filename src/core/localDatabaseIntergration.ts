export default class localDatabase {
  database: object;
  actions: object;
  humanReadable: object;
 
  constructor() {
    this.database = {};
    this.actions = {
      'addEntry': 'adds a database entry to the local database',
      'deleteEntry': 'deletes a database entry from the local database',
      'changeEntry': 'changes the data in a database entry',
      'getEntry': 'retrives the data of a database entry',
      'getKeys': 'gets all the local database entry keys',
    }
    this.humanReadable = {
      'addEntry': 'add local database entry',
      'deleteEntry': 'delete local database entry',
      'changeEntry': 'change data in entry',
      'getKeys': 'get all entries',
      'getEntry': 'get data from local database',
    }
  }

  addEntry(key: number, data: object) {
    this.database[key] = data;
  }

  deleteEntry(key: string) {
    delete this.database[key];
  }

  changeEntry(key: string, changedData: object) {
    this.database[key] = changedData;
  }

  getEntry(key: string): object {
    return this.database[key];
  }

  getKeys(): Array<string> {
    return Object.keys(this.database);
  }
}
