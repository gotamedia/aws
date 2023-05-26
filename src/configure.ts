export type AWS_SERVICES_CONFIG_Type = {
    debug?: boolean,
    throwErrors?: boolean,
    outputErrors?: boolean
}

let AWS_SERVICES_CONFIG: AWS_SERVICES_CONFIG_Type = {
    debug: false,
    throwErrors: false,
    outputErrors: true
}

const configure = (config: AWS_SERVICES_CONFIG_Type) => {
    AWS_SERVICES_CONFIG = {
        ...AWS_SERVICES_CONFIG,
        ...config
    }
}

export {
    AWS_SERVICES_CONFIG,
    configure as default
}
