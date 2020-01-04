import { MockupService } from './mockup.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    public getGoogleMapsAPiKey(): string { return "API_KEY_HERE"; }
    private baseUrl: string = 'http://localhost:50295/api/';
    public getWebSocketUrl() { return 'ws://localhost:50295/ws' }
    public getImageAbsoluteUrl(relativeUrl: string): string {return this.baseUrl.replace('api/', relativeUrl);}
    

    constructor(private http: HttpClient, private mockupService: MockupService) { }

    public get<T>(url: string, onSuccess: (response: T) => void, onError: (response: T) => void, token?: string): void {
        if(this.mockupService.resetPassword(url, onSuccess, onError)) return;
        if(this.mockupService.browseEvents(url, onSuccess, onError)) return;
        if(this.mockupService.eventDetails(url, onSuccess, onError)) return;
        if(this.mockupService.getLoggedUser(url, onSuccess, onError)) return;
        if(this.mockupService.getRegisteredEvents(url, onSuccess, onError)) return;
        if(this.mockupService.getReviewedEvents(url, onSuccess, onError)) return;
        if(this.mockupService.getCreatedEvents(url, onSuccess, onError)) return;
        if(this.mockupService.getRegistrationStatus(url, onSuccess, onError, token)) return;
        if(this.mockupService.getReview(url, onSuccess, onError)) return;
        if(this.mockupService.browseReviews(url, onSuccess, onError)) return;
        if(this.mockupService.getChatMessages(url, onSuccess, onError)) return;
        if(this.mockupService.getReviewsStats(url, onSuccess, onError)) return;
        if(this.mockupService.getLineChartStats(url, onSuccess, onError)) return;
        if(this.mockupService.getPieChartStats(url, onSuccess, onError)) return;

        this.http.get(this.baseUrl + url, { headers: this.buildHeaders(token) }).subscribe(
            (response: T) => onSuccess(response),
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    onError(error.error);
                }
            }
        );
    }

    public post<T>(url: string, onSuccess: (response: T) => void, onError: (error: any) => void, data: any, token?: string): void {
        if(this.mockupService.signin(url, onSuccess, onError, data)) return;
        if(this.mockupService.signup(url, onSuccess, onError, data)) return;
        if(this.mockupService.createEvent(url, onSuccess, onError, data)) return;
        if(this.mockupService.uploadFile(url, onSuccess, onError, data)) return;

        this.http.post(this.baseUrl + url, data, { headers: this.buildHeaders(token) }).subscribe(
            (response: T) => onSuccess(response),
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    onError(error.error);
                }
            }
        );
    }

    public put<T>(url: string, onSuccess: (response: T) => void, onError: (error: any) => void, data: any, token?: string): void {
        if(this.mockupService.editReview(url, onSuccess, onError, data)) return;

        this.http.put(this.baseUrl + url, data, { headers: this.buildHeaders(token) }).subscribe(
            (response: T) => onSuccess(response),
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    onError(error.error);
                }
            }
        );
    }

    public patch<T>(url: string, onSuccess: (response: T) => void, onError: (error: any) => void, data: any, token?: string): void {
        if(this.mockupService.changePassword(url, onSuccess, onError, data)) return;
        if(this.mockupService.userRegister(url, onSuccess, onError, data)) return;
        if(this.mockupService.userUnregister(url, onSuccess, onError, data)) return;

        this.http.patch(this.baseUrl + url, data, { headers: this.buildHeaders(token) }).subscribe(
            (response: T) => onSuccess(response),
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    onError(error.error);
                }
            }
        );
    }

    public delete<T>(url: string, onSuccess: (response: T) => void, onError: (error: any) => void, token?: string): void {
        if(this.mockupService.deleteReview(url, onSuccess, onError)) return;

        this.http.delete(this.baseUrl + url, { headers: this.buildHeaders(token) }).subscribe(
            (response: T) => onSuccess(response),
            (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    onError(error.error);
                }
            }
        );
    }

    private buildHeaders(token?: string): HttpHeaders {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': (token != null && token != '') ? 'Bearer ' + token : ''
        });
        if (token != undefined && token != null && token != '') {
            headers.append('Authorization', token);
        }
        return headers;
    }
}
