import { UserInput } from './user-input';

export interface TextAnalyzer {
    id: string;
    userInput: UserInput;
    analysisResult: { [key: string]: number };
    analysisDuration: number;
    mode?: string;
}
