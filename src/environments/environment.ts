export const environment = {
  production: false,
  api_url: 'https://dev.api.agt-platform.com',
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
