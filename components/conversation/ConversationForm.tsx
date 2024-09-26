import React, { ChangeEvent, useState } from "react";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import FileInput from "../ui/file-input";
import { IconPhotoPlus, IconSend2 } from "@tabler/icons-react";
import { Button } from "../ui/button";
import instance from "@/lib/instance";
import useConversations from "@/hooks/useConversations";

type TConversationFormData = {
  image: string;
  messageField: string;
};

const ConversationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TConversationFormData>();

  const [preview, setPreview] = useState<string>();
  console.log("preview: ", preview);
  const { conversationId } = useConversations();

  const handleUploadedFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      const fileBuffer = await file.arrayBuffer();

      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

      setValue("image", fileUri);
      setPreview(urlImage);
    }
  };

  const onSubmit = async (data: TConversationFormData) => {
    try {
      instance
        .post("/api/messages/create", {
          conversationId,
          message: data.messageField,
          image: data.image,
        })
        .then(({ data }) => console.log(data))
        .finally(() => {
          reset();
        });
    } catch (error) {}
  };

  return (
    <div className="border-t border-border p-4">
      <form
        className="grid grid-cols-[minmax(0,_1fr)_40px] max-w-xl mx-auto gap-2 items-end"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <FileInput
            //@ts-expect-error temp undefined type problem
            size={"md"}
            variant={"fixed_bottom_left"}
            {...register("image", {
              onChange: handleUploadedFile,
            })}
            asChild
          >
            <IconPhotoPlus className="w-full h-full" />
          </FileInput>
          <Input
            as="textarea"
            type="text"
            variant={"input"}
            placeholder="Type a message here..."
            errors={errors}
            {...register("messageField")}
            className="py-3 pl-9 rounded-xl"
            maxLength={450}
          />
        </div>

        <Button
          type="submit"
          className={`rounded-full p-0 h-12 w-12 opacity-100 translate-x-0 transition-all}`}
          title="Send Message"
        >
          <IconSend2 className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ConversationForm;
