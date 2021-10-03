import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '@core/models/movie';
import { CategoryService } from '@core/services/category.service';
import { EntriesService } from '@core/services/entries.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  public form: FormGroup;
  public sending: Boolean = false;
  public error: string | null = null;
  public user_name: string | null;
  public categories: string[];

  constructor(
    private entriesService: EntriesService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddEntryComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['',Validators.required],
      category: ['',Validators.required],
      imdb: ['',Validators.required],
      link: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.all().then(result=>{
      this.categories = result;
    },reject=>{
      
    })
  }
  
  close(){
    this.dialogRef.close();
  }

  submit(){
    let value = this.form.value;
    this.sending = true;
    this.entriesService.add(value).then(result=>{
      this.dialogRef.close(result);
    },error=>{
      this.sending = false;
      this.error = error.message;
    })
  }

}
