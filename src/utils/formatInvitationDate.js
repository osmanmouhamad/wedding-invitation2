function getValidDate(dateValue) {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatInvitationDate(dateValue, timeZone) {
  const date = getValidDate(dateValue);

  if (!date) {
    return "يُحدد لاحقًا";
  }

  return new Intl.DateTimeFormat("ar-LB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function formatInvitationTime(dateValue, timeZone) {
  const date = getValidDate(dateValue);

  if (!date) {
    return "يُحدد لاحقًا";
  }

  return new Intl.DateTimeFormat("ar-LB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}
