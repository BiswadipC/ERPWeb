import { Routes } from '@angular/router';
import { Authentication } from './Components/authentication/authentication';
import { Dashboard } from './Components/dashboard/dashboard';
import { Parent } from './Components/parent/parent';
import { Unit } from './Components/Units/unit/unit';
import { AddEditUnits } from './Components/Units/add-edit-units/add-edit-units';
import { ViewAttribute } from './Components/Attribute/view-attribute/view-attribute';
import { AddEditAttribute } from './Components/Attribute/add-edit-attribute/add-edit-attribute';
import { ViewWh } from './Components/Warehouse/view-wh/view-wh';
import { AddEditWh } from './Components/Warehouse/add-edit-wh/add-edit-wh';
import { ViewItems } from './Components/Item/view-items/view-items';
import { AddEditItems } from './Components/Item/add-edit-items/add-edit-items';
import { ViewParty } from './Components/Party/view-party/view-party';
import { AddEditParty } from './Components/Party/add-edit-party/add-edit-party';
import { ViewPo } from './Components/PurchaseOrder/view-po/view-po';
import { AddEditPo } from './Components/PurchaseOrder/add-edit-po/add-edit-po';

export const routes: Routes = [
  {
    path: '', component: Authentication
  },
  {
    path: '', component: Parent, children: [
      {path: 'dashboard', component: Dashboard},
      {path: 'units', component: Unit},
      {path: 'add-edit-unit/:id', component: AddEditUnits},
      {path: 'attributes', component: ViewAttribute},
      {path: 'add-edit-attr/:id', component: AddEditAttribute},
      {path: 'warehouse', component: ViewWh},
      {path: 'add-edit-wh/:id', component: AddEditWh},
      {path: 'items', component: ViewItems},
      {path: 'add-edit-item/:id', component: AddEditItems},
      {path: 'party', component: ViewParty},
      {path: 'add-edit-party/:id', component: AddEditParty},
      {path: 'purchase-order', component: ViewPo},
      {path: 'add-edit-po/:id', component: AddEditPo}
    ]
  }
];
