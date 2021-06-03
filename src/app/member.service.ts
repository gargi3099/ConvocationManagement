import { Injectable } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Details } from 'src/models/structure.model';
import swal from 'SweetAlert';
import * as firebase from 'firebase';
import { resolve } from 'url';
import { variable } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root',
})
export class MemberService {
  object:Details={name:'',mname:'',fname:'',branch:'',email:'',phone:0,address:'',guestno:0,guestnames:''}
  result=[]
  result1 :any;
  eligible=[]
  seats=[]
  eligibility=false;
  available = false;
  guestno;
  seat=[]
  students=[]
  constructor(public db:AngularFirestore, public router:Router) {
    
  }
  

   addData(member)
  {
    //let i=0,j=1,c=0
    let tempMember:{name:string,mname:string,fname:string,branch:string,email:string,phone:number,address:string,guestno:number,guestnames:string}=member
    tempMember.name=member.name
    tempMember.mname=member.mname
    tempMember.fname=member.fname
    tempMember.branch=member.branch
    tempMember.email=member.email
    tempMember.phone=member.phone
    tempMember.address=member.address
    tempMember.guestno=member.guestno
    tempMember.guestnames=member.guestnames

    this.guestno = member.guestno
    this.db.collection("registration").add(tempMember) ;
    this.getSeat();
    

  }

  deleteData(member)
  { 
    this.db.collection("seats").doc(member).delete();
  }
  deleteStudent(studentid)
  { 
    this.db.collection("eligibilityCriteria").doc(studentid).delete();
  }

  getEligibility(member){
    let promise = new Promise((resolve, reject) => {
    this.db.collection("eligible",ref=>ref.where('branch','==',member.branchS).where('name','==',member.nameS))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      //  console.log(res)
      this.eligible=res
      if(!this.eligible[0])
      {
        alert("Wrong info")
      }
      else{
        this.eligibility=this.eligible[0].eligibility
        if(this.eligibility)
        {
            this.available=true;
            swal({
              text: "You are eligible!",
              icon: "success",
            });
        }
        else{
            swal({
              text: "You are not eligible!",
              icon: "error",
            });
        }
      } 
    })
  });
  return promise;
  }

  getSeat(){
    let c;
    this.db.collection("seats",ref=>ref.orderBy('seatno','asc'))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      this.seats=res
      for(c=0;c<=this.guestno;c++)
      {
        this.seat[c]=this.seats[c].seatno;
        //console.log(this.seats[c])
        //this.deleteData(this.seats[c].id);

      }
      //console.log(this.seat)
      this.available=false;
      swal({
        title: "Registered Successfully!",
        text: "You are now welcome to the convocation!\n Your seat numbers are :- " + this.seat,
        icon: "success",
      });
      for(c=0;c<=this.guestno;c++)
      {
        console.log(this.seats[c])
        this.deleteData(this.seats[c].id);

      }
    })
    
  }

  getMemberById(id){
    return this.db.collection("registration").doc(id).valueChanges()
  }


  getAppMembers(branch){
    this.db.collection("eligibilityCriteria",ref=>ref.where('Branch','==',branch))
     .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      this.result1=res;
      console.log(res)
    })
    
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

