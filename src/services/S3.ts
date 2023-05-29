import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3"

import debug from "../debug"
import handleError from "../handleError"
import { wrapClient } from "./Xray"

import type {
    GetObjectCommandInput,
    PutObjectCommandInput,
    DeleteObjectCommandInput
} from "@aws-sdk/client-s3"

const S3 = wrapClient(new S3Client({ region: process.env.AWS_REGION }))

const getObject = async (params: GetObjectCommandInput) => {
    const {
        Bucket,
        Key,
        ...filteredParams
    } = params

    debug("Get S3 object, BUCKET: ", Bucket, ", KEY: ", Key)

    try {
        const getObjectCommand = new GetObjectCommand({
            Bucket: Bucket,
            Key: Key,
            ...filteredParams
        })

        const response =  await S3.send(getObjectCommand)

        return response
    } catch (error) {
        handleError(error as Error, "Something went wrong while getting S3 object")
    }
}

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
    getObject,
    putObject,
    deleteObject,
    S3 as client
}
