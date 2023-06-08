export type AWS_ERROR_OPTIONS = {
    cause: Error,
}

class AWSError extends Error {
    constructor(message: string, options?: AWS_ERROR_OPTIONS) {
        super(message, options)
        this.name = this.constructor.name
    }
}

class LambdaError extends AWSError {}
class S3Error extends AWSError {}
class SNSError extends AWSError {}
class SQSError extends AWSError {}
class SSMError extends AWSError {}

export {
    AWSError,
    LambdaError,
    S3Error,
    SNSError,
    SQSError,
    SSMError,
}
