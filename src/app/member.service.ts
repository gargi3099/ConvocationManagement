import { Injectable } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Details } from 'src/models/structure.model';
import swal from 'SweetAlert';
import * as firebase from 'firebase';
import { resolve } from 'url';
import {async} from 'babel-plugin-transform-async-to-generator'
import { variable } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root',
})
export class MemberService {
  object:Details={name:'',mname:'',fname:'',branch:'',phone:0,address:'',guestno:0,guestnames:''}
  result=[]
  students=[]
  constructor(public db:AngularFirestore, public router:Router) {
     //this.getschedule();
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
  deleteStudent(studentid)
  { 
    this.db.collection("eligibilityCriteria").doc(studentid).delete();
  }

  getstudents(){
    this.db.collection("StudentData")
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      //  console.log(res)
      this.students=res
      console.log(this.students)
    })
  }

  getschedule(){
    /*console.log(this.auth.loggedinuserid)*/
    this.db.collection("schedule")
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      //  console.log(res)
      this.result=res
      console.log(this.result)
    })
  }

  addStudent(member)
  {
    let tempStudent:{Name:string,Branch:string,eligibility:string,RollNo:string,YearOfGrad:string}=member
    tempStudent.Name=member.Name
    tempStudent.Branch=member.Branch
    tempStudent.eligibility=member.eligibility
    tempStudent.RollNo=member.RollNo
    tempStudent.YearOfGrad=member.YearOfGrad
    this.db.collection("eligibilityCriteria").add(tempStudent) 
    swal({
      title: "Student Registered Successfully",
      // text: "Hospital registered successfully",
      icon: "success",
    });
    //alert("Student Successfully Added.")
  }
  addStudentdata(member)
  {
    let tempStudent:{Name:string,Branch:string,eligibility:string,RollNo:string,YearOfGrad:string}=member
    tempStudent.Name=member.Name
    tempStudent.Branch=member.Branch
    tempStudent.eligibility=member.eligibility
    tempStudent.RollNo=member.RollNo
    tempStudent.YearOfGrad=member.YearOfGrad
    this.db.collection("StudentData").add(tempStudent) 
    //alert("Student Successfully Added.")
  }


}

