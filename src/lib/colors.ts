const gredientColors = [
  "from-blue-500 from-20% to-blue-200",
  "from-emerald-500 from-20% to-yellow-200",
  "from-orange-500 from-20% to-orange-200",
  "from-purple-500 from-20% to-purple-200",
  "from-red-500 from-20% to-red-200",
];

const bgColors = [
  "bg-blue-400",
  "bg-emerald-400",
  "bg-orange-400",
  "bg-purple-400",
  "bg-red-400",
];

export function getGredientColor(colorSeed: number): string {
  return gredientColors[colorSeed % gredientColors.length]!;
}

export function getBgColor(colorSeed: number): string {
  return bgColors[colorSeed % bgColors.length]!;
}
