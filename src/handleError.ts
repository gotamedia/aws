import { logError } from "@gotamedia/utils"

import { AWS_SERVICES_CONFIG } from "./configure"

const handleError = (error: Error, info?: any) => {
    if (AWS_SERVICES_CONFIG.outputErrors) {
        logError(error, info)
    }

    if (AWS_SERVICES_CONFIG.throwErrors) {
        throw error
    }
}

export default handleError
