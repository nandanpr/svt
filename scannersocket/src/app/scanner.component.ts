
import { Component } from '@angular/core';
import { ScannerService } from './scanner.service';


@Component({
    selector: 'scanner',
    template: `
        <header>
            <div class="logo">Initialising Scanner</div>
        </header>
    `,
    providers: [ScannerService]
})

export class Scanner { 
    
    constructor(private scannerService: ScannerService) { 
        
        console.log('In scanner component constructor')
        this.scannerService.scanForItems()
    }
    
    
}