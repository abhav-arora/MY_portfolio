import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
export function seal(value, secret, lifetime = 3600) {
  if (!secret || secret.length < 32)
    throw new Error("Session secret is not configured.");
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    createHash("sha256").update(secret).digest(),
    iv,
  );
  const body = Buffer.concat([
    cipher.update(
      JSON.stringify({ ...value, exp: Date.now() + lifetime * 1000 }),
      "utf8",
    ),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}
export function unseal(value, secret) {
  try {
    if (!secret || secret.length < 32 || !value) return null;
    const data = Buffer.from(value, "base64url");
    const decipher = createDecipheriv(
      "aes-256-gcm",
      createHash("sha256").update(secret).digest(),
      data.subarray(0, 12),
    );
    decipher.setAuthTag(data.subarray(12, 28));
    const obj = JSON.parse(
      Buffer.concat([
        decipher.update(data.subarray(28)),
        decipher.final(),
      ]).toString(),
    );
    return obj.exp > Date.now() ? obj : null;
  } catch {
    return null;
  }
}
export function cookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((c) => c.trim().split(/=(.*)/s).slice(0, 2))
      .filter((p) => p.length === 2),
  );
}
export function cookie(name, value, age = 3600) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
}
