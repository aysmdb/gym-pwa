import { type InferSelectModel, sql } from "drizzle-orm";
import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const testsTable = sqliteTable("tests", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull()
});

export const membersTable = sqliteTable("members", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    phone: text("phone").notNull().unique(),
    address: text("address").notNull(),
    photo: text("photo"),
    joinDate: text("join_date").notNull(),
    expDate: text("exp_date").notNull(),
    status: int("status").notNull().default(1),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    createdBy: int("created_by").notNull(),
    updatedBy: int("updated_by").notNull(),
    deleted: integer("deleted", { mode: 'boolean' }).notNull().default(false),
});

export type Member = InferSelectModel<typeof membersTable>;