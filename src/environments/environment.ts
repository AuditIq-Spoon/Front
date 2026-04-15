/**
 * Non-production builds (`ng serve`, `ng build --configuration development`).
 * URLs come from `environment.defaults.ts`, generated from `frontend/.env` by
 * `scripts/generate-environment.mjs` (run on `npm install`, `npm start`, and `npm run build`).
 * Production builds replace this file entirely with `environment.production.ts`.
 */
import { devEnvironment } from './environment.defaults';

export const environment = {
  production: false,
  apiBaseUrl: devEnvironment.apiBaseUrl,
  wsBaseUrl: devEnvironment.wsBaseUrl,
};
