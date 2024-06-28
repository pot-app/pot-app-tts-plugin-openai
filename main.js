async function tts(text, _lang, options = {}) {
    const { config, utils } = options;
    const { http } = utils;
    const { fetch, Body } = http;

    let { requestPath, apiKey, model, voice, speed } = config;

    if (!requestPath) {
        requestPath = "https://api.openai.com";
    }
    if (!/https?:\/\/.+/.test(requestPath)) {
        requestPath = `https://${requestPath}`;
    }
    if (requestPath.endsWith('/')) {
        requestPath = requestPath.slice(0, -1);
    }
    if (!requestPath.endsWith('/audio/speech')) {
        requestPath += '/v1/audio/speech';
    }
    if (!apiKey) {
        throw "apiKey is required";
    }
    if (!model) {
        model = "tts-1";
    }
    if (!voice) {
        voice = "alloy";
    }
    if (!speed) {
        speed = 1.0;
    }
    console.log(speed);
    const res = await fetch(requestPath, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: Body.json({
            model,
            voice,
            speed: parseFloat(speed),
            input: text,
        })
        , responseType: 3
    });

    if (res.ok) {
        let result = res.data;
        if (result) {
            return result;
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}