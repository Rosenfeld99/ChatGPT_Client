import React, { useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { IKContext, IKUpload } from "imagekitio-react";

// Define a type for the setImg function and the image state
interface ImageState {
  isLoading: boolean;
  dbData?: any; // Adjust this type according to your actual data structure
  aiData?: {
    inlineData: {
      data: string;
      mimeType: string;
    };
  };
}

interface UploadProps {
  setImg: React.Dispatch<React.SetStateAction<ImageState>>;
}

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT as string;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY as string;

const authenticator = async () => {
  console.log("urlEndpoint :", urlEndpoint, "publicKey :", publicKey);

  try {
    const response = await fetch(`https://chatgpt-backend-ggqm.onrender.com/api/upload`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const Upload: React.FC<UploadProps> = ({ setImg }) => {
  const ikUploadRef = useRef<HTMLButtonElement | null>(null);

  const onError = (err: Error) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => { // Adjust the type according to your actual response structure
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress: number) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const file = evt.target.files?.[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      <label
        onClick={() => ikUploadRef.current?.click()}
        className="rounded-full bg-[#605e68] border-none p-2 flex items-center justify-center cursor-pointer"
      >
        <img loading='lazy' className="w-4 h-4" src="/attachment.png" alt="" />
      </label>
    </IKContext>
  );
};

export default Upload;
