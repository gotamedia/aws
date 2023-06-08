import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3"

import { S3Error } from "../errors"
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

    try {
        const getObjectCommand = new GetObjectCommand({
            Bucket: Bucket,
            Key: Key,
            ...filteredParams
        })

        const response =  await S3.send(getObjectCommand)

        return response
    } catch (error) {
        throw new S3Error("Something went wrong while getting S3 object", {
            cause: error as Error
        })
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
        throw new S3Error("Something went wrong while putting S3 object", {
            cause: error as Error
        })
    }
}

const deleteObject = async (params: DeleteObjectCommandInput) => {
    const {
        Bucket,
        Key,
        ...filteredParams
    } = params

    try {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: Bucket,
            Key: Key,
            ...filteredParams
        })

        await S3.send(deleteObjectCommand)
    } catch (error) {
        throw new S3Error("Something went wrong while deleteing S3 object", {
            cause: error as Error
        })
    }
}

export {
    getObject,
    putObject,
    deleteObject,
    S3 as client
}
