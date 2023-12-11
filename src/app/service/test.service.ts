import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor( private hc:HttpClient) { }
  xyz(name:any,lastname:any,profileurl:any,email:any,number:any,age:any,state:any,country:any,address1:any,address2:any,tags:any,stringtag:any){
  
    const body = {name,lastname,profileurl,email,number,age,state,country,address1,address2,tags,stringtag}
    return this.hc.post('http://localhost:3000/api',body)
  }
  get1(name:any){
    return this.hc.get(`http://localhost:3000/api?name=${name}`)
  }
  patch1(id:any,name:any,lastname:any,profileurl:any,email:any,number:any,age:any,state:any,country:any,address1:any,address2:any,tags:any,stringtag:any){
    const body = {name,lastname,profileurl,email,number,age,state,country,address1,address2,tags,stringtag}
    return this.hc.put(`http://localhost:3000/api/${id}`,body)
  }
}
