import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of, Subscription, throwError} from 'rxjs';
import {catchError, finalize, map, switchMap, take, tap} from 'rxjs/operators';
import {IUserModel, UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {AuthHTTPService} from './auth-http';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from '@angular/fire/firestore';
import {fromPromise} from "rxjs/internal-compatibility";

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    console.log('currentUserSubject', this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  /**
   * @description Log in
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<UserType> {
    // this.isLoadingSubject.next(true);
    // return this.authHttpService.login(email, password).pipe(
    //   map((auth: AuthModel) => {
    //     const result = this.setAuthFromLocalStorage(auth);
    //     return result;
    //   }),
    //   switchMap(() => this.getUserByToken()),
    //   catchError((err) => {
    //     console.error('err', err);
    //     return of(undefined);
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );
    return fromPromise(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        if (!userCredential.user) {
          console.warn('userCredential fail', userCredential)
          return EMPTY
        }

        return this.getUserByToken();
      }),

      catchError((err) => {
        console.log('err', err)
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)))
      .pipe(tap(res => {
        console.log('authResponse ', res);

      }))

  }

  /**
   * @description OAuth login
   * @param provider
   */
  oauthPopup(provider: firebase.auth.AuthProvider): Observable<UserType> {
    return fromPromise(this.afAuth.signInWithPopup(provider))
      .pipe(switchMap((userCredential) => {
        debugger
          console.log('userCredential', userCredential)
          if (!userCredential.user) {
            console.warn('userCredential fail', userCredential)
            return EMPTY
          }

          return this.getCurrentUser().pipe(
            // create user if not existed
            switchMap((user) => {

              if (!user) {
                const userCreate: IUserModel = {
                  id: userCredential.user?.uid ?? '',
                  username: userCredential.user?.email ?? '',
                  password: '',
                  fullname: userCredential.user?.displayName ?? '',
                  email: userCredential.user?.email ?? '',
                  pic: userCredential.user?.photoURL ?? './assets/media/users/default.jpg',
                  roles: [],
                  occupation: '',
                  firstname: '',
                  lastname: '',
                  website: '',
                  language: '',
                  // get timezone from browser
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? '',
                  communication: {
                    email: false,
                    sms: false,
                    phone: false,
                  }
                }
                return this.createUser(userCreate).pipe(
                  tap((res) => {
                      console.log('createUser', res)
                    }
                  ))

              }
              return of(user);
            })
          );
        }),
        catchError((err) => {
          console.log('err', err)
          return of(undefined);
        }),
        tap((res: any) => {
          console.log('authResponse ', res);
          if (!res) {
            this.logout();
          } else {
            this.currentUserSubject.next(res);
          }
        }),
        finalize(() => this.isLoadingSubject.next(false)))
  }

  /**
   * @description Log out
   */
  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem(this.authLocalStorageToken);
        this.router.navigate(['/auth/login'], {
          queryParams: {},
        }).then();
      })

  }

  /**
   * @description Get user by token
   */
  getUserByToken(): Observable<UserType> {

    this.isLoadingSubject.next(true);
    return this.getCurrentUser().pipe(
      tap(user => {
        console.log('user', user);
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );

  }

  /**
   * @description Get current user
   * @private
   */
  private getCurrentUser(): Observable<UserModel | undefined> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          return of(undefined);
        }
        return this.afs.collection('users').doc(user.uid).get().pipe(map((user) => {
          return user.data() as UserModel;
        }))
      }),
      catchError((err) => {
        console.error('get user in store error', err);
        return of(undefined);
      }),
      take(1),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: IUserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  /**
   * @description Forgot password
   * @param email
   */

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return fromPromise(this.afAuth.sendPasswordResetEmail(email)).pipe(
      map(() => true),
      catchError(() =>
        of(false)
      ),
      finalize(() => this.isLoadingSubject.next(false)));
    // return this.authHttpService
    //   .forgotPassword(email)
    //   .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // create user in firestore
  createUser(user: IUserModel): Observable<IUserModel> {
    if (!user.id) {
      return EMPTY;
    }
    return fromPromise(this.afs.collection('users').doc(user.id).set(user))
      .pipe(map((res) => {
        console.log('res', res)
        return user;
      }),
        take(1));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
