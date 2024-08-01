CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);
insert into blogs (url, title) values ('url1.com', 'title 1');
insert into blogs (url, title) values ('url2.com', 'title 2');