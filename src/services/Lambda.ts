import {
    LambdaClient,
    InvokeCommand
} from "@aws-sdk/client-lambda"

import debug from "../debug"
import handleError from "../handleError"
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

    debug("Invoke Lambda with function name: ", FunctionName, ", type: ", InvocationType, ", payload: ", Payload)

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
        handleError(error as Error, "Something went wrong while invoking Lambda function")
    }
}

export {
    invoke,
    Lambda as client
}
