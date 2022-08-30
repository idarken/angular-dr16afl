import { Injectable } from '@angular/core';
import { TempData } from './cart.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertService {
  private _selectedItem = new BehaviorSubject<TempData | null>(null);

  constructor() {}

  get selectedItem() {
    return this._selectedItem.asObservable();
  }

  setSelectedItem(item: TempData) {
    this._selectedItem.next(item);
  }
}
