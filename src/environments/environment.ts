export const environment = {
  production: false,
  /** Base URL for HTTP APIs (no trailing slash) */
  apiBaseUrl: 'http://localhost:8080',
  /** Relative to apiBaseUrl — POST multipart: `file`, optional `parentTenderId`; query: `type`, optional `parentTenderId` for quotes */
  documentsUploadPath: 'api/v1/documents',
};
