import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Details } from 'src/models/structure.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  object1:Details={name:'',mname:'',fname:'',branch:'',phone:0,address:'',guestno:0,guestnames:''}
  result1=[]
  constructor(public memberService:MemberService, public router:Router) { }

  ngOnInit() {
  }

  addMember(){
    this.memberService.addData(this.object1)
    this.object1={name:'',mname:'',fname:'',branch:'',phone:0,address:'',guestno:0,guestnames:''}
    this.router.navigateByUrl('/home')
  }
/*
  addName(){
    let object={name: this.enteredName, mail: this.email, password: this.pswd, pno: this.phone}
     this.result.push(object) 
     this.enteredName=""
     this.email=""
     this.pswd=""
     this.phone=""
     console.log(this.result)
    
  }*/

  submitCall(formData:NgForm){
    console.log(formData)
    this.memberService.addData(formData.value)
    formData.resetForm()
    this.router.navigateByUrl('/home')
  }
}
