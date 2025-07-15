export class GblProvince {
    ProvinceId!: number;
    ProvinceCode!: string;
    ProvinceName!: string;
    GeoId?: number;
    CountryId?: number;
    CreatedBy?: number;
    CreatedOn?: Date;
    LastModifiedBy?: number;
    LastModifiedOn!: Date;
    IsActive?: boolean;
}