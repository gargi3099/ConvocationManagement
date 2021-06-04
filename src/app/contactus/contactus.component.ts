import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'SweetAlert';
import { AuthService } from '../auth.service';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(private as:AuthService,private member:MemberService) { }

  ngOnInit() {
  }
  addContact(formData:NgForm){
    
    console.log(formData)
     this.member.addContactForm(formData.value)
    formData.resetForm()
    swal({
      title: "Thank you for sharing your message with us!",
     // text: "Thank you for sharing your message with us!",
        icon: "success",
     });
}
}
