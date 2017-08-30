import { Component } from '@angular/core';

import { SocketService } from './socket.service';



import { ScannerService } from './scanner.service';

@Component({
    selector: 'app',
    template: `
        <div class="wrapper">
            <scanner></scanner>
           
        </div>
    `,
    providers: [SocketService,ScannerService],
})

export class AppComponent {}
