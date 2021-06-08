import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  students(a){
    this.router.navigate(['/students/',a])
//this.router.navigateByUrl('\students')
  }
}
