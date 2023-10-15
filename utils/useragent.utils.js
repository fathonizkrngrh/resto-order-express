module.exports.getUserAgent = (req, res) => {
    const userAgent = req.useragent.source; // Get the raw User-Agent string
    const browser = req.useragent.browser;
    const os = req.useragent.os;
    const platform = req.useragent.platform;

    const user = userAgent + browser + os + platform
    return user
}