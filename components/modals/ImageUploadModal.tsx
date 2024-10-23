"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
import Heading from "../ui/heading";
import FileInput from "../ui/file-input";
import { TConversationFormData } from "../conversation/ConversationForm";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import useTextarea from "@/hooks/useTextarea";

const Modal = dynamic(() => import("@/components/modals/Modal"), {
  ssr: false,
});

type TImageUploadModal = {
  onClose: () => void;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};

const ImageUploadModal = ({ onClose, formRef }: TImageUploadModal) => {
  const {
    register,
    getValues,
    setValue,
    resetField,
    watch,
    formState: { isSubmitting },
  } = useFormContext<TConversationFormData>();
  const { textareaRef, handleAutoSize } = useTextarea(formRef);

  const { ref, ...rest } = register("caption");

  const captionValue = watch("caption");

  useEffect(() => {
    console.log(textareaRef);
    if (textareaRef.current) {
      console.log(textareaRef.current);
    }
  }, [textareaRef, captionValue, handleAutoSize]);

  useEffect(() => {
    const message = getValues("message");

    if (message) {
      setValue("caption", message);
      resetField("message");
    }

    return () => {
      const caption = getValues("caption");

      setValue("message", caption);
      resetField("caption");
    };
  }, [getValues, setValue, resetField]);

  const imagePreviews = useMemo(() => {
    const imageFiles = getValues("image") || [];
    return Array.from(imageFiles).map((image) => URL.createObjectURL(image));
  }, [getValues]);

  const [imagePreviewState, setImagePreviewState] = useState(imagePreviews);

  const handleModalClose = useCallback(() => {
    setValue("image", null);
    onClose();
  }, [onClose, setValue]);

  const handleAddImageFiles = useCallback(
    (imageFile?: File) => {
      if (!imageFile) return;

      const currentFiles = watch("image") || [];
      const isDuplicate = currentFiles.some(
        (file) =>
          file.name === imageFile.name &&
          file.lastModified === imageFile.lastModified
      );

      if (!isDuplicate) {
        const updatedFiles = [...currentFiles, imageFile];
        setValue("image", updatedFiles);

        const newImagePreviews = updatedFiles.map((image) =>
          URL.createObjectURL(image)
        );
        setImagePreviewState(newImagePreviews);
      }
    },
    [setValue, watch]
  );

  return (
    <Modal onClose={handleModalClose}>
      <div className="max-w-lg mx-auto">
        <div className="flex p-2 justify-between items-center border-b border-border bg-background">
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleModalClose}
            >
              <IconX />
            </Button>
            <Heading as="h2" size="xl">
              Send Photo
            </Heading>
          </div>
          <FileInput onChange={(e) => handleAddImageFiles(e.target.files?.[0])}>
            <IconCirclePlus />
          </FileInput>
        </div>
        <ul
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory bg-background p-2 ${
            imagePreviewState.length > 2 ? "" : "xs:justify-center"
          }`}
        >
          {imagePreviewState.map((image) => (
            <li
              key={image}
              className="relative group w-full xs:w-[calc(50%-8px)] h-96 snap-center flex-shrink-0"
            >
              <Image src={image} alt="Preview" fill className="object-cover" />
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-[minmax(0,_1fr)_100px] items-end gap-2 p-2 border-t border-border bg-background">
          <Textarea
            {...rest}
            ref={(e) => {
              ref(e);
              textareaRef.current = e;
            }}
            placeholder="Add a caption..."
            variant="ghost"
          />
          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
