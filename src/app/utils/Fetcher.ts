import { buildProviders, makeProviders, makeSimpleProxyFetcher, makeStandardFetcher, targets } from '@movie-web/providers';

const proxyUrl = "https://simple-proxy.atifsiddiqui35.workers.dev/";
const providers = makeProviders({
    fetcher: makeStandardFetcher(fetch),
    proxiedFetcher: makeSimpleProxyFetcher(proxyUrl, fetch),
    target: targets.BROWSER,
})

// const providers = buildProviders()
//     .setTarget(targets.NATIVE)
//     .setFetcher(makeStandardFetcher(fetch)) // fetcher, every web request gets called through here
//     .addBuiltinProviders() // add all builtin providers, if this is not called, no providers will be added to the controls
//     .build();

export default providers;