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
        MatMenuModule,
        MatStepperModule,
        MatFormFieldModule
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
        MatMenuModule,
        MatStepperModule,
        MatFormFieldModule
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
        MatMenuModule,
        MatStepperModule,
        MatFormFieldModule
    ]
})
export class MaterialModule { }