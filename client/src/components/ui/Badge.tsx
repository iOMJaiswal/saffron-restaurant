interface BadgeProps {
  variant: 'veg' | 'non-veg' | 'special';
  children: React.ReactNode;
}

export default function Badge({ variant, children }: BadgeProps) {
  const styles = {
    veg: 'bg-success/10 text-success border-success/20',
    'non-veg': 'bg-[#E05252]/10 text-[#E8815C] border-[#E8815C]/20',
    special: 'bg-gold/10 text-gold border-gold/20',
  };

  const dotColors = {
    veg: 'bg-success',
    'non-veg': 'bg-[#E8815C]',
    special: 'bg-gold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-body font-medium uppercase tracking-wider border ${styles[variant]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      {children}
    </span>
  );
}
