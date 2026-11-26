export function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  return "";
}

export function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}