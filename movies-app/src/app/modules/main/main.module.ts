import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ReportComponent } from './report/report.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEntryComponent } from './edit-entry/edit-entry.component';


@NgModule({
  declarations: [
    ReportComponent,
    AddEntryComponent,
    EditEntryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class MainModule { }
