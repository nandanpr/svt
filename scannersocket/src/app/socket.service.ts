
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/dom/webSocket';




interface Frame {
    msgtype: string;
    data: any;
};



export interface Message {
    /*
    msgtype:string;
    itemtype:string
    operation:string;
    */
    toString(): string;
    
}

/*
export enum OperationType {
    
    WriteReq,
    ReadReq,
    WriteRes,
    ReadRes,
    
}

enum MessageType {
    
    ItemCashing,
    Bond,
    Payment,
    Deposit,
   
}
*/
export const MessageType ={
    
    ItemCashing:"ItemCashing",
    Bond:"Bond",
    Payment:"Payment",
    Deposit:"Deposit",
    
}


export const OperationType ={
    
    WriteReq:"WriteReq",
    ReadReq:"ReadReq",
    WriteRes:"WriteRes",
    ReadRes:"ReadRes",
   
}

 export const ItemType ={
    
    GLDebit:"GLDebit",
    Recon:"Recon",
    Check:"Check",
    Error:"Error",
    UnKnown:"UnKnown",
}


 


export class ItemMessage implements Message {
   //Item Frame JSON content
    isn:string; //unique identifier
    au:string;
    front:string;
    back:string;
    grayfront:string;
    grayback:string;
    msgtype:string; //Initially msgtype is not known     
    itemtype:string;//derived from RTN table in angular
    operation:string;
    content:string;  //any other content related to item
    
    
    
    
    toString(): string {
        
        return 'Item Type (' + this.msgtype + '): ';
    }
}

export class ErrorMessage implements Message {
    errorCode: string;
    message: string;
    
    toString(): string {
        return 'Error (' + this.errorCode + '): ' + this.message;
    }
}

@Injectable()
export class SocketService {
    public messages: Observable<Message>;
    
    public returnMessage: Subject<any>;
    private wsURL :string;
    
    private ws: Subject<any>;
    constructor() {
          this.getScanItems()
          console.log("Calling listener");
    }


setURL() {
    let deviceId='deviceId' //Get hostname
    let userId='userId' //Get teller id
    this.wsURL="ws://localhost:8080/ItemScanner/processItem?deviceId="+deviceId +"&userId="+userId ;
    
}

//custom method
getScanItems() {
    console.log('In listener');
    this.setURL() ;
    this.ws = this.create(this.wsURL);
    
    this.ws.subscribe(
    res => {
      var resp = JSON.parse(res.data);
      
      console.log('Got ****: ');
      console.log(resp);
      console.log(resp.data);
     //Return responses shldnt have any 'data' json element in json .. only request json will have data ..return responses carry ack and key elements. 
     if(resp.data !='undefined' && resp.operation =="writeRes") 
         {
         //Get acknoweldgment
         console.log(resp.msgtype);
         console.log(resp.isn);
         console.log(resp.au);
         console.log(resp.content);
         }
    },
    function(e) { console.log('Error: ' + e.message); },
    function() { console.log('Completed'); }
    );
    
    console.log('**** WebSocket Listener ***');
    
    /*
    this.returnMessage = <Subject<any>>this.ws.
            map((response: any) => {
            console.log ('Return data');
            let data = JSON.parse(response.data);
            console.log ('Return data');
            console.log(data);
            let msg = new ItemMessage();
            
            return msg;
            
        });
    */
    
}


//custom method
private create(url:string): Subject<any> {
    let ws = new WebSocket(url);
    let observable = Observable.create(
        (obs: Observer<any>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        }
    );
    let observer = {
        next: (data: Object) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        },
    };
    return Subject.create(observer, observable).share();
    
}

    
  public sendItemMessage(msg: ItemMessage) {
        console.log ('In sendItemMessage');
        
        let frame: Frame = {
            msgtype: msg.msgtype,//Item Cashing ,Payments , Deposits,Bond
            data: {
                
                isn:msg.isn, //ISN
                au:msg.au, //AU
                front: msg.front, //front image
                back: msg.back, //back image
                grayfront: msg.grayfront, //gray scale front
                grayback: msg.grayback, //gray scale back
                itemtype:msg.itemtype, //All paper items -GLDebit, Branch settlement ,Bond,Check,ReconPlus,Unknown,Invalid
                operation:msg.operation,//writeReq,writeRes,readReq,readRes
                //content :msg.content, //any other info
                
             
            },
        }; 
        
        console.log(JSON.stringify(frame));
        console.log("Sending to Socket");
        this.ws.next(JSON.stringify(frame));
        //this.ws.next('{test:json}')
    }

}

