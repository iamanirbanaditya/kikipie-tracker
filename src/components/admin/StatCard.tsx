interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "#C8102E",
}: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 border-l-4"
      style={{
        borderColor: color,
      }}
    >
      <h3 className="text-black mb-2">
        {title}
      </h3>

      <p
        className="text-3xl font-bold"
        style={{
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}