import { NgModule } from '@angular/core';
import { NamedPortalOutlet } from './portal-outlet.directive';

@NgModule({
  declarations: [NamedPortalOutlet],
  exports: [NamedPortalOutlet],
})
export class MultiPortalsModule {}
