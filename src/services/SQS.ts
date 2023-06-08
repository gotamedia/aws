import {
    SQSClient,
    SendMessageCommand,
    SendMessageBatchCommand
} from "@aws-sdk/client-sqs"

import { SQSError } from "../errors"
import { wrapClient } from "./Xray"

import type {
    SendMessageCommandInput,
    SendMessageBatchCommandInput
} from "@aws-sdk/client-sqs"

const SQS = wrapClient(new SQSClient({ region: process.env.AWS_REGION }))

const sendMessage = async (params: SendMessageCommandInput) => {
    try {
        const sendMessageCommand = new SendMessageCommand(params)

        await SQS.send(sendMessageCommand)
    } catch (error) {
        throw new SQSError("Something went wrong while sending SQS message", {
            cause: error as Error
        })
    }
}

const sendMessageBatch = async (params: SendMessageBatchCommandInput) => {
    try {
        const sendMessageBatchCommand = new SendMessageBatchCommand(params)

        await SQS.send(sendMessageBatchCommand)
    } catch (error) {
        throw new SQSError("Something went wrong while sending SQS message batch", {
            cause: error as Error
        })
    }
}

export {
    sendMessage,
    sendMessageBatch,
    SQS as client
}
