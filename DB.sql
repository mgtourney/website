/*
 Navicat Premium Data Transfer

 Source Server         : BST DEV
 Source Server Type    : PostgreSQL
 Source Server Version : 140005
 Source Host           : 192.168.0.69:1200
 Source Catalog        : Magnesium
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140005
 File Encoding         : 65001

 Date: 20/01/2023 00:33:49
*/


-- ----------------------------
-- Sequence structure for apikeys_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."apikeys_id_seq";
CREATE SEQUENCE "public"."apikeys_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 32767
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for banned_mods_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."banned_mods_id_seq";
CREATE SEQUENCE "public"."banned_mods_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 32767
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for rules_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."rules_id_seq";
CREATE SEQUENCE "public"."rules_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 32767
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sessions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sessions_id_seq";
CREATE SEQUENCE "public"."sessions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for apikeys
-- ----------------------------
DROP TABLE IF EXISTS "public"."apikeys";
CREATE TABLE "public"."apikeys" (
  "id" int2 NOT NULL DEFAULT nextval('apikeys_id_seq'::regclass),
  "key" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
  "owner" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '["Username","discord_id"]'::character varying,
  "type" int2 NOT NULL DEFAULT 0,
  "expiration_date" timestamptz(6),
  "request_reason" varchar(500) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."apikeys"."id" IS 'The ID of the key';
COMMENT ON COLUMN "public"."apikeys"."key" IS 'The UUID';
COMMENT ON COLUMN "public"."apikeys"."owner" IS 'The owner in an array, [Username,ID]';
COMMENT ON COLUMN "public"."apikeys"."type" IS 'What type of key it is. - 0: Revoked, 1: Tournament-API Key, 2: Other, 3: 3rd party, 4: Developer';
COMMENT ON COLUMN "public"."apikeys"."expiration_date" IS 'When the key expires.';
COMMENT ON COLUMN "public"."apikeys"."request_reason" IS 'Why the key was requested.';

-- ----------------------------
-- Records of apikeys
-- ----------------------------
INSERT INTO "public"."apikeys" VALUES (1, 'b0059e0e-8dda-11ed-a1eb-0242ac120002', '["Hawk","592779895084679188"]', 4, '2030-01-01 00:00:00+01', 'CURRENTLY NOT USED FOR ANYTHING | User is developer');

-- ----------------------------
-- Table structure for banned_mods
-- ----------------------------
DROP TABLE IF EXISTS "public"."banned_mods";
CREATE TABLE "public"."banned_mods" (
  "id" int2 NOT NULL DEFAULT nextval('banned_mods_id_seq'::regclass),
  "modname" varchar(255) COLLATE "pg_catalog"."default",
  "dll_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of banned_mods
-- ----------------------------
INSERT INTO "public"."banned_mods" VALUES (2, 'NalulunaSliceVisualizer', 'NalulunaSliceVisualizer.dll');
INSERT INTO "public"."banned_mods" VALUES (3, 'NoteSliceVisualizer', 'NoteSliceVisualizer.dll');
INSERT INTO "public"."banned_mods" VALUES (1, 'Intro-/Outro-Skip', 'IntroSkip.dll');
INSERT INTO "public"."banned_mods" VALUES (4, 'AccDot', 'AccDot.dll');
INSERT INTO "public"."banned_mods" VALUES (5, 'NoteCutGuide', 'NoteCutGuide.dll');
INSERT INTO "public"."banned_mods" VALUES (6, 'SongChartVisualizer', 'SongChartVisualizer.dll');
INSERT INTO "public"."banned_mods" VALUES (7, 'BeatSaberPlus_SongChartVisualizer', 'BeatSaberPlus_SongChartVisualizer.dll');

-- ----------------------------
-- Table structure for rules
-- ----------------------------
DROP TABLE IF EXISTS "public"."rules";
CREATE TABLE "public"."rules" (
  "id" int2 NOT NULL DEFAULT nextval('rules_id_seq'::regclass),
  "tabHeader" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "tabTitle" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "rule" varchar(600) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."rules"."tabHeader" IS 'The category for the rules.

If you want them to be in the same category, make sure to write the correct category.
';
COMMENT ON COLUMN "public"."rules"."tabTitle" IS 'The sub-title for the rule-category. This is used to categorize rules in a rule-tab. Example is, if you have rules pointed towards users, organizers or other roles.';
COMMENT ON COLUMN "public"."rules"."rule" IS 'The rule';

-- ----------------------------
-- Records of rules
-- ----------------------------
INSERT INTO "public"."rules" VALUES (1, 'General Rules', 'User rules', '["Test","Test"]');
INSERT INTO "public"."rules" VALUES (3, 'Banned Mods', 'Banned Mods', '["Test","Test"]');
INSERT INTO "public"."rules" VALUES (2, 'Tourney Rules', 'Tourney Rules', '["Test","Test"]');

-- ----------------------------
-- Table structure for s_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."s_roles";
CREATE TABLE "public"."s_roles" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "permission" int2,
  "description" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of s_roles
-- ----------------------------
INSERT INTO "public"."s_roles" VALUES (6, 'User', 1, 'Default user role');
INSERT INTO "public"."s_roles" VALUES (5, 'Map Pooler', 4, 'The Map-Pooler Role - Will get access to adjusting map-pools for tournaments');
INSERT INTO "public"."s_roles" VALUES (1, 'Directors', 10, 'The developer role have access to everything, everywhere.');
INSERT INTO "public"."s_roles" VALUES (2, 'Developer', 9, 'The admin role have full functionality on the website. This means they can access every function and are allowed to send GET/POST-requests through the API.');
INSERT INTO "public"."s_roles" VALUES (4, 'Coordinator', 5, 'The Coordinator Role - Will have access to Coordinator-tools');
INSERT INTO "public"."s_roles" VALUES (3, 'Caster', 6, 'The Casters Role - Doesn''t have access to anything, yet');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS "public"."sessions";
CREATE TABLE "public"."sessions" (
  "id" int4 NOT NULL DEFAULT nextval('sessions_id_seq'::regclass),
  "user_id" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "refresh_token" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
COMMENT ON COLUMN "public"."sessions"."id" IS 'The unique ID of the key';
COMMENT ON COLUMN "public"."sessions"."user_id" IS 'The id of the user it belongs to';
COMMENT ON COLUMN "public"."sessions"."refresh_token" IS 'The salted refresh-token';
COMMENT ON COLUMN "public"."sessions"."created_at" IS 'When the session was created. All sessions expires after 4 weeks';

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO "public"."sessions" VALUES (1, '592779895084679188', 'U2FsdGVkX1/4cZzaivIxakfo32vGoOznvUStX2okjlygQBFUXHM32hTMslgOHIzA', '2023-01-19 17:13:52.359379+01');

-- ----------------------------
-- Table structure for t_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_roles";
CREATE TABLE "public"."t_roles" (
  "id" int4 NOT NULL,
  "rolename" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "type" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of t_roles
-- ----------------------------
INSERT INTO "public"."t_roles" VALUES (1, 'Organizer', 'The person who''s "In-charge" of the tournament. Can control everything within the tournament.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (2, 'Admin', 'Sub-role of "Organizer", can control everything apart from deleting the tournament.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (3, 'Map-pooler', 'The people who create map-pools. They can only create, edit, remove and publish map-pools.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (4, 'Coordinator', 'The people who coordinate the matches. They can only access the coordinator-webpanel.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (5, 'Signed up', 'The user is signed up to the tournament. - This role is given before any play/qualifier is started.', 'tplayer');
INSERT INTO "public"."t_roles" VALUES (6, 'Participant', 'The user is signed up to the tournament, and are currently playing/trying to qualify', 'tplayer');
INSERT INTO "public"."t_roles" VALUES (7, 'Qualified', 'The user is signed up and passed the qualifiers', 'tplayer');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "permissions" int2 NOT NULL DEFAULT 0,
  "roles" varchar(300) COLLATE "pg_catalog"."default" DEFAULT '[""]'::character varying,
  "scoresaberdata" varchar(200) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '["0",0,0,"NA"]'::character varying,
  "twitter" varchar(255) COLLATE "pg_catalog"."default",
  "twitch" varchar(255) COLLATE "pg_catalog"."default",
  "previous_tourneys" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT '{"tournaments": [""]}'::character varying,
  "rating" int8 NOT NULL DEFAULT 0,
  "banned" int2 NOT NULL DEFAULT 0,
  "pronouns" int2 NOT NULL DEFAULT 2,
  "image" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."users"."pronouns" IS '0: He/Him, 1: She/Her, 2: They/Them, 3: Other';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES ('592779895084679188', 'Hawk', 9, '["WEB DEV, UI DEV"]', '["76561198086326146",51,1997,"DK"]', 'ThaNightHawkTV', 'ThaNightHawk', '{"tournaments": [""]}', 0, 0, 0, '592779895084679188.png');

-- ----------------------------
-- View structure for staffview
-- ----------------------------
DROP VIEW IF EXISTS "public"."staffview";
CREATE VIEW "public"."staffview" AS  SELECT users.id,
    users.name,
    users.roles,
    users.scoresaberdata,
    users.twitter,
    users.twitch,
    s_roles.name AS "roleName",
    users.image,
    s_roles.id AS "roleId"
   FROM (users
     JOIN s_roles ON ((users.permissions = s_roles.permission)))
  WHERE (users.permissions >= 8);

-- ----------------------------
-- View structure for getuserperms
-- ----------------------------
DROP VIEW IF EXISTS "public"."getuserperms";
CREATE VIEW "public"."getuserperms" AS  SELECT users.id,
    users.name,
    users.permissions,
    s_roles.name AS "roleName"
   FROM (users
     JOIN s_roles ON ((users.permissions = s_roles.permission)));

-- ----------------------------
-- View structure for getroles
-- ----------------------------
DROP VIEW IF EXISTS "public"."getroles";
CREATE VIEW "public"."getroles" AS  SELECT s_roles.id,
    s_roles.name,
    s_roles.permission
   FROM s_roles;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."apikeys_id_seq"
OWNED BY "public"."apikeys"."id";
SELECT setval('"public"."apikeys_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."banned_mods_id_seq"
OWNED BY "public"."banned_mods"."id";
SELECT setval('"public"."banned_mods_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."rules_id_seq"
OWNED BY "public"."rules"."id";
SELECT setval('"public"."rules_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sessions_id_seq"
OWNED BY "public"."sessions"."id";
SELECT setval('"public"."sessions_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table apikeys
-- ----------------------------
ALTER TABLE "public"."apikeys" ADD CONSTRAINT "apikeys_pkey" PRIMARY KEY ("id", "key");

-- ----------------------------
-- Primary Key structure for table banned_mods
-- ----------------------------
ALTER TABLE "public"."banned_mods" ADD CONSTRAINT "banned_mods_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table rules
-- ----------------------------
ALTER TABLE "public"."rules" ADD CONSTRAINT "rules_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table s_roles
-- ----------------------------
ALTER TABLE "public"."s_roles" ADD CONSTRAINT "webstaff_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sessions
-- ----------------------------
CREATE UNIQUE INDEX "access_token" ON "public"."sessions" USING btree (
  "refresh_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sessions
-- ----------------------------
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table t_roles
-- ----------------------------
ALTER TABLE "public"."t_roles" ADD CONSTRAINT "t_roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
