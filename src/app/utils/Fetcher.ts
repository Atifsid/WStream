import { makeProviders, makeSimpleProxyFetcher, makeStandardFetcher, targets } from '@movie-web/providers';

const proxyUrl = "https://simple-proxy.atifsiddiqui35.workers.dev/";
const providers = makeProviders({
    fetcher: makeStandardFetcher(fetch),
    proxiedFetcher: makeSimpleProxyFetcher(proxyUrl, fetch),
    target: targets.BROWSER,
})

export default providers;