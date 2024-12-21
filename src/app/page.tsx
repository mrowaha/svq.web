"use client";
import Echo from "@/components/atoms/buttons/Echo";
import { asEchoDto } from "@/lib/frontend/dto/echo.dto";
import { useServiceStore } from "@/lib/infra/mobx/root-store.provider";

export default function Home() {
  const { echoService } = useServiceStore();
  return (
    <Echo
      onClick={async () => {
        const resp = await echoService.echo(asEchoDto({ message: "test" }));
        window.alert("backend response: " + resp.message);
      }}
    />
  );
}
