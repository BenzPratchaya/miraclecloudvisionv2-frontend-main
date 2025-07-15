import { LoginModel } from "./auth/login.model";
import { RisExamresultHistoryModel } from "./exam/ris-exam-result-history.model";
import { RisExamResultNoteHistoryModel } from "./exam/ris-exam-result-note-history.model";
import { RisExamResultModel } from "./exam/ris-exam-result.model";
import { RisExamModel } from "./exam/ris-exam.model";
import { TodayStatus } from "./exam/today-status.model";
import { OrderDocumentDownloadResModel } from "./order-document/order-document-download-res.model";
import { OrderDocumentModel } from "./order-document/order-document-model";
import { OrderDocumentTypeResModel } from "./order-document/order-document-type-res.model";
import { GblReferralModel } from "./referral/gbl-referral.model";
import { HisRegistrationModel } from "./registration/his-registration.model";
import { RisOrderDtlModel } from "./ris-order/ris-order-dtl.model";
import { RisOrderModel } from "./ris-order/ris-order.model";
import { RisModalityModel } from "./ris-order/ris.modality.model";
import { GblEnvViewModel } from "./settings/orginfos/gbl-env-view.model";

import { GeneralResModel } from "./shared/general-res.model";
import { MessageConstant } from "./shared/message.constant";
import { RouteConstant } from "./shared/route.constant";
import { SiteInformationModel } from "./site/site-information.model";
import { OrderFilterViewModel } from "./study/order-filter-view.model";
import { OrderSortingViewModel } from "./study/order-sorting-view.model";
import { ReferToHospitalRequestModel } from "./study/refer-to-hospital-request.model";
import { StudySearchQueryModel } from "./study/study-search-query.model";
import { StudyModel } from "./study/study.model";
import { TatsetupModel } from "./study/tatsetup.model";
import { HrEmpModel } from "./user-models/hr-emp.model";
import { HrJobtitleModel } from "./user-models/hr-jobtitle.model";
import { ResetPassword } from "./user-models/reset-password";
import { UserInfo } from "./user-models/user-info.model";
import { UserPreservedDataModel } from "./user-models/user-preserved-data.model";
import { UserRoleModel } from "./user-models/user-role.model";
import { User } from "./user/user.model";

export const models = [
    User,
    LoginModel,
    GeneralResModel,
    StudySearchQueryModel,
    SiteInformationModel,
    RisExamResultModel,
    HrEmpModel,
    RisExamresultHistoryModel,
    RisExamResultNoteHistoryModel,
    HisRegistrationModel,
    TodayStatus,
    UserPreservedDataModel,
    RisExamModel,
    RisModalityModel,
    TatsetupModel,
    RisOrderModel,
    RisOrderDtlModel,
    ResetPassword,
    HrJobtitleModel,
    UserInfo,
    StudyModel,
    UserRoleModel,
    OrderDocumentModel,
    GblEnvViewModel,
    MessageConstant,
    RouteConstant,
    GblReferralModel,
    ReferToHospitalRequestModel,
    OrderDocumentTypeResModel,
    OrderDocumentDownloadResModel,
    OrderFilterViewModel,
    OrderSortingViewModel,
]


export * from "./study/order-sorting-view.model";
export * from "./study/order-filter-view.model";
export * from "./order-document/order-document-download-res.model";
export * from "./order-document/order-document-type-res.model";
export * from "./study/refer-to-hospital-request.model";
export * from "./referral/gbl-referral.model";
export * from "./shared/route.constant";
export * from "./shared/message.constant";
export * from "./settings/orginfos/gbl-env-view.model";
export * from "./user-models/user-role.model";
export * from "./study/study.model";
export * from "./user-models/reset-password";
export * from "./user/user.model";
export * from "./auth/login.model";
export * from "./shared/general-res.model";
export * from "./study/study-search-query.model";
export * from "./site/site-information.model";
export * from "./exam/ris-exam-result.model";
export * from "./exam/ris-exam-result-history.model";
export * from "./exam/ris-exam-result-note-history.model";
export * from "./user-models/hr-emp.model";
export * from "./registration/his-registration.model";
export * from "./exam/today-status.model";
export * from "./user-models/user-preserved-data.model";
export * from "./exam/ris-exam.model";
export * from "./ris-order/ris.modality.model";
export * from "./study/tatsetup.model";
export * from "./ris-order/ris-order.model";
export * from "./ris-order/ris-order-dtl.model";
export * from "./user-models/hr-jobtitle.model";
export * from "./user-models/user-info.model";
export * from "./order-document/order-document-model";