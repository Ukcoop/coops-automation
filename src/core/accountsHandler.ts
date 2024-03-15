import * as sha256 from 'sha256';
import localStorage from "../core/localDatabaseIntergration";

interface account {
  email: string;
  passwordHash: string;
  intergrationSettings: object;
  flowcharts: Array<string>;
}

export default class accountsHandler {
  accounts: Object<account>;
  authorizedAccounts: object;
  validIntergrations: object;

  constructor(validIntergrations: Array<string>, accounts = {}) {
    this.accounts = accounts;
    this.authorizedAccounts = [];
    this.validIntergrations = validIntergrations;
  }

  createAccount(email: string, passwordHash: string): string {
    let accString = sha256(`${Math.random((2 ** 31 - 1)/ 2, 2 ** 31 - 1)}`);
    this.accounts[accString] = { email, passwordHash, 'intergrationSettings': {}, 'flowcharts': []};
    return accString;
  }

  deleteAccount(accString: string,email: string, passwordHash: string): string {
    if(this.accounts[accString] == undefined) return 'error: account does not exist';
    if(this.accounts[accString].email !== email) return 'error: email invalid'; 
    if(this.accounts[accString].passwordHash !== passwordHash) return 'error: password invalid';

    delete this.accounts[accString];
    return 'account deletion sucessfull';
  }

  getAccountString(email: string): string {
    try {
    let string = Object.keys(this.accounts).find(accString => this.accounts[accString].email === email);
    return string;
    } catch {
      return 'error: account email does not match any account';
    }
  }

  authorizeAccount(email: string, passwordHash: string, accString: string = ''): string {
    if(accString == '') {
      accString = this.getAccountString(email);
    }
    
    if(this.accounts[accString].email !== email) return 'error: email invalid'; 
    if(this.accounts[accString].passwordHash !== passwordHash) return 'error: password invalid';

    this.authorizedAccounts[accString] = {};
    return 'authorization sucessfull';
  }

  unAuthorzeAccount(accString: string) {
    delete this.authorizedAccounts[accString];
  }

  addIntergration(accString: string, intergration: string, settings = {}): string {
    if(this.validIntergrations[intergration] == undefined) return 'error: invalid intergration';
    this.accounts[accString].intergrationSettings[intergration] = settings;
    return 'added intergration';
  }

  initializeIntergration(accString: string, intergration: string): string {
    if(this.accounts[accString] == undefined) return 'error: account does not exist';
    if(this.authorizedAccounts[accString] == undefined) return 'error: account has not been authorized'; 
    if(this.validIntergrations[intergration] == undefined) return 'error: invalid intergration';

    if(intergration == 'localStorage') {
      this.authorizedAccounts[accString][intergration] = new localStorage();
    }
    return 'initialized intergration'; 
  }
}
