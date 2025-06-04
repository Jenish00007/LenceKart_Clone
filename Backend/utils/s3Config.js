const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Function to upload file to S3
const uploadToS3 = async (file, folder = 'products') => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    return result.Location; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

module.exports = {
  s3,
  uploadToS3
}; 