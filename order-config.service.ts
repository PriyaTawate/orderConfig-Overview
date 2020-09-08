import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class OrderConfigService{
    orderChanged = new EventEmitter<number>();
    id: number;

    constructor(public _httpC:HttpClient) {}

    changeId(id: number) {
        this.id = id;
        this.orderChanged.emit(this.id);
    }
    getId() {
        return this.id;
    }

    getAllAddFeatures(): Observable<any> {
        return this._httpC.get("http://localhost:3000/osadditionalfeatures");
      }
}