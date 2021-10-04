import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const icons = [
      'add',
      'x',
      'check',
      'hamburger'
    ]
    for (let i=0;i<icons.length;i++){
      let n = icons[i];
      iconRegistry.addSvgIcon(n,sanitizer.bypassSecurityTrustResourceUrl('assets/icons/'+n+'.svg'));
    }
  }
}
