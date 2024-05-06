import crypto from 'crypto';

const createHash = (stringToHash) => {
  return crypto.createHash('sha256').update(stringToHash).digest('hex');
};

export { createHash };
