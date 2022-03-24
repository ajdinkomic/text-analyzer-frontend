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
    const textAnalyzer: TextAnalyzer = {
      id: '',
      userInput: {
        text: '',
        parameter: AnalysisParameterEnum.NONE,
      },
      analysisResult: {},
      analysisDuration: 0,
      mode: '',
    };

    if (
      !userInput ||
      !userInput.text ||
      !userInput.parameter ||
      (userInput.parameter !== AnalysisParameterEnum.VOWELS && userInput.parameter !== AnalysisParameterEnum.CONSONANTS)
    ) {
      return textAnalyzer;
    }

    const timerStart: number = performance.now();

    let text: string = userInput.text.replace(/[^a-zA-Z]/g, '').toLowerCase();

    if (userInput.parameter === AnalysisParameterEnum.VOWELS) {
      text = text.replace(/[^aeiou]+/g, '');
    } else if (userInput.parameter === AnalysisParameterEnum.CONSONANTS) {
      text = text.replace(/[aeiou]+/g, '');
    }

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
