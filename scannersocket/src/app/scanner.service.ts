import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx'; // load the full rxjs
import { SocketService , ItemMessage } from './socket.service';
import {ItemType,MessageType,OperationType} from './socket.service';

import {Subject} from 'rxjs/Subject';





export interface Item {
  isn:string;
  au:string;
  front: string;
  back: string;
  grayfront: string;
  grayback: string;
  
  
}


const INTIALISE_URL='http://localhost:8080/ItemScanner/initialise'

const START_CAPTURE_URL='http://localhost:8080/ItemScanner/startCapture'

const GET_ITEM_URL='http://localhost:8080/ItemScanner/getItem'

const GET_ISN_URL='http://localhost:8080/ItemScanner/getISN'


@Injectable()
export class ScannerService {
  item:Item;
  private socket=new SocketService();
  private invokeEvent:Subject<Item> = new Subject();
  
  
 
  constructor(private _http: Http) {
      
      console.log('ScannerService');
      
      
      //call 
      //initialise()
      
      //GET ISN from channel server 
      //let isn=getISN()     
      
      //startCapture(isn)
      
   }
  
  
  initialise(){
    
    console.log('startCapture');
    this._http.get(INTIALISE_URL)
                .map(response => response.json())
                .subscribe(data => {
                        console.log("From DMS Scanner initialise");
                        console.log(data);
                        this.item = data;
                       
                    },
                        error => {
                        console.log(error)
                        }
                    );
   
    
  }
  
  
  
  getISN(){
    
    console.log('getISN');
    let isn:string;
    
    this._http.get(GET_ISN_URL)
                .map(response => response.json())
                .subscribe(data => {
                        console.log("From DMS Scanner startCapture");
                        console.log(data);
                        isn = data.isn;
                       
                    },
                        error => {
                        console.log(error)
                        }
                    );
   return isn;
    
  }
  
  startCapture(isn:string){
    
    console.log('startCapture');
    let startURL=START_CAPTURE_URL+'?isn='+isn
    
    this._http.get(startURL)
                .map(response => response.json())
                .subscribe(data => {
                        console.log("From DMS Scanner startCapture");
                        console.log(data);
                        this.item = data;
                       
                    },
                        error => {
                        console.log(error)
                        }
                    );
   
    
  }
  
  scanForItems() {
   console.log('scanForItems');
  
   this._http.get(GET_ITEM_URL)
                .map(response => response.json())
                .subscribe(data => {
                        console.log("From DMS Scanner");
                        console.log(data);
                        this.item = data;
                        this.invokeEvent.next(this.item);
                    },
                        error => {
                        console.log(error)
                        }
                    );
   
    this.invokeEvent.subscribe((item) => {
                                  
                                    console.log("Sending to Socket"+item.front.length);
                                    let msg = new ItemMessage();
                                    //Set msg type 
                                    msg.msgtype=MessageType.ItemCashing //txn
                                    //Set Item Data 
                                    msg.isn=item.isn; //unique identifier
                                    msg.au=item.au;
                                    msg.front=item.front;
                                    msg.back=item.back;
                                    msg.grayfront=item.grayfront;
                                    msg.grayback=item.grayback;
                                    msg.itemtype=ItemType.GLDebit //item type Derived based on RTN table
                                    msg.operation=OperationType.WriteReq;//operation
                                    
                                    //console.log(msg);
                                    
                                  
                                    this.socket.sendItemMessage(msg);
                                
                               
                               }
                       )
                      
               
  }
}
