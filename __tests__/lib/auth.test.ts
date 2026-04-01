import {
  generateToken,
  verifyToken,
  hashPassword,
  comparePasswords,
} from "@/lib/auth";

describe("lib/auth", () => {
  it("hashPassword and comparePasswords round-trip", async () => {
    const hash = await hashPassword("MySecretPass1!");
    expect(hash.startsWith("$2")).toBe(true);
    expect(await comparePasswords("MySecretPass1!", hash)).toBe(true);
    expect(await comparePasswords("wrong", hash)).toBe(false);
  });

  it("generateToken and verifyToken encode payload", () => {
    const token = generateToken("user-1", "u@example.com", "ADMIN");
    const payload = verifyToken(token);
    expect(payload).not.toBeNull();
    expect(payload!.id).toBe("user-1");
    expect(payload!.email).toBe("u@example.com");
    expect(payload!.role).toBe("ADMIN");
  });

  it("verifyToken returns null for invalid token", () => {
    expect(verifyToken("not.a.jwt")).toBeNull();
  });
});
