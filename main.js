async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch } = utils;
    let { requestPath } = config;
    if (requestPath === undefined || requestPath.length === 0) {
        requestPath = "lingva.pot-app.com"
    }
    if (!requestPath.startsWith('http')) {
        requestPath = 'https://' + requestPath;
    }
    const res = await tauriFetch(`${requestPath}/api/v1/audio/${lang}/${encodeURIComponent(text)}`);

    if (res.ok) {
        let result = res.data;
        if (result['audio']) {
            return result['audio'];
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}