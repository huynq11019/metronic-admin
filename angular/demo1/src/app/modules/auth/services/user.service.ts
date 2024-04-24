import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {IUserCommandRequest, IUserModel, IUserRegistrationRequest} from "../models/user.model";
import {Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {map, switchMap, take} from "rxjs/operators";
import {CommonUtils} from "../../utils/common-utils";
import {ISearchWithPaginationOptionally} from "../../shared/constants/request.constants";
import firebase from "firebase";

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
      ...request,
      createdAt: new Date()
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
      if (!request.pic) {
        request.pic = '/assets/media/avatars/150-2.jpg';
      }
    }
    return fromPromise(this.afs.collection(this.COLLECTION).doc(request.id).set({
      ...request,
      createdAt: new Date()
    })).pipe(map(() => request.id
    ), take(1));
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

  // searchUser
  search(searchRequest: ISearchWithPaginationOptionally): Observable<IUserModel[]> {

    return  this.afs.collection<IUserModel>(this.COLLECTION, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

      if (searchRequest.pageSize) {
        query = query.limit(searchRequest.pageSize);
      }
      query = query.orderBy('email', 'desc');
      if (searchRequest.startAfter) {
        query = query.startAfter(searchRequest.startAfter);
      }
      return query;
    }).valueChanges()
      .pipe(take(1));
  }

  count(searchRequest: ISearchWithPaginationOptionally): Observable<number> {
    return this.afs.collection(this.COLLECTION, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      return query;
    }).get().pipe(map((snapshot) => snapshot.size), take(1));
  }
}
