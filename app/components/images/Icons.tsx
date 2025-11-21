type WifiProps = { level: number, threshold?: [number, number, number, number], offColor?: string };

export const IconWifi = ({ level = 0, threshold = [500, 200, 100, 50], offColor = 'gray' }: WifiProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M12 18l.01 0' stroke={level <= threshold[0] ? 'currentColor' : offColor} />
    <path d='M9.172 15.172a4 4 0 0 1 5.656 0' stroke={level <= threshold[1] ? 'currentColor' : offColor} />
    <path d='M6.343 12.343a8 8 0 0 1 11.314 0' stroke={level <= threshold[2] ? 'currentColor' : offColor} />
    <path d='M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0' stroke={level <= threshold[3] ? 'currentColor' : offColor} />
  </svg>
)
