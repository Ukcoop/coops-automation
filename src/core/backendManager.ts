import * as sha256 from 'sha256';

import { flowchartParser, flowchartExecuter } from '../core/flowchartHandler';
import accountsHandler from '../core/accountsHandler';

export default class backendManeger {
  FP: flowchartParser;
  FE: flowchartExecuter;
  AH: accountsHandler;

  constructor() {
    this.FP = new flowchartParser();
    this.FE = new flowchartExecuter();
    this.AH = new accountsHandler({'localStorage': true});
  }

  signUpUser(email: string, passwordHash: string): string {
    this.AH.createAccount(email, passwordHash);
    return 'signup sucessfull';
  }

  loginUser(email: string, passwordHash: string) {
    let accString = this.AH.getAccountString(email);
    if(this.AH.authorizeAccount(email, passwordHash).split('error:') > 1 || accString.split('error:') > 1) return 'password or email was invalid';
    this.AH.addIntergration(accString, 'localStorage');
    this.AH.initializeIntergration(accString, 'localStorage');
    return 'login sucessfull';
  }

  runFlowchart(accString: string, flowchart: string) {
    let parsedFlowchart = this.FP.parseFlowchart(flowchart);
    this.FE.executeFlowchart(parsedFlowchart.executible, this.AH.authorizedAccounts[accString]);
  }
}
