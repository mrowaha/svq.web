"use client";
import Echo from "@/components/atoms/buttons/Echo";
import { UnSupportedMimeType } from "@/lib/frontend/domain/service/datasource-service/datasource.service.errors";
import { asEchoDto } from "@/lib/frontend/dto/echo.dto";
import { useServiceStore } from "@/lib/infra/mobx/root-store.provider";
import { ChangeEvent } from "react";

export default function Home() {
  const { echoService, datasourceService } = useServiceStore();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    try {
      await datasourceService.uploadFile("test-datasource", file);
    } catch (err) {
      if (err instanceof UnSupportedMimeType) {
        window.alert("unsupported file type");
      }
    }
  };

  return (
    <>
      {/* <Echo
        onClick={async () => {
          const resp = await echoService.echo(asEchoDto({ message: "test" }));
          window.alert("backend response: " + resp.message);
        }}
      /> */}

      <label htmlFor="upload">Upload File: </label>
      <input id="upload" type="file" onChange={(e) => handleFileUpload(e)} />
    </>
  );
}
