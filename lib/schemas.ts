import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const page_stat_data = sqliteTable('page_stat_data', {
  id_book: integer('id_book'),
  page: integer('page'),
  start_time: integer('start_time'),
  duration: integer('duration'),
  total_pages: integer('total_pages'),
});

export const book = sqliteTable("book", {
  id: integer("id").primaryKey(),
  title: text("title"),
  authors: text("authors"),
  notes: integer("notes"),
  last_open: integer("last_open"),
  highlights: integer("highlights"),
  pages: integer("pages"),
  series: text("series"),
  language: text("language"),
  md5: text("md5"),
  total_read_pages: integer("total_read_pages"),
  total_read_time: integer("total_read_time"),
});
