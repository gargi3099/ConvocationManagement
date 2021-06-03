import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MemberService } from './member.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ConvocationManagement';
  constructor(public expense:MemberService){
    expense.getschedule();
  } 
  
  ngOnInit() {
    
  }
}
