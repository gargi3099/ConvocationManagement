import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Details } from 'src/models/structure.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(public memberService:MemberService, public router:Router) { 
    memberService.getSeat();
  }

  ngOnInit() {
    
  }

}
