import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GroupService {
configUrl: string = 'http://bigtomato.herokuapp.com/groups/';
tempToken: string = 'b61e0cae90a812f068f36381728920385faaf8ee';
httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + this.tempToken
  })
};


  constructor(private http: HttpClient) { }
  

  getMyGroups(){
    //delete this

    return this.http.get(this.configUrl, this.httpOptions);
  }

  createNewGroup(name:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.tempToken
      })
    };
    return this.http.post(this.configUrl, {name: name}, httpOptions)
  }
  
}
const MYGROUPS = [{
  name:'Jakub Fishy', 
  image: 'http://www.webcoderskull.com/img/team4.png'
},
{
  name:'Muskan Salads', 
  image: 'http://www.webcoderskull.com/img/team1.png'
},
{
  name:'Bipin Cucumber', 
  image: 'http://www.webcoderskull.com/img/team3.png'
},
{
  name:'Kristaps The King', 
  image: 'http://www.webcoderskull.com/img/team2.png'
}
];