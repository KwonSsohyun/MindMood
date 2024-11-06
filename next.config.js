export default {
    reactStrictMode: true,
    env: {
        API_PATH: "https://www.mindmood.co.kr"
    },
    pageExtensions: ["js","jsx","ts","tsx"],
    trailingSlash: false,
    poweredByHeader: false,
    outputFileTracing: true,
    experimental: {
        transpilePackages: ["@nivo/core", "d3-interpolate"],
    }
}