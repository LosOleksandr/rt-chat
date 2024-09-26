import cloudinary from "./cloudinary";

type TUploadToCloudinaryParams = {
  filePath: string;
  folder: string;
  senderId: string;
};

const uploadToCloudinary = async ({
  filePath,
  folder,
  senderId,
}: TUploadToCloudinaryParams) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      invalidate: true,
      resource_type: "auto",
      public_id: `sender_${senderId}_file_${Date.now()}`,
      folder,
      use_filename: true,
      transformation: [
        {
          width: 1000,
          crop: "limit",
          quality: "auto:good",
          fetch_format: "auto",
          dpr: "auto",
        },
        {
          flags: "strip_profile",
        },
      ],
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed: ", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export default uploadToCloudinary;
