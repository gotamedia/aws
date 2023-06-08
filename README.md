# Gota Media AWS

A light-weight wrapper around some of AWS JS-SDK v3 AWS.

## Usage
```sh
npm install @gotamedia/aws
```

```ts
import { invoke } from "@gotamedia/aws/services/Lambda"

const handler = () => {
    invoke(...)
}
```

## Services
Available services:
* Lambda
* S3
* SNS
* SQS
* SSM
* Xray

## Utils
Available utils:
* silenceXrayContextErrors

> **_NOTE:_**  All services exports thier own client: `import { client as LambdaClient } from "@gotamedia/aws/services/Lambda"`

### Lambda
A light-weight wrapper arround `@aws-sdk/clients-lambda` wrapped with Xray traces

#### Available methods:

##### invoke()
| param  | type                         | default   | required | description                          |
|--------|------------------------------|-----------|----------|--------------------------------------|
| first  | InvokeCommandInput           | undefined |     x    | AWS Lambda InvokeCommandInput params |

**Example:**
```ts
import { invoke } from "@gotamedia/aws/services/Lambda"
import type { InvokeCommandInput } from "@aws-sdk/client-lambda"

const handler = async () => {
    const invokeCommandInput: InvokeCommandInput = {
        FunctionName: "my-awesome-function",
        InvocationType: "Event"
    }

    const response = await invoke(invokeCommandInput)
}
```

### S3
A light-weight wrapper arround `@aws-sdk/clients-s3` wrapped with Xray traces

#### Available methods:

##### getObject()
| param  | type                            | default   | required | description                         |
|--------|---------------------------------|-----------|----------|-------------------------------------|
| first  | GetObjectCommandInput           | undefined |     x    | AWS S3 GetObjectCommandInput params |

**Example:**
```ts
import { getObject } from "@gotamedia/aws/services/S3"
import type { GetObjectCommandInput } from "@aws-sdk/client-s3"

const handler = async () => {
    const getObjectCommandInput: GetObjectCommandInput = {
        Bucket: "my-awesome-bucket",
        Key: "my-awesome-key"
    }

    const response = await getObject(getObjectCommandInput)
}
```

### S3
A light-weight wrapper arround `@aws-sdk/clients-s3` wrapped with Xray traces

#### Available methods:

##### putObject()
| param  | type                            | default   | required | description                         |
|--------|---------------------------------|-----------|----------|-------------------------------------|
| first  | PutObjectCommandInput           | undefined |     x    | AWS S3 PutObjectCommandInput params |

**Example:**
```ts
import { putObject } from "@gotamedia/aws/services/S3"
import type { PutObjectCommandInput } from "@aws-sdk/client-s3"

const handler = async () => {
    const putObjectCommandInput: PutObjectCommandInput = {
        Bucket: "my-awesome-bucket",
        Key: "my-awesome-key",
        Body: JSON.stringify({
            id: "123-321",
            awesome: true,
            ContentType: "application/json"
        })
    }

    const response = await putObject(putObjectCommandInput)
}
```

### S3
A light-weight wrapper arround `@aws-sdk/clients-s3` wrapped with Xray traces

#### Available methods:

##### deleteObject()
| param  | type                               | default   | required | description                            |
|--------|------------------------------------|-----------|----------|----------------------------------------|
| first  | DeleteObjectCommandInput           | undefined |     x    | AWS S3 DeleteObjectCommandInput params |

**Example:**
```ts
import { deleteObject } from "@gotamedia/aws/services/S3"
import type { DeleteObjectCommandInput } from "@aws-sdk/client-s3"

const handler = async () => {
    const deleteObjectCommandInput: DeleteObjectCommandInput = {
        Bucket: "my-awesome-bucket",
        Key: "my-awesome-key"
    }

    const response = await deleteObject(deleteObjectCommandInput)
}
```

### SNS
A light-weight wrapper arround `@aws-sdk/clients-sns` wrapped with Xray traces

#### Available methods:

##### publishMessage()
| param  | type                | default   | required | description                        |
|--------|---------------------|-----------|----------|------------------------------------|
| first  | PublishCommandInput | undefined |     x    | AWS SNS PublishCommandInput params |

**Example:**
```ts
import { publishMessage } from "@gotamedia/aws/services/SNS"
import type { PublishCommandInput } from "@aws-sdk/client-sns"

const handler = async () => {
    const publishMessageCommandInput: PublishCommandInput = {
        TopicArn: "my-awesome-topic",
        Message: "Hello from @gotamedia/aws package!"
    }

    await publishMessage(publishMessageCommandInput)
}
```

