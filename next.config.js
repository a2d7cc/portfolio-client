/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,

	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:4200/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `http://localhost:4200/uploads/:path*`,
			},
		]
	},

	webpack(config, options) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			resourceQuery: /inline/, // only use svgr to load svg if path ends with *.svg?svgr
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: { removeViewBox: false },
									},
								},
							],
						},
						titleProp: true,
						icon: true,
					},
				},
			],
		})

		config.module.rules.push({
			test: /\.svg$/i,
			loader: 'next-image-loader',
			issuer: { not: /\.(css|scss|sass)$/ },
			dependency: { not: ['url'] },
			resourceQuery: { not: [/inline/] }, // Ignore this rule if the path ends with *.svg?svgr
			options: { basePath: '', assetPrefix: '' },
		})

		return config
	},
}

module.exports = nextConfig