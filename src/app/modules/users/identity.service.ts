import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from 'src/app/modules/users/models/user';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  public readonly isSigned!: Observable<boolean>;

  public readonly currentUser!: Observable<User | null>;

  // tslint:disable-next-line:variable-name
  private readonly _currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    this.currentUser = this._currentUser.asObservable();
    this.isSigned = this.currentUser.pipe(map(user => !!user));
  }

  public logout(): void {
    this._currentUser.next(null);
  }

  public signIn(login: string, password: string): Observable<void> {
    return of(undefined)
      .pipe(
        delay(2500),
        map(() => this._currentUser.next(new User(login, password))),
      );
  }

}
