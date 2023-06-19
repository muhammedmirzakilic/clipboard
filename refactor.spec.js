const { deterministicPartitionKey, deterministicPartitionKeyV2 } = require('./refactor');

describe('deterministicPartitionKeyV2', () => {
  it.each([
    [undefined, '0'],
    [{ partitionKey: 'test' }],
    [{ partitionKey: 123 }],
    [{ partitionKey: { test: 'test' } }],
    [{ partitionKey: [1, 2, 3] }],
    [{ partitionKey: true }],
    [{ partitionKey: false }],
    [{ partitionKey: null }],
    [{ partitionKey: undefined }],
    [{ test: 'test' }],
  ])('should return the same value as deterministicPartitionKey', event => {
    const result = deterministicPartitionKey(event);
    const result2 = deterministicPartitionKeyV2(event);
    expect(result).toEqual(result2);
  });

  it('should return 0 when partitionKey is empty arrow function', () => {
    const event = { partitionKey: () => {} };
    const result = deterministicPartitionKeyV2(event);
    expect(result).toEqual('0');
  });
});
