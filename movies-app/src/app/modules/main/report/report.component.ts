import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from '@core/models/movie';
import { User } from '@core/models/User';
import { AuthService } from '@core/services/auth.service';
import { EntriesService } from '@core/services/entries.service';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import { EditEntryComponent } from '../edit-entry/edit-entry.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

  public loaded: Boolean = false;
  public entries: Array<Movie> = [];
  public error: string;
  public user: User;
  public searchForm: FormGroup;
  public is_admin: Boolean = false;
  public categories = [];
  public category: string | null = null;
  public sidebar_open: Boolean = false;

  public authorized: Boolean = false;

  public full_search: Boolean = false;

  constructor(
    private authService:AuthService,
    private entriesService:EntriesService,
    private router: Router,
    private dialog:MatDialog,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user){
      this.authorized = true;
      this.is_admin = this.user.admin;
      this.getInitialData();
    } else {
      this.authorized = false;
      this.loaded = true;
      //this.router.navigate(['/auth/login']);
    }
  }

  getInitialData(){
    this.getEntries({}).then(result=>{
      this.entries = result;
      this.setCategories();
      this.loaded = true;
    }).catch(err=>{
      this.authorized = false;
      this.loaded = true;
      //this.router.navigate(['/auth/login']);
    });
  }

  setCategories(){
    this.categories = [];
    for (let i=0;i<this.entries.length;i++){
      console.log(this.entries[i].category);
      if (this.categories.indexOf(this.entries[i].category) === -1){
        this.categories.push(this.entries[i].category);
      }
    }
  }

  openCategory(category:string | null){
    this.category = category;
    this.sidebar_open = false;
    this.search();
  }

  search(){
    this.getEntries({}).then(result=>{
      this.entries = result;
      this.setCategories();
    });
  }

  //Gets movies
  //It is possible to put a query for a particular category here, for example { 'category':'Action' }.
  //But this is not necessary for the demo.
  getEntries(query:any):Promise<Array<Movie>>{
    return new Promise((resolve,reject)=>{
      this.entriesService.all(query).then(entries=>{
        resolve(entries);
      },error=>{
        this.error = error.message;
        reject(error.message);
      })
    })
  }

  openNewEntryDialog(): void {
    this.sidebar_open = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
    };
    const dialogRef = this.dialog.open(AddEntryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.search();
      }
    });
  }

  deleteEntry(movie:Movie){
    this.entriesService.delete(movie._id).then(result => {
      this.search();
    })
  }

  sanitizeImageUrl(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}