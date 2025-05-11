import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';

dotenv.config()

console.log('AWS_DATABASE_REGION', process.env.AWS_DATABASE_REGION);

export const db = new DynamoDBClient({
    region: process.env.AWS_DATABASE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
