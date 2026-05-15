import bcrypt from "bcryptjs";

async function run() {
  const password = "FBA_Admin_2026!";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
}

run();
