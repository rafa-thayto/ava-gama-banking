import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatInputModule, 
        MatCardModule, 
        MatButtonModule, 
        MatSidenavModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatTableModule, 
        MatDatepickerModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule    
    } from "@angular/material";

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatDatepickerModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatDatepickerModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule
    ]
})
export class MaterialModule { }
