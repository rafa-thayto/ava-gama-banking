import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
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
    MatFormFieldModule,
    MatProgressSpinnerModule
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
        MatFormFieldModule,
        MatProgressSpinnerModule
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
        MatFormFieldModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }
