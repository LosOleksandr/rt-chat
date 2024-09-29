const getFileUri = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  return fileUri;
};

export default getFileUri;
