import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showModal: boolean;
  submitted = false;
  email="";
  password="";
  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router) {   
  }

  show()
  {   
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
    this.email="";
      this.password="";
    
  }
  ngOnInit() {
}
onSubmit() {
    this.submitted = true;
    if(this.submitted)
    {
      this.showModal = false;
      this.auth.signIn(this.email,this.password)
      .then(() =>
      {  
      // formData.resetForm();
      this.email="";
      this.password="";
      }).catch(_error =>{
    this.router.navigateByUrl('/home');
    })
}
this.submitted=false;
}
}
