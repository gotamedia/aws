import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3"

import debug from "../debug"
import handleError from "../handleError"
import { wrapClient } from "./Xray"

import type {
    PutObjectCommandInput,
    DeleteObjectCommandInput
} from "@aws-sdk/client-s3"

const S3 = wrapClient(new S3Client({ region: process.env.AWS_REGION }))

const putObject = async (params: PutObjectCommandInput) => {
    const {
        Bucket,
        Key,
        Body,
        ContentType = "application/json",
        ...filteredParams
    } = params

    debug("Put S3 object, BUCKET: ", Bucket, ", KEY: ", Key, ", BODY: ", Body)

    try {
        const putObjectCommand = new PutObjectCommand({
            Bucket: Bucket,
            Key: Key,
            Body: Body,
            ContentType: ContentType,
            ...filteredParams
        })

        await S3.send(putObjectCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while putting S3 object")
    }
}

const deleteObject = async (params: DeleteObjectCommandInput) => {
    const {
        Bucket,
        Key,
        ...filteredParams
    } = params

    debug("Delete S3 object, BUCKET: ", Bucket, ", KEY: ", Key)

    try {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: Bucket,
            Key: Key,
            ...filteredParams
        })

        await S3.send(deleteObjectCommand)
    } catch (error) {
        handleError(error as Error, "Something went wrong while deleteing S3 object")
    }
}

export {
    putObject,
    deleteObject,
    S3 as client
}
