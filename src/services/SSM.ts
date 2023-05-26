import {
    SSMClient,
    GetParameterCommand,
    PutParameterCommand
} from "@aws-sdk/client-ssm"

import debug from "../debug"
import handleError from "../handleError"
import { wrapClient } from "./Xray"

import type {
    GetParameterCommandInput,
    PutParameterCommandInput
} from "@aws-sdk/client-ssm"

const SSM = wrapClient(new SSMClient({ region: process.env.AWS_REGION }))

const getParameter = async (params: GetParameterCommandInput) => {
    const {
        Name,
        ...filteredParams
    } = params

    debug("Get SSM patameter with name: ", Name)

    try {
        const getParameterCommand = new GetParameterCommand({
            Name: Name,
            ...filteredParams
        })

        const { Parameter } = await SSM.send(getParameterCommand)

        if (!Parameter?.Value) {
            debug("Got invalid SSM patameter: ", Parameter)

            handleError(new Error("Failed to retrieve parameters from SSM, got empty value"))

            return null
        }
        
        return Parameter.Value
    } catch (error) {
        handleError(error as Error, "Something went wrong while retrieving parameters from SSM")

        return null
    }
}

const putParameter = async (params: PutParameterCommandInput) => {
    const {
        Name,
        Value,
        Type = "String",
        Overwrite = true,
        ...filteredParams
    } = params

    debug("Put SSM patameter with name: ", Name, ", value: ", Value, ", type: ", Type)

    try {
        const putParameterCommand = new PutParameterCommand({
            Name: Name,
            Value: Value,
            Type: Type,
            Overwrite: Overwrite,
            ...filteredParams
        })

        await SSM.send(putParameterCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while storing parameter value in SSM")
    }
}

export {
    getParameter,
    putParameter,
    SSM as client
}
