import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: MatPaginatorIntl,
      useFactory: () =>
        Object.assign(new MatPaginatorIntl(), { itemsPerPageLabel: 'Rows per page:' }),
    },
  ],
};
