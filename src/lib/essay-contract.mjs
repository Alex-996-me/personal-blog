// Shared by the Astro schema and the filename-aware publication validator.
export function essayPublicationErrors(data) {
  if (data.status === "archive" || data.status === "draft") return [];
  const errors = [];
  if (data.status !== "published") errors.push(["status", 'must explicitly be "published"']);
  for (const field of ["title", "category", "description"]) {
    if (typeof data[field] !== "string" || !data[field].trim()) errors.push([field, "missing or empty"]);
  }
  if (typeof data.category === "string" && data.category.trim().length > 24) errors.push(["category", "must be at most 24 characters"]);
  const validDate = (value) => (value instanceof Date || (typeof value === "string" && value.trim()))
    && !Number.isNaN(new Date(value).valueOf());
  for (const field of ["date", "updated"]) {
    if (!validDate(data[field])) errors.push([field, "missing or invalid date"]);
  }
  if (validDate(data.date) && validDate(data.updated) && new Date(data.updated) < new Date(data.date)) {
    errors.push(["updated", "must be on or after date"]);
  }
  return errors;
}
