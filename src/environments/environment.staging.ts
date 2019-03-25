// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=staging` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'https://dev.api.agt-platform.com',
  chat_url: 'http://18.218.147.84:3800',
  version: '2.0.0-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'af-SA']
};
