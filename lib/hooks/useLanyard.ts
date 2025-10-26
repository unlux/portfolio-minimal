"use client";

import { useEffect, useState } from "react";

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
  spotify: SpotifyData | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
  created_at: number;
}

export interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export function useLanyard(userId: string | undefined) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError("No Discord user ID provided");
      return;
    }

    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket("wss://api.lanyard.rest/socket");

        ws.onopen = () => {
          console.log("[Lanyard] WebSocket connected");
        };

        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.op) {
            case 1: // Hello
              // Send heartbeat
              const heartbeat = setInterval(() => {
                if (ws?.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, message.d.heartbeat_interval);

              // Subscribe to user
              ws?.send(
                JSON.stringify({
                  op: 2,
                  d: {
                    subscribe_to_id: userId,
                  },
                })
              );

              return () => clearInterval(heartbeat);

            case 0: // Event
              if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
                setData(message.d);
                setLoading(false);
                setError(null);
              }
              break;
          }
        };

        ws.onerror = (error) => {
          console.error("[Lanyard] WebSocket error:", error);
          setError("Failed to connect to Lanyard");
          setLoading(false);
        };

        ws.onclose = () => {
          console.log("[Lanyard] WebSocket closed, reconnecting in 5s...");
          reconnectTimeout = setTimeout(connectWebSocket, 5000);
        };
      } catch (err) {
        console.error("[Lanyard] Connection error:", err);
        setError("Failed to connect to Lanyard");
        setLoading(false);
      }
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws) {
        ws.close();
      }
    };
  }, [userId]);

  return { data, loading, error };
}
