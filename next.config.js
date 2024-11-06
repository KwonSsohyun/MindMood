// next.config.js
import withTM from 'next-transpile-modules';

const nextConfig = {
    reactStrictMode: true,
    env: {
        API_PATH: "https://www.mindmood.co.kr"
    },
    pageExtensions: ["js","jsx","ts","tsx"],
    trailingSlash: false,
    poweredByHeader: false,
    outputFileTracing: true,
    experimental: {
        esmExternals: 'loose' // CommonJS와 ES 모듈 호환성 옵션 설정
    },
};

export default withTM(['@nivo/core', 'd3-interpolate'])(nextConfig);