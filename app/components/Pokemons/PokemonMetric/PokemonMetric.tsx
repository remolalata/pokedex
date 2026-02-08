interface PokemonMetricProps {
  label: string;
  value: number;
  maxValue: number;
  barColorClass: string;
  valueClassName?: string;
}

export const PokemonMetric = ({
  label,
  value,
  maxValue,
  barColorClass,
  valueClassName = 'text-[16px] font-bold mt-2',
}: PokemonMetricProps) => {
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const progressWidth = Math.min(Math.max((value / safeMaxValue) * 100, 0), 100);

  return (
    <div>
      <h2 className='font-medium text-xl'>{label}</h2>
      <p className={valueClassName}>{value}</p>
      <div className='mt-2 h-3 w-full rounded-full bg-gray-200 overflow-hidden'>
        <div
          aria-label={`${label} progress`}
          className={`h-full rounded-full ${barColorClass}`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};
