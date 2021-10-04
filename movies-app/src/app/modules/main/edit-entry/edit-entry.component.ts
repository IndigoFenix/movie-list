import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '@core/models/Movie';
import { EntriesService } from '@core/services/entries.service';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent implements OnInit {

  public form: FormGroup;
  public sending: Boolean = false;
  public error: string | null = null;
  public entry: Movie;

  constructor(
    private entriesService: EntriesService,
    private dialogRef: MatDialogRef<EditEntryComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:{'entry':Movie}
  ) {
    this.entry = data.entry;
    console.log('Movie data',this.entry);
    this.form = this.fb.group({
      imdb: [this.entry.imdb,Validators.required],
      poster: [this.entry.poster,Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  close(){
    this.dialogRef.close();
  }

  submit(){
    let value = this.form.value;
    this.sending = true;
    this.entriesService.update(this.entry._id,value).then(result=>{
      this.dialogRef.close(result);
    },error=>{
      this.sending = false;
      this.error = error.message;
    })
  }

}
