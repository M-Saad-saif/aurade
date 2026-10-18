import mongoose from 'mongoose';

// Reuse one connection across hot reloads (dev) and warm serverless invocations (Vercel).
const cache = (globalThis._mongooseCache ||= { conn: null, promise: null });

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false }).catch((error) => {
      cache.promise = null; // allow a retry on the next request
      throw error;
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
