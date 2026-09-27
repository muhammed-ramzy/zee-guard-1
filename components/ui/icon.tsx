import {
  BadgeCheck,
  Wind,
  ShieldCheck,
  LockKeyhole,
  BriefcaseMedical,
  Brush,
  Palette,
  MessagesSquare,
  CalendarCheck,
  Smile,
  Cog,
  Truck,
  LucideIcon,
  LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Wind,
  ShieldCheck,
  LockKeyhole,
  BriefcaseMedical,
  Brush,
  Palette,
  MessagesSquare,
  CalendarCheck,
  Smile,
  Cog,
  Truck,
};

interface IconProps extends LucideProps {
  name: string;
}

/**
 * Renders a lucide-react icon by name so icon choices can live in
 * plain data (constants) instead of JSX.
 */
export function Icon({ name, ...props }: IconProps) {
  const Component = ICON_MAP[name] ?? BadgeCheck;
  return <Component {...props} />;
}
