import { ObjectId } from 'bson'
import S3 from 'aws-sdk/clients/s3'
import { InputMessageSchema } from  '@/constants/schema'

const s3 = new S3({ 
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4'
});

export const getSignedUrl = async (input: InputMessageSchema) => {
  const type = input.file.split(';')[0].split('/')[1];
  let imageName  = `${new ObjectId()}.${type}`
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Expires: 60,
    ContentType: `image/${type}`,
  }
  const signedUrl  = await s3.getSignedUrl('putObject', s3Params)
  const base64Data = Buffer.from(input.file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  fetch(signedUrl, { method: 'PUT', body: base64Data });
  const s3Paramss = {
    Bucket: 'chatdata',
    Key: imageName,
    Expires: 3600
  }
  const uploadedUrl = await s3.getSignedUrlPromise('getObject', s3Paramss)
  return uploadedUrl
}