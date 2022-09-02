import { Component, OnInit } from '@angular/core';
import { ModeService, AppMode } from './shared/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mode!: AppMode;

  constructor(private modeService: ModeService) {}

  ngOnInit() {
    this.modeService.mode.subscribe((mode) => {
      console.log(mode);
      this.mode = mode;
    });
  }
}
