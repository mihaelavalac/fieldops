# infra/dev/local-aws-init.sh
#!/usr/bin/env bash
set -euo pipefail

export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

AWS="aws --endpoint-url=http://localhost:4566"

BUCKET="fieldops-dev-files"

# Create S3 bucket (omit LocationConstraint in us-east-1)
if [ "${AWS_DEFAULT_REGION}" = "us-east-1" ]; then
  ${AWS} s3api create-bucket --bucket "${BUCKET}" || true
else
  ${AWS} s3api create-bucket --bucket "${BUCKET}" \
    --create-bucket-configuration LocationConstraint="${AWS_DEFAULT_REGION}" || true
fi

# SQS queues
${AWS} sqs create-queue --queue-name fieldops-dev-events || true
${AWS} sqs create-queue --queue-name fieldops-dev-deadletter || true

echo "Local AWS resources created:"
${AWS} s3api list-buckets
${AWS} sqs list-queues
