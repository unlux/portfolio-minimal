export function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <h1 className="mb-8 text-4xl font-semibold tracking-tighter">
      {words.map((word, i) => (
        <span
          key={i}
          className="hero-word"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
