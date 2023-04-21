import {Injectable} from "@angular/core";
import {User} from "./models/user-data.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../assets/environment";
import {SubjModel} from "./models/subj-data.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(private http: HttpClient) {}
  addUser(user: User) {
    this.http.post<{message: string}>(
      BACKEND_URL + '/addUser',
      user
    ).subscribe(res => {
      alert(res.message);
    });
  };

  addSubj(subj: SubjModel) {
    this.http.post<{message: string}>(
      BACKEND_URL + '/addSubj',
      subj
    ).subscribe(res => {
      alert(res.message);
    })
  }
  deleteUser(imie: string, nazwisko: string) {
    this.http.delete<{message: string}>(
      BACKEND_URL + '/deleteUser/' + imie + '/' + nazwisko
    )
  }

  deleteSubj(id: number) {
    console.log("URL:")
    console.log(BACKEND_URL + '/deleteSubj/' + id)
    this.http.delete<{message: string}>(
      BACKEND_URL + '/deleteSubj/' + id
    )
  }

}
