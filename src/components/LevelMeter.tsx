interface LevelMeterProps {
  title: string;
  level: number;
}

export default function LevelMeter(props: LevelMeterProps) {
  const { title, level } = props;
  const dots = Array.from(Array(10).keys());
  return (
    <div className="w-full relative">
      <div className="absolute left-2">
        {/* <div className="absolute top-1 bottom-1 -left-1 -right-1 bg-(--background) rounded-xs z-5 " /> */}
        <div className="z-10 relative">{title}</div>
      </div>
      <div className="flex gap-2 w-full ">
        {dots.map((index) => (
          <div
            key={index}
            className={`w-6 h-6 border-1 border-dashed border-primary border rounded-xs ${index + 1 <= level ? "bg-(--primary)" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
