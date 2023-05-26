import {
    SNSClient,
    PublishCommand
} from "@aws-sdk/client-sns"

import debug from "../debug"
import handleError from "../handleError"
import { wrapClient } from "./Xray"

import type { PublishCommandInput } from "@aws-sdk/client-sns"

const SNS = wrapClient(new SNSClient({ region: process.env.AWS_REGION }))

const publishMessage = async (params: PublishCommandInput) => {
    debug("Publish SNS message with topic: ", params.TopicArn, ", message: ", params.Message)

    try {
        const publishMessageCommand = new PublishCommand(params)

        await SNS.send(publishMessageCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while publishing SNS message")
    }
}

export {
    publishMessage,
    SNS as client
}
