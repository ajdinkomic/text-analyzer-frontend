import { Injectable } from '@angular/core';
import { AnalysisModeEnum, AnalysisParameterEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';

@Injectable({
  providedIn: 'root',
})
export class TextAnalyzerService {
  private textAnalyzer: TextAnalyzer = {
    id: '',
    userInput: {
      text: '',
      parameter: '',
    },
    analysisResult: {},
    analysisDuration: 0,
    mode: '',
  };

  constructor() {}

  analyzeText(userInput: UserInput): TextAnalyzer {
    const timerStart: number = performance.now();

    let text: string = userInput.text.replace(/[^a-zA-Z]/g, '').toLowerCase();

    if (userInput.parameter === AnalysisParameterEnum.VOWELS) {
      text = text.replace(/[^aeiou]+/g, '');
    } else {
      text = text.replace(/[aeiou]+/g, '');
    }

    console.log('Text', text);

    for (const char of text) {
      if (this.textAnalyzer.analysisResult[char] !== undefined) {
        this.textAnalyzer.analysisResult[char] += 1;
      } else {
        this.textAnalyzer.analysisResult[char] = 1;
      }
    }

    const timerEnd: number = performance.now();
    const duration = timerEnd - timerStart;

    this.textAnalyzer.id = crypto.randomUUID();
    this.textAnalyzer.userInput = userInput;
    this.textAnalyzer.analysisDuration = duration;
    this.textAnalyzer.mode = AnalysisModeEnum.OFFLINE;

    return this.textAnalyzer;
  }
}
