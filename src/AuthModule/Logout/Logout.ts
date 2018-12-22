import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../Auth.service';
import { AuthComponent } from '../Auth/Auth';

@Component({
    selector: 'logout',
    templateUrl: './Logout.html'
})
export class LogoutComponent implements OnInit {
    public message: string = 'Successfull';

    constructor(private navCtrl: NavController, private auth: AuthService) {

    }

    ngOnInit() {
        let header = {
            userid: '',
            sessionid: ''
        }
        this.auth.GetAuthDetails().then(res => {
            if (header) {
                header.userid = res.UserId;
                header.sessionid = res.SessionId;
            }
            this.auth.logoutAuth(header).subscribe(obs => {
                if (obs && obs.header && obs.header.errorcode === 0) {
                    this.auth.RemoveAuthDetails().then(res => {
                        this.message = 'Successful';
                        this.navCtrl.push(AuthComponent);
                    }, (err) => {
                        this.message = 'Partialy Successful';
                        this.navCtrl.push(AuthComponent);
                    });
                } else {
                    this.message = 'Unsuccessful';
                }
            });
        });
    }

}