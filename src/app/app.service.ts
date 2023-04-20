import {Injectable} from "@angular/core";
import {User} from "./models/user-data.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../assets/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(private http: HttpClient) {}
  onAddUser(user: User) {
    this.http.post<{message: string}>(
      BACKEND_URL + '/addUser',
      user
    ).subscribe(res => {
      console.log(res);
    })
  }
}
