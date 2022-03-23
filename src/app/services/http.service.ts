import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}

    requestAnalysis(userInput: UserInput): Observable<TextAnalyzer> {
        return this.http.post<TextAnalyzer>('http://localhost:8080/text-analyzer', userInput);
    }
}
