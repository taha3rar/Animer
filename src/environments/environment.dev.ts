// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://dev.api.agt-platform.com',
  // new_api_url: 'http://localhost:3000',
  new_api_url: 'https://new-dev-api.agt-platform.com',
  version: '2.0.0-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'af-SA'],
  oauthClientIds: {
    facebook: '2391381727766923',
    google: '497849531719-0n3ksh04e1ackgktbifu5gvddi6rmqso.apps.googleusercontent.com'
  },
  intercom: {
    app_id: 'gtrazr5b',
    tours: {
      orders: {
        generator: {
          suppliersTour: 95289,
          productsTour: 95403,
          orderTour: 95615,
          reviewTour: 96663
        }
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
