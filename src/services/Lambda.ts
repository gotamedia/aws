import {
    LambdaClient,
    InvokeCommand
} from "@aws-sdk/client-lambda"

import { LambdaError } from "../errors"
import { wrapClient } from "./Xray"

import type { InvokeCommandInput } from "@aws-sdk/client-lambda"

const Lambda = wrapClient(new LambdaClient({ region: process.env.AWS_REGION }))

const invoke = async (params: InvokeCommandInput) => {
    const {
        FunctionName,
        Payload,
        InvocationType = "Event",
        ...filteredParams
    } = params

    try {
        const invokeCommand = new InvokeCommand({
            FunctionName: FunctionName,
            InvocationType: InvocationType,
            Payload: Payload ? Buffer.from(JSON.stringify(Payload)) : undefined,
            ...filteredParams
        })

        const response = await Lambda.send(invokeCommand)

        return response
    } catch (error) {
        throw new LambdaError("Something went wrong while invoking Lambda function", {
            cause: error as Error
        })
    }
}

export {
    invoke,
    Lambda as client
}
