import {
    SQSClient,
    SendMessageCommand,
    SendMessageBatchCommand
} from "@aws-sdk/client-sqs"

import debug from "../debug"
import handleError from "../handleError"
import { wrapClient } from "./Xray"

import type {
    SendMessageCommandInput,
    SendMessageBatchCommandInput
} from "@aws-sdk/client-sqs"

const SQS = wrapClient(new SQSClient({ region: process.env.AWS_REGION }))

const sendMessage = async (params: SendMessageCommandInput) => {
    debug("Send SQS message with queue: ", params.QueueUrl, ", message: ", params.MessageBody)

    try {
        const sendMessageCommand = new SendMessageCommand(params)

        await SQS.send(sendMessageCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while sending SQS message")
    }
}

const sendMessageBatch = async (params: SendMessageBatchCommandInput) => {
    debug("Send SQS message batch with queue: ", params.QueueUrl, ", entries: ", params.Entries)

    try {
        const sendMessageBatchCommand = new SendMessageBatchCommand(params)

        await SQS.send(sendMessageBatchCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while sending SQS message batch")
    }
}

export {
    sendMessage,
    sendMessageBatch,
    SQS as client
}
