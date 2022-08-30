import { Component, OnInit } from '@angular/core';
import { TempData } from '../shared/cart.model';
import { CertService } from '../shared/cert.service';
import { ModeService } from '../shared/mode.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit {
  mode: 'drop' | 'select' = 'select';
  list: TempData[] = [
    {
      commonName: '1',
      issuerName: '2',
      validFrom: new Date(),
      validTill: new Date(),
    },
    {
      commonName: '3',
      issuerName: '4',
      validFrom: new Date(),
      validTill: new Date(),
    },
    {
      commonName: '5',
      issuerName: '6',
      validFrom: new Date(),
      validTill: new Date(),
    },
  ];
  selectedItem!: TempData;

  constructor(
    private certService: CertService,
    private modeService: ModeService
  ) {}

  ngOnInit() {
    this.certService.setSelectedItem(this.list[0]);
    this.selectedItem = this.list[0];
    this.modeService.mode.subscribe((mode) => {
      this.mode = mode;
    });
  }

  itemId(index: number, item: any) {
    return item;
  }

  selectItem(item: TempData) {
    this.certService.setSelectedItem(item);
    this.selectedItem = item;
  }

  onAddNew() {
    this.modeService.setMode('drop');
  }

  onCancel() {
    this.modeService.setMode('select');
  }

  isActive(item: TempData) {
    return item === this.selectedItem;
  }
}
