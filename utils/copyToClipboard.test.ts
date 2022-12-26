import { copyToClipboard } from './copyToClipboard';

describe('copyToClipboard', () => {
  it('should copy text to clipboard when navigator.clipboard is available', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    (navigator as any).clipboard = {
      writeText: mockWriteText,
    };
    await copyToClipboard('test');
    expect(mockWriteText).toHaveBeenCalledWith('test');
  });
});
