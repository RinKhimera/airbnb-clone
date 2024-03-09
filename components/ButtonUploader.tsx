"use client"

import { UploadButton } from "@/utils/uploadthing"

export const ButtonUploader = () => {
  return (
    <UploadButton
      className="ut-button:bg-transparent ut-button:text-muted-foreground ut-button:border ut-button:w-full ut-button:justify-start ut-button:pl-3 ut-button:text-sm ut-button:ut-uploading:text-white ut-button:ut-uploading:bg-blue-200 -mb-7 items-start"
      content={{
        // button({ ready }) {
        //   if (ready) return <div>Upload stuff</div>

        //   return "Getting ready..."
        // },
        allowedContent({ ready, fileTypes, isUploading }) {
          // if (!ready) return "Checking what you allow"
          // if (isUploading) return "Seems like stuff is uploading"
          // return `Stuff you can upload: ${fileTypes.join(", ")}`
          return ""
        },
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res)
        alert("Upload Completed")
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
