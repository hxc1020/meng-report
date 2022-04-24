import {Route} from '@angular/router';
import {LayoutComponent} from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/dashboards/project'
  {path: '', pathMatch: 'full', redirectTo: 'dashboards/project'},

  {
    path: '',
    component: LayoutComponent,
    children: [

      // Dashboards
      {
        path: 'dashboards', children: [
          {
            path: 'project',
            loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)
          }
        ]
      }
    ]
  }
];
