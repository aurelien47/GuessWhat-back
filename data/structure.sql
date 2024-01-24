BEGIN;

DROP TABLE  IF EXISTS play, users, roles, answers, riddles, themes;

CREATE TABLE roles (
   "id" int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
   "name" text NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),    
    "updated_at" timestamptz
);

CREATE TABLE users (
    "id" int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "role_id" int NOT NULL DEFAULT 2 REFERENCES roles(id) ON DELETE CASCADE ,
    "username" text NOT NULL UNIQUE, 
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz 

);

CREATE TABLE themes(
   "id" int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
   "name" text NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

CREATE TABLE riddles(
   "id" int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
   "theme_id" int NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
   "content" text NOT NULL,
   "wiki" text NOT NULL,
   "indicator" text NOT NULL,
   "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE("content", "theme_id")
);

CREATE TABLE answers(
    "id"  int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    "content" text NOT NULL,
    "is_good_answer" boolean NOT NULL,
    "riddle_id" int NOT NULL REFERENCES riddles(id) ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),    
    "updated_at" timestamptz,
    UNIQUE("content", "riddle_id")
);

CREATE TABLE play(
    "id" int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "theme_id" int NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
    "score" int NOT NULL,
    "errors" int,
    "count_indicators" INT,
    "created_at" timestamptz NOT NULL DEFAULT NOW(),
    "updated_at" timestamptz
);

COMMIT;