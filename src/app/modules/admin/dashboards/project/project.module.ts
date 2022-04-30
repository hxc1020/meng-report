import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {TranslocoModule} from '@ngneat/transloco';
import {NgApexchartsModule} from 'ng-apexcharts';
import {SharedModule} from 'app/shared/shared.module';
import {ProjectComponent} from 'app/modules/admin/dashboards/project/project.component';
import {projectRoutes} from 'app/modules/admin/dashboards/project/project.routing';
import {FuseCardModule} from '../../../../../@fuse/components/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchCardComponent } from './search-card/search-card.component';
import { VerticalChartComponent } from './vertical-chart/vertical-chart.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { MonthDashboardComponent } from './month-dashboard/month-dashboard.component';
import { StackedChartComponent } from './stacked-chart/stacked-chart.component';
import {MatRadioModule} from '@angular/material/radio';
import {FuseScrollbarModule} from '../../../../../@fuse/directives/scrollbar';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    ProjectComponent,
    SearchCardComponent,
    VerticalChartComponent,
    MainDashboardComponent,
    RadarChartComponent,
    MonthDashboardComponent,
    StackedChartComponent
  ],
  imports: [
    RouterModule.forChild(projectRoutes),
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    NgApexchartsModule,
    TranslocoModule,
    SharedModule,
    FuseCardModule,
    MatCheckboxModule,
    MatRadioModule,
    FuseScrollbarModule,
    MatChipsModule
  ]
})
export class ProjectModule {
}
