import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
@Injectable()
export class AppStorage {

    public static UserName: string = 'UserName';
    public static UserId: string = 'UserId';
    public static UserType: string = 'UserType';
    public static UserRole: string = 'UserRole';
    public static SessionId: string = 'SessionId';
    public static ElapsedTime: string = 'ElapsedTime';

    //private localStore: Storage = null;
    constructor(private storage: Storage) {
        //  this.localStore = storage;
    }

    public Remove(key: string) {
        return this.storage.remove(key);
    }

    public Get(key: string) {
        try {
            console.log(3);
            return this.storage.get(key);
        } catch (e) {
            console.log(4);
        }
    }

    public Set(key: string, value: any) {
        try {
            console.log(1);
            return this.storage.set(key, value);
        } catch (e) {
            console.log(2);
        }
    }

    public Contains(key: string) {
        return this.storage.keys().then(res => {
            let hasKey: boolean = false;
            if (res && res.length > 0) {
                hasKey = res.indexOf(key) > -1;
            }
            return hasKey;
        });
    }

    public Allkeys() {
        return this.storage.keys();
    }

    public GetDriver() {
        return this.storage.driver;
    }
}