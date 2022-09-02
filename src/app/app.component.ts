import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModeService, AppMode } from './shared/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mode!: AppMode;

  constructor(
    private modeService: ModeService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.modeService.mode.subscribe((mode) => {
      this.mode = mode;
      this.ref.detectChanges();
    });
  }
}
