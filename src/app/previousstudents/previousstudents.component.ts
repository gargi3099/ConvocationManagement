import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-previousstudents',
  templateUrl: './previousstudents.component.html',
  styleUrls: ['./previousstudents.component.scss']
})
export class PreviousstudentsComponent implements OnInit {
  isclicked=false;
  branch:string
  constructor(public memberService: MemberService,public route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res=>{
      console.log(res['a'])
      this.branch=res['a']
    })
  }
  searchStudent(formData:NgForm){
    console.log(formData);
     
     this.isclicked=true;
     console.log(this.isclicked);
     this.memberService.getPreviousStudents(this.branch,formData.value.year);

   }
}
