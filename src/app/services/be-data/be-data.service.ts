import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RepairShop} from "../../models/repair-shop.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseFilter} from "../../models/filters/base-filter";
import {Job} from "../../models/job.model";
import {User} from "../../models/user.model";
import {Car} from "../../models/car.model";
import {Manufacturer} from "../../models/manufacturer.model";
import {Vehicle} from "../../models/vehicle.model";
import {Mechanic} from "../../models/mechanic.model";
import {Specialization} from "../../models/enums/specialization.model";

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

  countUsers$(filter: BaseFilter): Observable<number> {
    return this.http.get<number>('api/user/count', {params: this.filterToQueryParams(filter)});
  }

  loadUser$(id: number): Observable<User> {
    return this.http.get<User>('/api/user/load', {params: {id:id}})
  }

  saveUser$(user: User): Observable<User> {
    return this.http.put<User>('/api/user/update', user);
  }

  listCars$(filter: BaseFilter): Observable<Car[]> {
    return this.http.get<Car[]>('api/car/list', {params: this.filterToQueryParams(filter)});
  }

  countCars$(filter: BaseFilter): Observable<number> {
    return this.http.get<number>('api/cars/count', {params: this.filterToQueryParams(filter)});
  }

  saveCar$(car: Car): Observable<Car> {
    return this.http.put<Car>('/api/car/update', car);
  }

  listManufacturers$(filter: BaseFilter):Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>('/api/manufacturer/list', {params: this.filterToQueryParams(filter)});
  }

  saveVehicle$(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>('/api/vehicle/update', vehicle);
  }

  listVehiclesByUserId$(userId: number, filter: BaseFilter): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('/api/vehicle/listByUserId',
      {params: {...this.filterToQueryParams(filter), userId: userId}});
  }

  listMechanics$(baseFilter: BaseFilter): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>('api/mechanic/list', {params: this.filterToQueryParams(baseFilter)});
  }

  saveMechanic$(mechanic: Mechanic): Observable<Mechanic> {
    return this.http.put<Mechanic>('api/mechanic/update', mechanic);
  }

  listJobs$(baseFilter: BaseFilter): Observable<Job[]> {
    return this.http.get<Job[]>('api/job/list', {params: this.filterToQueryParams(baseFilter)});
  }

  saveJob$(job: Job): Observable<Job> {
    return this.http.put<Job>('api/job/update', job);
  }

  listMechanicsByRepairShopId$(repairShopId: number, baseFilter: BaseFilter): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>('api/mechanic/listByRepairShop',
      {params: {...this.filterToQueryParams(baseFilter), repairShopId: repairShopId}});
  }

  listByRepairShopIdAndSpecialization$(repairShopId: number, specialization: Specialization, baseFilter: BaseFilter): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>('api/mechanic/listByRepairShopAndSpecialization',
      {params: {...this.filterToQueryParams(baseFilter), repairShopId: repairShopId, specialization: specialization}});
  }

  listRepairShopByManufacturerId$(manufacturerId: number, baseFilter: BaseFilter): Observable<RepairShop[]> {
    return this.http.get<RepairShop[]>('api/repairShop/listByManufacturerId',
      {params: {...this.filterToQueryParams(baseFilter), manufacturerId: manufacturerId}});
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
