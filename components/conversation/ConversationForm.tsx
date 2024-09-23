import React from "react";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import FileInput from "../ui/file-input";
import { IconPhotoPlus, IconSend2 } from "@tabler/icons-react";
import { Button } from "../ui/button";

type TConversationFormData = {
  messageField: string;
};

const ConversationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TConversationFormData>();

  const onSubmit = async (data: TConversationFormData) => {
    console.log(data);
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
          className="rounded-full p-0 h-12 w-12"
          title="Send Message"
        >
          <IconSend2 className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ConversationForm;
