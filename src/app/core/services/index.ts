import { GenderService } from "./common/gender/gender.service";
import { LocalStorageService } from "./common/storage/local-storage.service";
import { AlertifyService } from "./common/toast/alertify.service";
import { DataService } from "./data/data.service";
import { DicomService } from "./dicom/dicom.service";
import { ImageService } from "./image/image.service";
import { OrgService } from "./settings/org.service";
import { SiteService } from "./site/site.service";
import { OrderImportService } from "./study/import/order-import.service";
import { OrderService } from "./study/order/order.service";

export const services = [
    AlertifyService,
    OrderService,
    SiteService,
    DicomService,
    DataService,
    OrgService,
    ImageService,
    GenderService,
    OrderImportService,
    LocalStorageService
]


export * from "./common/storage/local-storage.service";
export * from "./study/import/order-import.service";
export * from "./common/gender/gender.service";
export * from "./common/toast/alertify.service";
export * from "./settings/org.service";
export * from "./dicom/dicom.service";
export * from "./study/order/order.service";
export * from "./site/site.service";
export * from "./image/image.service";