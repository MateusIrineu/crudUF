import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front';
};
