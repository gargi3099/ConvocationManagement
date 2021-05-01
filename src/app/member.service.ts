import { Injectable } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Details } from 'src/models/structure.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  object:Details={name:'',mname:'',fname:'',branch:'',phone:0,address:'',guestno:0,guestnames:''}
  result=[]
  constructor(public db:AngularFirestore, public router:Router) {
    //this.getAppMembers();
   }

   addData(member)
  {
    let tempMember:{name:string,mname:string,fname:string,branch:string,phone:number,address:string,guestno:number,guestnames:string}=member
    tempMember.name=member.name
    tempMember.mname=member.mname
    tempMember.fname=member.fname
    tempMember.branch=member.branch
    tempMember.phone=member.phone
    tempMember.address=member.address
    tempMember.guestno=member.guestno
    tempMember.guestnames=member.guestnames
    this.db.collection("registration").add(tempMember) 
    alert("Registration Successful.")
  }

  deleteData(member)
  { 
    this.db.collection("registration").doc(member.id).delete();
  }

  updateData(id,data){
    this.db.collection("registration").doc(id).set(data);
  
  }
/*
  getAppMembers(){
    this.db.collection("registration",ref=>ref.where('createdBy','==',this.auth.getUserId()).orderBy('amount','asc'))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      this.result=res
      console.log(res)
    })
    
  }

  getMemberById(id){
    return this.db.collection("registration").doc(id).valueChanges()
  }*/
}