### SQS
A light-weight wrapper arround `@aws-sdk/clients-sqs` wrapped with Xray traces

#### Available methods:

##### sendMessage()
| param  | type                    | default   | required | description                            |
|--------|-------------------------|-----------|----------|----------------------------------------|
| first  | SendMessageCommandInput | undefined |     x    | AWS SQS SendMessageCommandInput params |

**Example:**
```ts
import { sendMessage } from "@gotamedia/aws/services/SQS"
import type { SendMessageCommandInput } from "@aws-sdk/client-sqs"

const handler = async () => {
    const sendMessageCommandInput: SendMessageCommandInput = {
        QueueUrl: "my-awesome-queue",
        MessageBody: "Hello from @gotamedia/aws package!"
    }

    await sendMessage(sendMessageCommandInput)
}
```

##### sendMessageBatch()
| param  | type                         | default   | required | description                                 |
|--------|------------------------------|-----------|----------|---------------------------------------------|
| first  | SendMessageBatchCommandInput | undefined |     x    | AWS SQS SendMessageBatchCommandInput params |

**Example:**
```ts
import { sendMessageBatch } from "@gotamedia/aws/services/SQS"
import type { SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"

const handler = async () => {
    const sendMessageBatchCommandInput: SendMessageBatchCommandInput = {
        QueueUrl: "my-awesome-queue",
        Entries: [
            {
                Id: "123-321",
                MessageBody: "1: Hello from @gotamedia/aws package!"
            },
            {
                Id: "321-123",
                MessageBody: "2: Hello from @gotamedia/aws package!"
            }
        ]
    }

    await sendMessageBatch(sendMessageBatchCommandInput)
}
```

### SSM
A light-weight wrapper arround `@aws-sdk/clients-ssm` wrapped with Xray traces

#### Available methods:

##### getParameter()
| param | type                     | default   | required | description                             |
|-------|--------------------------|-----------|----------|-----------------------------------------|
| first | GetParameterCommandInput | undefined |     x    | AWS SSM GetParameterCommandInput params |

**Example:**
```ts
import { getParameter } from "@gotamedia/aws/services/SSM"
import type { GetParameterCommandInput } from "@aws-sdk/client-ssm"

const handler = async () => {
    const getParameterCommandInput: GetParameterCommandInput = {
        Name: "my-awesome-parameter"
    }

    const parameterValue = await getParameter(getParameterCommandInput)
}
```

##### putParameter()
| param  | type                | default   | required | description                             |
|--------|---------------------|-----------|----------|-----------------------------------------|
| first  | PutParameterCommand | undefined |     x    | AWS SSM PutParameterCommand params      |

**Example:**
```ts
import { putParameter } from "@gotamedia/aws/services/SSM"
import type { PutParameterCommand } from "@aws-sdk/client-ssm"

const handler = async () => {
    const putParameterCommandInput: PutParameterCommand = {
        Name: "my-awesome-parameter",
        Value: "my-awesome-value",
        Type: "String"
    }

    await putParameter(putParameterCommandInput)
}
```

### Xray
A helper service to help you wrapping `AWS-SDK V3 Clients` with Xray

#### Available methods:

##### wrapClient()
| param | type       | default   | required | description       |
|-------|------------|-----------|----------|-------------------|
| first | AWS Client | undefined | x        | AWS SDK V3 Client |

**Example:**
```ts
import { DynamodbClient } from "@aws-sdk/clients-dynamodb"
import { wrapClient } from "@gotamedia/aws/services/Xray"

const Dynamodb = wrapClient(new DynamodbClient({ region: "eu-north-1" }))

const handler = async () => {
    // Use DynamoDB sdk commands...
}
```

#### Available utils:

##### silenceXrayContextErrors
A helper util to silence Xray "Missing AWS Lambda trace data for Xray @Object.contextMissingLogError"

**Example:**
```ts
import "@gotamedia/aws/utils/silenceXrayContextErrors"

const handler = async () => {
    ...
}
```

## Contributing

### Trunk based development
This project uses a [trunk based development](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development) workflow.

> **_NOTE:_**  `master` is the trunk branch

### Conventional commits

This project works with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Contribute
* Pull latest from develop.
* Branch out a new branch.
* Commit and push your awesome code.
* Open a pull request so we can approve your awesome code.

## Publish
Any time you push to origin master branch, a pipeline will be automatically triggered and it will build the package for you.
The pipeline will bump the version for you automatically and tag the package.

> **_NOTE:_**  NO MANUAL TAGGING

Then it will generate and update the CHANGELOG depends on your pushed commits.

## License

MIT