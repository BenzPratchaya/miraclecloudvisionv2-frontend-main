export class GblPostalCode {
  PostalCodeId!: number;
  PostalCode!: string;
  PlaceName!: string;
  PlaceNameEng!: string;
  CountryId!: number;
  DistrictId!: number;
  SubDistrictId!: number;
  State!: string;
  City!: string;
  Latitude?: number;
  Longitude?: number;
  GeoId!: number;
  IsActive!: boolean;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy!: number;
  LastModifiedOn?: Date;
  PalceNameAndPostalCode!: string;
}
