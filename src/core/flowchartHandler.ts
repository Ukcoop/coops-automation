interface StepMetadata {
  stepName: string;
  stepFunction: Function;
  stepIds: Array<string>;
}

interface flowchartData {
  chart: string;
  executible: object;
}

//this is for later when flowcharts are created by a UI
function uidGenrator(): string {
  const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  for(let i = 0; i < 5; i++) {
    res += alfabet[Math.random(0,25)];
  }
  return res;
}

function insideParentheses(input: string) {
  return input.split('(')[1].split(')')[0];
}

export class flowchartParser {
  parseFlowchart(chart: string): flowchartData {
    // this is how the flowchart steps are formatted: action(input)@intergration~customText[uid-->uid],
    let chartList: Array<string> = chart.split(';');
    chartList.splice(chartList.indexOf(''), 1);
    let res = 'graph LR;';
    let executible = {'startId': ''};

    for(let i = 0; i < chartList.length; i++) {
      let parsedStep: StepMetadata = this.parseStep(chartList[i]);
      if(parsedStep.stepIds[1] !== '00000') {
        // this helps make sure if a label is needed (and prevents bugs too)
        let nextString: string = (i < chartList.length -1) ? `(${chartList[i+1].split('~')[1].split('[')[0]})` : '';
        res += `${parsedStep.stepIds[0]}(${parsedStep.stepName})-->${parsedStep.stepIds[1]}${nextString};`;
      }
      if(executible.startId == '') executible.startId = parsedStep.stepIds[0];
      executible[parsedStep.stepIds[0]] = {'stepFunction': parsedStep.stepFunction, 'nextStep': parsedStep.stepIds[1]};
    }

    return ({
      'chart': res,
      'executible': executible,
    });
  }

  parseStep(step: string): StepMetadata {
    let stepName = '';
    let stepFunction: Function;
    let stepIds = [];
    
    //gets the function with the data for its input and creates a function witch exeutes it
    let funcName = step.split('~')[0].split('@')[0].split('(')[0];
    funcName = funcName.split(' ')[funcName.split(' ').length - 1];

    let funcInput = insideParentheses(step.split('~')[0].split('@')[0]).split(',');
    let funcIntergration = step.split('~')[0].split('@')[1];
    stepFunction = { funcName, funcInput, funcIntergration };

    //gets the name to be displayed
    stepName = step.split('~')[1].split('[')[0];

    //get the step id
    stepIds = step.split('~')[1].split('[')[1].split('-->');
    stepIds[1] = stepIds[1].split(']')[0];

    return { stepName, stepFunction, stepIds };
  }
}

export class flowchartExecuter {
  executeStep(stepFunction: object, intergrations: object) {
    if(stepFunction.funcIntergration == 'localStorage') {
      if(stepFunction.funcName == 'addEntry' | 'changeEntry') {
        return intergrations[stepFunction.funcIntergration][stepFunction.funcName](stepFunction.funcInput[0], stepFunction.funcInput[1]);
      }
      if(stepFunction.funcName == 'deleteEntry' | 'getEntry') {
        return intergrations[stepFunction.funcIntergration][stepFunction.funcName](stepFunction.funcInput[0]);
      }
      if(stepFunction.funcName == 'getKeys') {
        return intergrations[stepFunction.funcIntergration][stepFunction.funcName]();
      }
    }

    return 'step was invalid';
  }

  executeFlowchart(chartExecutible: object, intergrations: object, step = '') {
    let currentStep = chartExecutible.startId;
    while(currentStep !== '00000') {
    this.executeStep(chartExecutible[currentStep].stepFunction, intergrations);
    currentStep = chartExecutible[currentStep].nextStep;
    }
  }
}
