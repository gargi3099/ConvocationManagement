import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Location} from '@angular/common';
import { NgForm } from '@angular/forms';
import { MemberService } from '../member.service';
import swal from 'SweetAlert';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
i:number=0
  constructor(private auth:AuthService, private lock:Location, private memberService:MemberService) { 
    memberService.getstudents()
  }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
    this.lock.back();  
  }

  submitstudent(formData:NgForm){
    console.log(formData)
    this.memberService.addStudent(formData.value)
    this.memberService.addStudentdata(formData.value)
    formData.resetForm()
    // this.router.navigateByUrl('/home')
  }

  clearit(){
for(this.i=0;this.i<this.memberService.students.length;this.i++){
  this.memberService.deleteStudent(this.memberService.students[this.i].id);
}
swal({
  title: "Previous Students Deleted Successfully",
  // text: "Hospital registered successfully",
  icon: "success",
});

  }
}
