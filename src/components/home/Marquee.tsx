const stackItems = [
  "Next.js",
  "Spring Boot",
  "TypeScript",
  "Kafka",
  "Kubernetes",
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "GCP",
];

function MarqueeGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {stackItems.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <span className="marquee-separator">/</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}
