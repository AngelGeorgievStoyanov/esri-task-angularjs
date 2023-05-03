import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private centerArr: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public centerArr$: Observable<any[]> = this.centerArr.asObservable();

  updateCenterArr(updatedCenterArr: any[]) {
    this.centerArr.next(updatedCenterArr);
  };

};
