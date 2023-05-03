import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

const apiURL = environment.apiURL;


@Injectable()


export class ArcgisService {
    constructor(private http: HttpClient) { }


    findSuggestAdress(adress: string) {

        return this.http.get(`${apiURL}/suggest?f=json&text=${adress}`, { withCredentials: false });

    };



    findAddress(adress: string) {

        return this.http.get(`${apiURL}/findAddressCandidates?SingleLine=${adress}&f=json`, { withCredentials: false });
    };

}