import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {IUserCommandRequest, IUserModel, IUserRegistrationRequest} from "../models/user.model";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {map, switchMap, take} from "rxjs/operators";
import {CommonUtils} from "../../utils/common-utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private COLLECTION = 'users';

  constructor(
    public afs: AngularFirestore, // Inject Firestore service

  ) {
  }

  // registration user
  registerUser(request: IUserRegistrationRequest): Observable<string> {
    const createUserRequest: IUserCommandRequest = {
      ...request
    };
    return this.createUser(createUserRequest);
  }

  // create user
  createUser(request: IUserCommandRequest): Observable<string> {
    if (!request.id) {
      request = {
        ...request,
        id: CommonUtils.generateUUID()
      }
    }
    return fromPromise(this.afs.collection(this.COLLECTION).doc(request.id).set({
      ...request,
    })).pipe(map(() => request.id
    ), take(1));
    // return fromPromise(this.afs.collection(this.COLLECTION).add(request)).pipe(switchMap((res) => {
    //     console.log('res', res)
    //     return res.get();
    //   }),
    //   take(1))
  }

  // get user

  detail(id: string): Observable<IUserModel> {
    return this.afs.doc<IUserModel>(`${this.COLLECTION}/${id}`).valueChanges();
  }

  // update user
  update(id: string, request: IUserCommandRequest): Observable<IUserModel> {
    return fromPromise(this.afs.doc<IUserModel>(`${this.COLLECTION}/${id}`).update(request)).pipe(
      switchMap(() => this.detail(id)),
      take(1)
    )
  }
}
