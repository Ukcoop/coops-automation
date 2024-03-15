import Mermaid from '../components/mermaid';
import * as sha256 from 'sha256';
// import * as bcrypt from 'bcrypt'; // i want to use this for the passwords
import { flowchartParser, flowchartExecuter } from '../core/flowchartHandler';
import accountsHandler from '../core/accountsHandler';
import backendManeger from "../core/backendManager";
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

  let BM: backendManeger = new backendManeger();

  BM.signUpUser(testEmail, sha256(testPassword));
  BM.loginUser(testEmail, sha256(testPassword));

  let accountHash = BM.AH.getAccountString(testEmail); // this gets ran only internally and is never used for unauthorised users
  BM.runFlowchart(accountHash, testFlowchart);

  let parsedFlowchart = BM.FP.parseFlowchart(testFlowchart); 

  return (
    <Mermaid chart={parsedFlowchart.chart} />
  );
}
