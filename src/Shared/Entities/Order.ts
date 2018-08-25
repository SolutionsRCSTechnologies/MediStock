import { Component } from '@angular/core';

@Component({
    template:""
})
export class Order{
    public order_id:string = "";
    public retailer_id:string ="";
    public retailer_name:string = "";
    public retailer_outstanding: number = 0;
    public salesman_id: string="";
    public salesman_name:string="";
    //public product_list:
    public ordered_amt: number=0;
    public order_adv:number=0;
    public order_status:string="";
}