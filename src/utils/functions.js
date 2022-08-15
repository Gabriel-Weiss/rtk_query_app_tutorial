
export const handlePriceLevel = (level) => {
  switch (level) {
    case 1:
      return 'low';
    case 2:
      return 'medium';
    case 3:
      return 'high';
    default:
      return 'no level';
  }
}