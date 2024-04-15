import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

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

  // create user

  // get user

  // update user
}
