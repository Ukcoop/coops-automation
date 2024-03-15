import Mermaid from '../components/mermaid';
import * as sha256 from 'sha256';
// import * as bcrypt from 'bcrypt'; // i want to use this for the passwords
import { flowchartParser, flowchartExecuter } from '../core/flowchartHandler';
import accountsHandler from '../core/accountsHandler';
import localStorage from "../core/localDatabaseIntergration";

export default function Home() {
  // testing code
  const chartDefinition = 'graph TD; a(start)-->b(end)'
  
  const testFlowchart = `
    addEntry(this,{"number":9})@localStorage~9[aisnr-->bhowg];
    addEntry(that,{"number":10})@localStorage~+10[bhowg-->corne];
    addEntry(meme,{"number":21})@localStorage~=21[corne-->00000];
  `;

  const testEmail = 'test@example.com';
  const testPassword = 'QWERTY';

  let FP: flowchartParser = new flowchartParser();
  let FE: flowchartExecuter = new flowchartExecuter();
  let AH: accountsHandler = new accountsHandler({'localStorage': true});

  let accountHash = AH.createAccount(testEmail, sha256(testPassword));
  AH.authorizeAccount(testEmail, sha256(testPassword), accountHash);
  AH.addIntergration(accountHash, 'localStorage');
  AH.initializeIntergration(accountHash, 'localStorage');

  let parsedFlowchart = FP.parseFlowchart(testFlowchart); 
  FE.executeFlowchart(parsedFlowchart.executible, AH.authorizedAccounts[accountHash]);
  console.log(AH.authorizedAccounts[accountHash].localStorage.database);

  return (
    <Mermaid chart={parsedFlowchart.chart} />
  );
}
