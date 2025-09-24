#!/usr/bin/env bash
set -euo pipefail

export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
AWS="aws --endpoint-url=http://localhost:4566"

# S3 bucket for files & PDFs
$AWS s3api create-bucket --bucket fieldops-dev-files --create-bucket-configuration LocationConstraint=us-east-1 || true

# SQS queues
$AWS sqs create-queue --queue-name fieldops-dev-events || true
$AWS sqs create-queue --queue-name fieldops-dev-deadletter || true

echo "Local AWS resources created:"
$AWS s3api list-buckets
$AWS sqs list-queues
