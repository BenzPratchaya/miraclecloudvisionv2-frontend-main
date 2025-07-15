// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:49488/api/",
  defaultPatientImageUrl: "../../assets/img/avatar-patient.png",
  cloudApiUrl: "/SwiftBackendAPI/api/",
  imageUrl: "http://localhost:57410/ImageUpload/",
  profileImagerUrl: "D:/Publish/PetmatrixPlus/Documents/Profile/",
  documentEnvURL: "http://localhost/Documents/",
  reportingImgEnvURL: "http://localhost:82/Documents/OrderImagePath/",
  //reportingImgEnvURL: "http://localhost:81/Documents/StudyKeyImages/",
  //reportingImgEnvURL: "/Documents/StudyKeyImages",
  selectedApiUrl: "http://localhost:49488/api/",
  isCloud: true,
  isSuperAdmin: false,
  isSiteAdmin: false,
  excelTemplatePath: "../../assets/Documents/Templates/",
  reportViewerUrl: "https://localhost:44317/",
  documentViewUrl: "http://localhost:49488/",
  appUrl: "http://localhost:4200/#/",
  refreashTimeinSec: 300000,
  studyListAutorefreashTenSec: 10000,
  OAuthUrl:
    "access.line.me/oauth2/v2.1/login?loginState=Ir5DviW235jbc55TMqTvCG&loginChannelId=1661352421&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fresponse_type%3Dcode%26client_id%3D1661352421%26redirect_uri%3Dhttps%3A%2F%2Fapp.vetportal.vet%2FLineOAuth%26state%3D12345abcde%26scope%3Dprofile%2Bopenid%2Bemail%26nonce%3D09876xyz%26bot_prompt%3Daggressive#/",
  defaultRadiologistImage: "../assets/app_images/topbar/avatar.png",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
