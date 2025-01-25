import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LanyardRPC() {
  const { data, error } = useSWR(
    "https://lanyard.cnrad.dev/api/268798547439255572",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { listening_to_spotify, discord_user } = data.data;

  return (
    <div className="flex items-center space-x-4">
      <img
        src={
          discord_user.avatar
            ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`
            : "/default-avatar.png"
        }
        alt={discord_user.username}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold">{discord_user.username}</p>
        {listening_to_spotify ? (
          <p className="text-xs text-gray-500">
            Listening to {listening_to_spotify.song_name} by{" "}
            {listening_to_spotify.artist}
          </p>
        ) : (
          <p className="text-xs text-gray-500">Not listening to Spotify</p>
        )}
      </div>
    </div>
  );
}
