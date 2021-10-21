import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '@core/models/movie';
import { CategoryService } from '@core/services/category.service';
import { EntriesService } from '@core/services/entries.service';
import { isEnglish, isImageLink, isIMDBLink } from '@core/validators/validator';

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
  public image_updated: Boolean = false;
  public image_valid: Boolean = false;
  public image_url: string | null = null;

  constructor(
    private entriesService: EntriesService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddEntryComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['',Validators.compose([Validators.required,isEnglish(),Validators.maxLength(30)])],
      category: ['',Validators.required],
      imdb: ['',Validators.compose([Validators.required, isIMDBLink()])],
      poster: ['',Validators.compose([Validators.required, isImageLink()])]
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

  imageChange(event){
    if (this.form.value.poster != this.image_url){
      console.log('image changed',this.image_url, this.form.value.poster);
      this.image_updated = false;
      this.image_url = this.form.value.poster;
    }
  }
  imageError(event){
    this.image_valid = false;
    this.image_updated = true;
  }
  imageLoaded(event){
    this.image_valid = true;
    this.image_updated = true;
  }

  submit(){
    this.sending = true;
    this.entriesService.add(this.form.value).then(result=>{
      this.dialogRef.close(result);
    },error=>{
      this.sending = false;
      this.error = error.message;
    })
  }

}
