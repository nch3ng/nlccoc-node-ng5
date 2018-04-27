import { TimeagoPipe } from './../../pipes/timeago.pipe';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import {
  AsideLeftMinimizeDefaultEnabledComponent
} from '../pages/aside-left-minimize-default-enabled/aside-left-minimize-default-enabled.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DefaultComponent } from '../pages/default/default.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../_directives/unwrap-tag.directive';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    LayoutComponent,
    AsideLeftMinimizeDefaultEnabledComponent,
    HeaderNavComponent,
    DefaultComponent,
    AsideNavComponent,
    FooterComponent,
    QuickSidebarComponent,
    ScrollTopComponent,
    TooltipsComponent,
    HrefPreventDefaultDirective,
    UnwrapTagDirective,
    TimeagoPipe
  ],
  exports: [
    LayoutComponent,
    AsideLeftMinimizeDefaultEnabledComponent,
    HeaderNavComponent,
    DefaultComponent,
    AsideNavComponent,
    FooterComponent,
    QuickSidebarComponent,
    ScrollTopComponent,
    TooltipsComponent,
    HrefPreventDefaultDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MomentModule
  ]
})
export class LayoutModule {
}
