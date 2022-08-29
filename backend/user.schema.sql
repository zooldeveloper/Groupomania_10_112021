-- Creates the groupomania database name
CREATE DATABASE groupomania CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Creates users table
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Your bio is empty!',
  `jobTitle` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT 'Position non provided!',
  `isAdmin` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `active` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'true',
  PRIMARY KEY (`id`));

-- Creates posts table
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `textual_post` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`));

-- Creates comments table
  CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `creation_date` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`comment_id`));

-- Creates post_likes table
  CREATE TABLE `post_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `likes` int DEFAULT NULL,
  `dislikes` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `users_liked` int DEFAULT NULL,
  `users_disliked` int DEFAULT NULL,
  PRIMARY KEY (`like_id`));

-- Creates subscribers table
  CREATE TABLE `subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscriber_status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `profile_owner` int DEFAULT NULL,
  `subscribed_user` int DEFAULT NULL,
  PRIMARY KEY (`id`)