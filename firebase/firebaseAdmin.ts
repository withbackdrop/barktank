import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('serviceAccountKey.json');

if (!admin.apps.length) {
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export const adminSDK = admin;
