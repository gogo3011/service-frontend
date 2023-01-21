import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RepairShop} from "../../models/repair-shop.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseFilter} from "../../models/filters/base-filter";
import {Job} from "../../models/job.model";
import {User} from "../../models/user.model";

interface RequestParams {
  [id: string]: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class BeDataService {

  constructor(private readonly http: HttpClient) { }

  listRepairShops$(filter: BaseFilter): Observable<RepairShop[]> {
    return this.http.get<RepairShop[]>('/api/repairShop/list', {params: this.filterToQueryParams(filter)});
  }

  saveRepairShop$(repairShop: RepairShop): Observable<RepairShop> {
    return this.http.put<RepairShop>('/api/repairShop/update', repairShop);
  }

  loadRepairShop$(id: number): Observable<RepairShop> {
    return this.http.get<RepairShop>('/api/repairShop/load', {params: {id:id}})
  }

  listJobsByRepairShop$(repairShopId: number, filter: BaseFilter): Observable<Job[]> {
    const params = this.filterToQueryParams(filter);
    params['repairShopId'] = repairShopId;
    return this.http.get<Job[]>('/api/job/listByRepairShop', {params})
  }

  listUsers$(filter: BaseFilter): Observable<User[]> {
    return this.http.get<User[]>('api/user/list', {params: this.filterToQueryParams(filter)});
  }

  private filterToQueryParams(filter: BaseFilter): RequestParams {
    const queryParams: RequestParams = {};
    if (filter.pageSize) {
      queryParams['pageSize'] =  filter.pageSize;
    }
    if (filter.pageNo) {
      queryParams['pageNo'] = filter.pageNo;
    }
    if (filter.sortBy) {
      queryParams['sortBy'] = filter.sortBy;
    }
    return queryParams;
  }
}
