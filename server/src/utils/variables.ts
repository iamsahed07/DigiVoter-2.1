const { env } = process as { env: { [key: string]: string } };
export const {
  MONGO_URI,
  SIGN_IN_URL,
  JWT_SECRET, // generated from require('crypto').randomBytes(36).toString('hex')
  APP_USER,
  APP_PASS,
  CLOUD_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
} = env;
