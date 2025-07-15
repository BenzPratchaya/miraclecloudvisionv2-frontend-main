import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Study',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/study/order']
                    }
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Organization Setup',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/settings/org-list']
                    },
                    {
                        label: 'User List',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/settings/user-list']
                    },
                    {
                        label: 'Radiologist Contract',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/settings/radiologist-contract']
                    },
                    {
                        label: 'Hospital Contract',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/settings/hospital-contract']
                    },
                    {
                        label: 'Exam Info.',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/settings/exam-info']
                    },
                    {
                        label: 'Job Type Setup',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Job Type list',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/settings/job-type-list'],
                            },
                            {
                                label: 'Job Type Level',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/settings/job-type-level'],
                            },
                            {
                                label: 'Job Type Permission',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/settings/job-type-permission'],
                            }
                        ]
                    },
                    
                ]
            }
        ];
    }
}
