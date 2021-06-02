import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSignedIn=false;
  loggedinuserid;
  constructor(public router:Router, public auth:AngularFireAuth) {
    auth.user.subscribe(res=>{
      console.log(res);
      if(res.uid){
      // this.loggedinuserid=res.uid;
      this.isSignedIn=true;
    }
      else{
        this.isSignedIn=false;
      }
    })
   }
  signIn(email,password){
    return this.auth.auth.signInWithEmailAndPassword(email,password).then(res=>{
      this.isSignedIn=true;
      this.loggedinuserid=res.user.uid
      this.router.navigateByUrl('/admin');
      console.log("signedin");
    }).catch(res=>{
      alert(res)
    })
  }

  isUserSignedIn(){
    return this.isSignedIn;
  }

  logout(){
    this.isSignedIn=false;
    this.auth.auth.signOut();
    console.log("loggedout");
    
  }
  getuserid(){
    return this.loggedinuserid
  }
}
