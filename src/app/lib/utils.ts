import { Plane, Gift, FileText, Trophy, Clock } from "lucide-react";
import { TimeLeft } from "../types";



export const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
};

export const calculateProgress = (createdAt: string, targetDate: string) => {
  const start = new Date(createdAt).getTime();
  const end = new Date(targetDate).getTime();
  const now = new Date().getTime();

  if (now >= end) return 100;
  if (now <= start) return 0;
  return ((now - start) / (end - start)) * 100;
};

export const getThemeConfig = (type: string) => {
  const config = {
    flight: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      bar: "bg-blue-500",
      Icon: Plane,
    },
    birthday: {
      bg: "bg-orange-500/10",
      text: "text-orange-500",
      bar: "bg-orange-500",
      Icon: Gift,
    },
    work: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      bar: "bg-emerald-500",
      Icon: FileText,
    },
    sports: {
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      bar: "bg-slate-500",
      Icon: Trophy,
    },
    default: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      bar: "bg-indigo-500",
      Icon: Clock,
    },
  };
  return config[type as keyof typeof config] || config.default;
};
