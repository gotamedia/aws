import {
    SNSClient,
    PublishCommand
} from "@aws-sdk/client-sns"

import { SNSError } from "../errors"
import { wrapClient } from "./Xray"

import type { PublishCommandInput } from "@aws-sdk/client-sns"

const SNS = wrapClient(new SNSClient({ region: process.env.AWS_REGION }))

const publishMessage = async (params: PublishCommandInput) => {
    try {
        const publishMessageCommand = new PublishCommand(params)

        await SNS.send(publishMessageCommand)
    } catch (error) {
        throw new SNSError("Something went wrong while publishing SNS message", {
            cause: error as Error
        })
    }
}

export {
    publishMessage,
    SNS as client
}
