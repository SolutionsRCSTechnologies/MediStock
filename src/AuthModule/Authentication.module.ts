import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../Shared/sharedUtil.module';
import { MedistockModule } from '../Medistock/medistock.module';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthComponent } from './Auth/Auth';
import { AuthService } from './Auth.service';
import { LogoutComponent } from './Logout/Logout';
/* Material component */
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [AuthComponent, LogoutComponent],
  imports: [
    BrowserModule,
    SharedModule,
    MedistockModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatSlideToggleModule,
    IonicModule.forRoot(AuthComponent)
  ],
  //bootstrap: [IonicApp],
  //entryComponents: [Login
  //],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  entryComponents: [LogoutComponent]
})
export class AuthModule { }
