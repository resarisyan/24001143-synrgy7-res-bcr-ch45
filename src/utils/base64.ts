export const encodeToBase64 = async (
  file: Express.Multer.File
): Promise<string> => {
  const fileBase64 = file.buffer.toString('base64');
  const base64 = `data:${file.mimetype};base64,${fileBase64}`;
  return base64;
};
