import { AWS_SERVICES_CONFIG } from "./configure"

function debug(...args: any[]) {
    if (AWS_SERVICES_CONFIG.debug) {
        console.log("AWS Services:")
        console.log("\t", ...args)
    }
}

export default debug
