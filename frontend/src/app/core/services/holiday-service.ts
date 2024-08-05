import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { Holiday } from '../models/Holiday';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private URL = "http://localhost:3000/holiday-management"; // Update the URL to use "Holiday" instead of "foyer"
  private httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  private _listners = new Subject<any>();
   listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
  constructor(private http: HttpClient) { }

  getAll():Observable<Holiday[]> { // Change method name
    return this.http.get<Holiday[]>(this.URL, this.httpOtions);
  }
  addHoliday( 
    createholidaydto: Holiday): Observable<Holiday> {
      return this.http.post<Holiday>(
        this.URL,
        createholidaydto,
        this.httpOtions
      );
  }





  getHolidayById(id: String):Observable<Holiday | string >  { // Change method name
    return this.http.get<Holiday | string>(`${this.URL}/${id}`,this.httpOtions).pipe(
      catchError(error => {
        console.error('Error fetching holiday by ID:', error);
        return throwError(error);
      })
    );
  }

  
  

 

  updateHoliday(    id: string,
    updateHolidayDto:Holiday
    ) : Observable<any> {
    return this.http.put(
      `${this.URL}/${id}`,
      updateHolidayDto,
      this.httpOtions
    );
  }



  deleteHoliday(id: string):Observable<boolean> { 
    return this.http.delete<boolean>(`${this.URL}/${id}`, this.httpOtions);
  }
 
}
