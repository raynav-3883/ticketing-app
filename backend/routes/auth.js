// backend/routes/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = []; // demo only
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function signupHandler(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, name: name || email.split("@")[0], password: hashed };
  users.push(user);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  // Option A: return token in JSON (frontend stores it)
  return res.json({ user: { id: user.id, email: user.email, name: user.name }, token });

  // Option B (more secure): set httpOnly cookie instead:
  // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7*24*60*60*1000 });
  // return res.json({ user: { id: user.id, email: user.email, name: user.name } });
}

export async function loginHandler(req, res) {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  // Option A: return token in JSON
  return res.json({ user: { id: user.id, email: user.email, name: user.name }, token });

  // Option B: set httpOnly cookie:
  // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7*24*60*60*1000 });
  // return res.json({ user: { id: user.id, email: user.email, name: user.name } });
}