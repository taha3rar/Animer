// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=staging` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  api_url: 'https://prod.api.agt-platform.com',
  version: '2.0.0-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'af-SA'],
  oauthClientIds: {
    facebook: '2144166195710655',
    google: '497849531719-0n3ksh04e1ackgktbifu5gvddi6rmqso.apps.googleusercontent.com'
  },
  intercom: {
    app_id: 'zjpiv02o',
    tours: {
      orders: {
        generator: {
          suppliersTour: 100043,
          productsTour: 100045,
          orderTour: 100046,
          reviewTour: 100048
        }
      }
    }
  }
};
