import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testsTable = sqliteTable("tests", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull()
});