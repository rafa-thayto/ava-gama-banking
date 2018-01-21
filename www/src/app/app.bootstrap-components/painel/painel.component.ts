import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {
    
    @Input() titulo: string;

    ngOnInit() {
        this.titulo = this.titulo.length > 7 ?
             this.titulo.substr(0, 7) + '...' : 
             this.titulo;
    }
    
}