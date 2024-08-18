/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // Modify the rule to exclude SVG files from file-loader
    fileLoaderRule.exclude = /\.svg$/;

    // Add a new rule to handle SVGs with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true, // Optionally, you can pass additional options here
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
