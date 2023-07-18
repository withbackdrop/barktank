import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'media.giphy.com'],
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default withSentryConfig(nextConfig, SentryWebpackPluginOptions);
