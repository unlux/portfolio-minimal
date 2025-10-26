"use client";

import { useLanyard } from "@/lib/hooks/useLanyard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const STATUS_COLORS = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-neutral-500",
};

const STATUS_LABELS = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}:${String(minutes % 60).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

function SpotifyCard({
  song,
  artist,
  albumArt,
  start,
  end,
}: {
  song: string;
  artist: string;
  albumArt: string;
  start: number;
  end: number;
}) {
  const [elapsed, setElapsed] = useState(Date.now() - start);
  const duration = end - start;
  const progress = Math.min((elapsed / duration) * 100, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={albumArt}
          alt={`${song} album art`}
          width={48}
          height={48}
          className="rounded-md"
          unoptimized
        />
        <div className="absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full p-1">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {song}
        </div>
        <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
          {artist}
        </div>
        <div className="mt-2 space-y-1">
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1">
            <div
              className="bg-[#1DB954] h-1 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-500">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityCard({ activity }: { activity: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
    >
      {activity.assets?.large_image && (
        <div className="relative flex-shrink-0">
          <Image
            src={
              activity.assets.large_image.startsWith("mp:external")
                ? activity.assets.large_image.replace(
                    "mp:external/",
                    "https://media.discordapp.net/external/"
                  )
                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
            }
            alt={activity.name}
            width={48}
            height={48}
            className="rounded-md"
            unoptimized
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {activity.name}
        </div>
        {activity.details && (
          <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
            {activity.details}
          </div>
        )}
        {activity.state && (
          <div className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
            {activity.state}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LanyardRPC() {
  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;
  const { data, loading, error } = useLanyard(userId);

  if (!userId) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
        <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const status = data.discord_status;
  const spotify = data.spotify;
  const activities = data.activities.filter(
    (activity) => activity.type !== 2 // Filter out Spotify (type 2)
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div
            className={`w-3 h-3 rounded-full ${STATUS_COLORS[status]} ring-2 ring-white dark:ring-black`}
          />
          {status === "online" && (
            <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50" />
          )}
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {STATUS_LABELS[status]} on Discord
        </span>
      </div>

      {spotify && (
        <SpotifyCard
          song={spotify.song}
          artist={spotify.artist}
          albumArt={spotify.album_art_url}
          start={spotify.timestamps.start}
          end={spotify.timestamps.end}
        />
      )}

      {activities.length > 0 && !spotify && (
        <ActivityCard activity={activities[0]} />
      )}
    </div>
  );
}
