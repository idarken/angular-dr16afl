import { Component } from '@angular/core';
import { CertService } from './shared/cert.service';
import { ModeService, AppMode } from './shared/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mode!: AppMode;

  constructor(private modeService: ModeService) {
    this.modeService.mode.subscribe((mode) => {
      this.mode = mode;
    });
  }
}
