import {
    SSMClient,
    GetParameterCommand,
    PutParameterCommand
} from "@aws-sdk/client-ssm"

import { SSMError } from "../errors"
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

    try {
        const getParameterCommand = new GetParameterCommand({
            Name: Name,
            ...filteredParams
        })

        const { Parameter } = await SSM.send(getParameterCommand)

        if (!Parameter?.Value) {
            throw new SSMError("Failed to retrieve parameters from SSM, got empty value")
        }

        return Parameter.Value
    } catch (error) {
        throw new SSMError("Something went wrong while retrieving parameters from SSM", {
            cause: error as Error
        })
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
        throw new SSMError("Something went wrong while storing parameter value in SSM", {
            cause: error as Error
        })
    }
}

export {
    getParameter,
    putParameter,
    SSM as client
}
