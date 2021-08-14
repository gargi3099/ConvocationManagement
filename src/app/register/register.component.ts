import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Details } from 'src/models/structure.model';
import { from } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  object1:Details={enroll:'',name:'',mname:'',fname:'',branch:'',email:'',phone:0,address:'',guestno:0,guestnames:''}
  result1=[]
  isavailable=false;
  search={enrollS:'',branchS:'',nameS:'',eligibility:''}
  constructor(public memberService:MemberService, public router:Router) {
    //memberService.getEligibility(this.search)
    memberService.getseats();
   }

  ngOnInit() {
  }

  addMember(){
    this.memberService.addData(this.object1)
    this.object1={enroll:'',name:'',mname:'',fname:'',branch:'',email:'',phone:0,address:'',guestno:0,guestnames:''}
    this.router.navigateByUrl('/home')
  }
  submitSearch(searchData:NgForm){
    //console.log(searchData.value)
    this.search=searchData.value;
    this.memberService.getEligibility(searchData.value);
    searchData.resetForm();
    // this.router.navigateByUrl('/home')
  }

  submitCall(formData:NgForm){
    console.log(formData)
    this.object1.enroll=this.search.enrollS;
    this.object1.name=this.search.nameS;
    this.object1.mname=formData.value.mname;
    this.object1.fname=formData.value.fname;
    this.object1.branch=this.search.branchS;
    this.object1.email=formData.value.email;
    this.object1.phone=formData.value.phone;
    this.object1.address=formData.value.address;
    this.object1.guestno=formData.value.guestno;
    this.object1.guestnames=formData.value.guestnames;
    this.memberService.addData(this.object1)
    
    this.router.navigateByUrl('/ticket')
    formData.resetForm()
    
  }
}
