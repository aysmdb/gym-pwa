import { drizzle } from "drizzle-orm/libsql";

const db = drizzle('./db/gym.db');

export default db;