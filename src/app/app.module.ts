import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AwardsComponent } from './awards/awards.component';
import { RegisterComponent } from './register/register.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import 'firebase/firestore';
import { auth } from 'firebase/app';
import { FooterComponent } from './footer/footer.component';
import { GraduatesComponent } from './graduates/graduates.component';
import { TicketComponent } from './ticket/ticket.component';
import swal from 'sweetalert';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { DisplayComponent } from './display/display.component';
import { BranchesComponent } from './branches/branches.component';
import { PreviousstudentsComponent } from './previousstudents/previousstudents.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleComponent,
    AwardsComponent,
    RegisterComponent,
    ContactusComponent,
    NavbarComponent,
    FooterComponent,
    GraduatesComponent,
    TicketComponent,
    AdminComponent,
    DisplayComponent,
    BranchesComponent,
    PreviousstudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
