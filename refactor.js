const crypto = require('crypto');

exports.deterministicPartitionKey = event => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash('sha3-512').update(data).digest('hex');
    }
  }

  if (candidate) {
    if (typeof candidate !== 'string') {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }
  return candidate;
};

function createHash(data) {
  return crypto.createHash('sha3-512').update(data).digest('hex');
}

exports.deterministicPartitionKeyV2 = event => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) return TRIVIAL_PARTITION_KEY;

  candidate = event.partitionKey || createHash(JSON.stringify(event));

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  candidate = candidate || TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};
