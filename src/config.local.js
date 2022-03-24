module.exports = {
  PORT: 8049,
  APP_SHUTDOWN_DELAY_MS: 1500,
  DB_SHUTDOWN_WAIT_MS: 0,
  SENTRY_DSN: undefined,
  APM_ENABLED: false,
  TOKEN_SECRET: 'token',
  MONGO_CONNECTION_STRING: 'mongodb://localhost:27017/contributorStatsTest?retryWrites=true',
  // MONGO_CONNECTION_STRING:
  //   'mongodb+srv://contributor-stats:cWxbrYPUt6nrOxnv@internal-tools-integrat.cu56h.mongodb.net/contributorStats',
  //MONGO_DATABASE_NAME: 'contributorStats',
  MONGO_DATABASE_NAME: 'ContributorStatsTest',
  LOG_LEVEL: 'DEBUG',
  GOOGLE_ID: '1094916450426-k1l2ghdf1v61950equnpsn25bj4qn68m.apps.googleusercontent.com',
  GOOGLE_SECRET: 'cJdZ4_GfJP4R67ohbArBfm-a',
  COOKIE_SECRET: 'c20eb14e-d2ad-482c-9062-bed32136eefa',
  CLIENT_URL: 'http://localhost:3000',
  SERVICE_URL: 'http://localhost:8049',
  DOMAIN: 'localhost',

  DATADOG_ENABLED: false,
  DATADOG_ANALYTICS_ENABLED: false,
};
