import * as XrayCore from "aws-xray-sdk-core"

// Ignore "context missing" logs
XrayCore.setContextMissingStrategy("IGNORE_ERROR")

XrayCore.setLogger({
    ...XrayCore.getLogger(),
    error: () => {}
})