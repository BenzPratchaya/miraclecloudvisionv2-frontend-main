import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  { path: 'order', component: OrderComponent,canActivate:[AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule { }
