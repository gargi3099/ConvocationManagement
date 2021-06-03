import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MemberService } from '../member.service';


@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.scss']
})
export class GraduatesComponent implements OnInit {
  isclicked=false;
  constructor(public memberService: MemberService) { }

  ngOnInit() {
  }

  searchStudent(formData:NgForm){
    console.log(formData);
     
     this.isclicked=true;
     console.log(this.isclicked);
     this.memberService.getAppMembers(formData.value.branch);

   }

}
