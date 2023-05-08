import crypto from "crypto";

export async function palindrome(object: string) {
  const loopCount = Math.floor(object.length / 2);
  let currentStatus = true;

  for (let i = 0; i < loopCount; i++) {
    if (object.charAt(i) !== object.charAt(object.length - i - 1)) {
      currentStatus = false;
    }
  }

  return currentStatus;
}

export async function randomString(length: number) {
  if (length < 1) {
    throw new Error("Number cannot less that 1");
  }
  return crypto.randomBytes(length).toString("hex");
}
