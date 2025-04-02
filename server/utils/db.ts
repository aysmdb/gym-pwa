import { drizzle } from "drizzle-orm/libsql";

export function useDb(){
    const config = useRuntimeConfig();
    return drizzle(config.dbPath);
}