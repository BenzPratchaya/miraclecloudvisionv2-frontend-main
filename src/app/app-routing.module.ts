import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    //{ path: '', redirectTo: '/auth/login', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'study', data: { breadcrumb: 'Study' }, loadChildren: () => import('./modules/study/study.module').then(m => m.StudyModule) },
            { path: 'settings', data: { breadcrumb: 'Settings' }, loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
        ]
    },
    { path: 'imagerefer', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: '/imagerefer/login' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
