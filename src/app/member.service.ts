import { Injectable } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Details } from 'src/models/structure.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  object:Details={name:'',mname:'',fname:'',branch:'',email:'',phone:0,address:'',guestno:0,guestnames:''}
  result=[]
  eligibility=false;
  available = false;
  // row=['A','B','C','D','E','F','G','H','I','J']
  // seatrow=[]
  // seatcol=[]
  guestno;
  seat=[]
  constructor(public db:AngularFirestore, public router:Router) {
    //this.getAppMembers();
    //this.getEligibility(this.search);
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
    
    //this.seat[1]=this.row[i++]+j++;
    /*for(i=0;i<1;i++)
    {
      for(j=1;j<=2;j++)
      {
        this.seat[c++]=this.row[i]+j;
      }
    }*/

  }

  deleteData(member)
  { 
    this.db.collection("seats").doc(member).delete();
  }

  updateData(id,data){
    this.db.collection("registration").doc(id).set(data);
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
      this.result=res
      if(!this.result[0])
      {
        alert("Wrong info")
      }
      else{
        this.eligibility=this.result[0].eligibility
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

  getMemberById(id){
    return this.db.collection("eligible").doc(id).valueChanges()
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
      this.result=res
      for(c=0;c<=this.guestno;c++)
      {
        this.seat[c]=this.result[c].seatno;
        //console.log(this.result[c])
        //this.deleteData(this.result[c].id);

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
        console.log(this.result[c])
        this.deleteData(this.result[c].id);

      }
    })
    
  }

}

