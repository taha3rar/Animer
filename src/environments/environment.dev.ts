// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://dev.api.agt-platform.com',
  version: '2.0.0-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'af-SA'],
  oauthClientIds: {
    facebook: '2144166195710655',
    google: '497849531719-0n3ksh04e1ackgktbifu5gvddi6rmqso.apps.googleusercontent.com'
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
