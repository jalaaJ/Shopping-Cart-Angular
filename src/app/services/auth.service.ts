import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000";
  
  private readonly loggedInKey = 'isUserLoggedIn';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in the authentication state
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();



  constructor(private http: HttpClient) { }

  // Check if the user is logged in
  checkLoggedInState(): void {
    const storedValue = sessionStorage.getItem(this.loggedInKey);
    const isLoggedIn = storedValue === 'true';
    this.isLoggedInSubject.next(isLoggedIn);
  }

  // Set the user as logged in
  setLoggedIn(): void {
    sessionStorage.setItem(this.loggedInKey, 'true');
    this.isLoggedInSubject.next(true);
  }

  // Set the user as logged out
  setLoggedOut(): void {
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    const storedValue = sessionStorage.getItem(this.loggedInKey);
    
    return of(storedValue === 'true');
  }

  registerUser(userDetails: User): Observable<any>{
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

}
