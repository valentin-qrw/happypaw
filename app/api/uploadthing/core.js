import { auth } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  petImages: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 20,
    },
  })
    .middleware(async () => {
      const { userId } = await auth();

      if (!userId) {
        throw new Error("Користувача не авторизовано");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Завантаження успішно завершено");
      console.log("Посилання на файл:", file.ufsUrl);
      console.log("Завантажив користувач:", metadata.userId);

      return {
        uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl,
      };
    }),
};