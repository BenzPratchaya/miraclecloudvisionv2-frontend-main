import { GblCountry } from "./GblCountry";
import { GblDistrict } from "./GblDistrict";
import { GblProvince } from "./GblProvince";
import { GblSubdistrict } from "./GblSubdistrict";

export class GblAddress {
        constructor(){
        
        }     
    CountryList: GblCountry[] = [];       
    ProvinceList: GblProvince[] = [];       
    DistrictList: GblDistrict[] = [];       
    SubdistrictList: GblSubdistrict[] = [];       
    
}
