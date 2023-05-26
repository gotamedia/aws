import * as http from "http"
import * as https from "https"

import * as XrayCore from "aws-xray-sdk-core"

import type { Client } from "@aws-sdk/types"

XrayCore.captureHTTPsGlobal(http)
XrayCore.captureHTTPsGlobal(https)
XrayCore.capturePromise()

const wrapClient = (client: Client<any, any, any>) => {
    return XrayCore.captureAWSv3Client(client)
}

export { wrapClient }
