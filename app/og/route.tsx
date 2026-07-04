import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Lux's Portfolio";

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full justify-between p-20"
        style={{
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, #1c2536 0%, #0a0a0a 55%)",
        }}
      >
        <div tw="flex items-center">
          <div tw="w-3 h-3 rounded-full bg-sky-400 mr-3" />
          <span tw="text-2xl text-sky-300">unlux.dev</span>
        </div>

        <h1
          tw="text-7xl font-bold text-neutral-100"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          {title}
        </h1>

        <div tw="flex items-center justify-between w-full">
          <span tw="text-2xl text-neutral-400">Lakshay Choudhary</span>
          <span tw="text-2xl text-neutral-500">
            full-stack developer
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
