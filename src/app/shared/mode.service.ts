import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private _mode = new BehaviorSubject<'drop' | 'select'>('select');

  constructor() {}

  get mode() {
    return this._mode.asObservable();
  }

  setMode(mod: 'drop' | 'select') {
    this._mode.next(mod);
  }
}
