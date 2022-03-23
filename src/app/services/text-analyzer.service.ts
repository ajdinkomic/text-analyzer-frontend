import { Injectable } from '@angular/core';
import { AnalysisModeEnum, AnalysisParameterEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';

@Injectable({
  providedIn: 'root',
})
export class TextAnalyzerService {
  constructor() {}

  analyzeText(userInput: UserInput): TextAnalyzer {
    const timerStart: number = performance.now();

    const textAnalyzer: TextAnalyzer = {
      id: '',
      userInput: {
        text: '',
        parameter: '',
      },
      analysisResult: {},
      analysisDuration: 0,
      mode: '',
    };

    let text: string = userInput.text.replace(/[^a-zA-Z]/g, '').toLowerCase();

    if (userInput.parameter === AnalysisParameterEnum.VOWELS) {
      text = text.replace(/[^aeiou]+/g, '');
    } else {
      text = text.replace(/[aeiou]+/g, '');
    }

    console.log('Text', text);

    for (const char of text) {
      if (textAnalyzer.analysisResult[char] !== undefined) {
        textAnalyzer.analysisResult[char] += 1;
      } else {
        textAnalyzer.analysisResult[char] = 1;
      }
    }

    const timerEnd: number = performance.now();
    const duration = timerEnd - timerStart;

    textAnalyzer.id = crypto.randomUUID();
    textAnalyzer.userInput = userInput;
    textAnalyzer.analysisDuration = duration;
    textAnalyzer.mode = AnalysisModeEnum.OFFLINE;

    return textAnalyzer;
  }
}
