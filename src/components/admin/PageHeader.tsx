interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#C8102E]">
        {title}
      </h1>

      {subtitle && (
        <p className="text-black mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}