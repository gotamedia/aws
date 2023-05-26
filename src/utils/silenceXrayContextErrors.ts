import * as XrayCore from "aws-xray-sdk-core"

// Ignore "context missing" logs
const silenceXrayContextErrors = () => {
    XrayCore.setContextMissingStrategy("IGNORE_ERROR")

    XrayCore.setLogger({
        ...XrayCore.getLogger(),
        error: () => {}
    })
}

export default silenceXrayContextErrors