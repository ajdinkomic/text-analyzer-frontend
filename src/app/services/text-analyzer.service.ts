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
    // Create textAnalyzer object with empty properties
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

    // Return empty object if text or parameter is incorrect
    if (
      !userInput ||
      !userInput.text ||
      !userInput.text.replace(/\s+/g,'').length ||
      !userInput.parameter ||
      (userInput.parameter !== AnalysisParameterEnum.VOWELS && userInput.parameter !== AnalysisParameterEnum.CONSONANTS)
    ) {
      return textAnalyzer;
    }

    // Start timer
    const timerStart: number = performance.now();

    // Transform text to lower case and replace all non-letter characters with empty string
    let text: string = userInput.text.toLowerCase().replace(/[^a-z]/g, '');

    if (userInput.parameter === AnalysisParameterEnum.VOWELS) {
      // Remove all consonants
      text = text.replace(/[^aeiou]+/g, '');
    } else {
      // Remove all vowels
      text = text.replace(/[aeiou]+/g, '');
    }

    // Store analysis result to textAnalyzer's analysisResult property by iterating over text
    for (const char of text) {
      if (textAnalyzer.analysisResult[char] !== undefined) {
        textAnalyzer.analysisResult[char] += 1;
      } else {
        textAnalyzer.analysisResult[char] = 1;
      }
    }

    // End timer and calculate time elapsed
    const timerEnd: number = performance.now();
    const duration = timerEnd - timerStart;

    textAnalyzer.id = crypto.randomUUID();
    textAnalyzer.userInput = userInput;
    textAnalyzer.analysisDuration = duration;
    textAnalyzer.mode = AnalysisModeEnum.OFFLINE;

    return textAnalyzer;
  }
}
