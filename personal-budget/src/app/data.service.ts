import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private myBudgetData: any[] | undefined; // Variable to store the data

  constructor(private http: HttpClient) { }

  getBudgetData(): Observable<any[]> {
    // Check if data is already loaded; if yes, return it as an observable
    if (this.myBudgetData) {
      return new Observable<any[]>(observer => {
        observer.next(this.myBudgetData);
        observer.complete();
      });
    }

    // If data is not loaded, make an HTTP call to fetch it
    return this.http.get<any[]>('http://localhost:3000/budget').pipe(
      tap((data: any[]) => {
        this.myBudgetData = data; // Store the data once fetched
      })
    );
  }
}
