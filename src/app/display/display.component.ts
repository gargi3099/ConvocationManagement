import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';
// import *from 'jspdf';  
import jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  Name=this.member.rname;
  Branch=this.member.rbranch;
  Email=this.member.reid;
  Phone=this.member.rphn;
  Rgno=this.member.rguestno;
  Bookedseats=this.member.bookedseats;
  constructor(public member:MemberService, public router:Router) { }

  ngOnInit() {
  }

  download(){
  
    var data=document.getElementById('seatpdf');
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      // var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      // var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight+15)  
      //pdf.addImage(contentDataURL, 'PNG', 0, position, 208, 500)  
      pdf.save('image.pdf'); // Generated PDF   
      
  })
}
}


