'use client';

import Mermaid from '../components/mermaid';
import { flowchartParser, flowchartExecuter } from "../core/flowchartHandler";
import localStorage from "../core/localDatabaseIntergration.ts";

export default function Home() {
  // testing code
  const chartDefinition = 'graph TD; a(start)-->b(end)'
  
  const testFlowchart = `
    addEntry(this,{"number":9})@localStorage~9[aisnr-->bhowg];
    addEntry(that,{"number":10})@localStorage~+10[bhowg-->corne];
    addEntry(meme,{"number":21})@localStorage~=21[corne-->00000];
  `;

  let appIntergrations = {
    'localStorage': new localStorage(),
  }

  let FP: flowchartParser = new flowchartParser();
  let FE: flowchartExecuter = new flowchartExecuter();
  
  let parsedFlowchart = FP.parseFlowchart(testFlowchart); 
  FE.executeFlowchart(parsedFlowchart.executible, appIntergrations);
  console.log(appIntergrations.localStorage.database);

  return (
    <Mermaid chart={parsedFlowchart.chart} />
  );
}
