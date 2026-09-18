import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_logo_url" varchar,
  	"sizes_logo_width" numeric,
  	"sizes_logo_height" numeric,
  	"sizes_logo_mime_type" varchar,
  	"sizes_logo_filesize" numeric,
  	"sizes_logo_filename" varchar,
  	"sizes_poster_url" varchar,
  	"sizes_poster_width" numeric,
  	"sizes_poster_height" numeric,
  	"sizes_poster_mime_type" varchar,
  	"sizes_poster_filesize" numeric,
  	"sizes_poster_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"target_id" varchar NOT NULL
  );
  
  CREATE TABLE "landing_hero_checks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_hero_glance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_proof_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_problem_wall" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_video_testimonials_items_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_video_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"youtube_id" varchar,
  	"vimeo_id" varchar,
  	"mp4" varchar,
  	"poster_id" integer
  );
  
  CREATE TABLE "landing_case_studies_items_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_case_studies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"brand" varchar NOT NULL,
  	"challenge" varchar NOT NULL,
  	"built" varchar NOT NULL
  );
  
  CREATE TABLE "landing_engine_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"idx" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"get" varchar NOT NULL
  );
  
  CREATE TABLE "landing_tracks_items_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_tracks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "landing_fit_yes_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_fit_no_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_offer_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_offer_value_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_bonuses_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "landing_team_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_inaction_wait_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_inaction_act_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "landing_final_cta_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar NOT NULL,
  	"brand_suffix" varchar NOT NULL,
  	"brand_tagline" varchar NOT NULL,
  	"announcement_live" varchar NOT NULL,
  	"announcement_countdown_label" varchar NOT NULL,
  	"applications_close_at" timestamp(3) with time zone NOT NULL,
  	"sticky_bar_title" varchar NOT NULL,
  	"sticky_bar_sub" varchar NOT NULL,
  	"sticky_bar_cta" varchar NOT NULL,
  	"footer_company" varchar NOT NULL,
  	"footer_blurb" varchar NOT NULL,
  	"footer_legal" varchar NOT NULL,
  	"hero_target_id" varchar,
  	"hero_kicker" varchar NOT NULL,
  	"hero_title_lead" varchar NOT NULL,
  	"hero_title_accent" varchar NOT NULL,
  	"hero_lede" varchar NOT NULL,
  	"hero_cta" varchar NOT NULL,
  	"hero_cta_note" varchar NOT NULL,
  	"hero_credential_initial" varchar NOT NULL,
  	"hero_credential_logo_id" integer,
  	"hero_credential_headline" varchar NOT NULL,
  	"hero_credential_body" varchar NOT NULL,
  	"hero_map_caption" varchar NOT NULL,
  	"proof_target_id" varchar,
  	"clients_target_id" varchar,
  	"showcase_heading" varchar NOT NULL,
  	"problem_target_id" varchar,
  	"problem_kicker" varchar NOT NULL,
  	"problem_title" varchar NOT NULL,
  	"problem_body" varchar NOT NULL,
  	"problem_turn_lead" varchar NOT NULL,
  	"problem_turn_accent" varchar NOT NULL,
  	"problem_chart_title" varchar NOT NULL,
  	"problem_chart_good" varchar NOT NULL,
  	"problem_chart_bad" varchar NOT NULL,
  	"video_testimonials_target_id" varchar,
  	"video_testimonials_kicker" varchar NOT NULL,
  	"video_testimonials_title" varchar NOT NULL,
  	"video_testimonials_lede" varchar NOT NULL,
  	"case_studies_target_id" varchar,
  	"case_studies_kicker" varchar NOT NULL,
  	"case_studies_title" varchar NOT NULL,
  	"case_studies_lede" varchar NOT NULL,
  	"engine_target_id" varchar,
  	"engine_kicker" varchar NOT NULL,
  	"engine_title" varchar NOT NULL,
  	"engine_lede" varchar NOT NULL,
  	"tracks_target_id" varchar,
  	"tracks_kicker" varchar NOT NULL,
  	"tracks_title" varchar NOT NULL,
  	"tracks_note" varchar NOT NULL,
  	"fit_target_id" varchar,
  	"fit_kicker" varchar NOT NULL,
  	"fit_title" varchar NOT NULL,
  	"fit_yes_title" varchar NOT NULL,
  	"fit_no_title" varchar NOT NULL,
  	"offer_target_id" varchar,
  	"offer_kicker" varchar NOT NULL,
  	"offer_title" varchar NOT NULL,
  	"offer_slots_taken" numeric NOT NULL,
  	"offer_slots_total" numeric NOT NULL,
  	"offer_card_title" varchar NOT NULL,
  	"offer_card_sub" varchar NOT NULL,
  	"offer_total_value" varchar NOT NULL,
  	"offer_price_lead" varchar NOT NULL,
  	"offer_price" varchar NOT NULL,
  	"offer_price_suffix" varchar NOT NULL,
  	"offer_credit" varchar NOT NULL,
  	"offer_cta" varchar NOT NULL,
  	"offer_anchor" varchar NOT NULL,
  	"offer_engagement_lead" varchar NOT NULL,
  	"offer_engagement_note" varchar NOT NULL,
  	"bonuses_target_id" varchar,
  	"bonuses_kicker" varchar NOT NULL,
  	"bonuses_title" varchar NOT NULL,
  	"bonuses_total" varchar NOT NULL,
  	"team_target_id" varchar,
  	"team_kicker" varchar NOT NULL,
  	"team_title" varchar NOT NULL,
  	"team_photo_id" integer,
  	"guarantee_target_id" varchar,
  	"guarantee_title" varchar NOT NULL,
  	"guarantee_body" varchar NOT NULL,
  	"inaction_wait_title" varchar NOT NULL,
  	"inaction_act_title" varchar NOT NULL,
  	"faq_target_id" varchar,
  	"faq_kicker" varchar NOT NULL,
  	"faq_title" varchar NOT NULL,
  	"final_cta_target_id" varchar,
  	"final_cta_kicker" varchar NOT NULL,
  	"final_cta_title" varchar NOT NULL,
  	"final_cta_body" varchar NOT NULL,
  	"final_cta_cta" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_nav_links" ADD CONSTRAINT "landing_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_hero_checks" ADD CONSTRAINT "landing_hero_checks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_hero_glance" ADD CONSTRAINT "landing_hero_glance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_proof_stats" ADD CONSTRAINT "landing_proof_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_problem_wall" ADD CONSTRAINT "landing_problem_wall_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_video_testimonials_items_metrics" ADD CONSTRAINT "landing_video_testimonials_items_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_video_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_video_testimonials_items" ADD CONSTRAINT "landing_video_testimonials_items_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_video_testimonials_items" ADD CONSTRAINT "landing_video_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_case_studies_items_metrics" ADD CONSTRAINT "landing_case_studies_items_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_case_studies_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_case_studies_items" ADD CONSTRAINT "landing_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_engine_pillars" ADD CONSTRAINT "landing_engine_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_tracks_items_points" ADD CONSTRAINT "landing_tracks_items_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_tracks_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_tracks_items" ADD CONSTRAINT "landing_tracks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_fit_yes_points" ADD CONSTRAINT "landing_fit_yes_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_fit_no_points" ADD CONSTRAINT "landing_fit_no_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_offer_includes" ADD CONSTRAINT "landing_offer_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_offer_value_stack" ADD CONSTRAINT "landing_offer_value_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_bonuses_items" ADD CONSTRAINT "landing_bonuses_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_team_body" ADD CONSTRAINT "landing_team_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_inaction_wait_points" ADD CONSTRAINT "landing_inaction_wait_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_inaction_act_points" ADD CONSTRAINT "landing_inaction_act_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_faq_items" ADD CONSTRAINT "landing_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_final_cta_trust" ADD CONSTRAINT "landing_final_cta_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_hero_credential_logo_id_media_id_fk" FOREIGN KEY ("hero_credential_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_team_photo_id_media_id_fk" FOREIGN KEY ("team_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_logo_sizes_logo_filename_idx" ON "media" USING btree ("sizes_logo_filename");
  CREATE INDEX "media_sizes_poster_sizes_poster_filename_idx" ON "media" USING btree ("sizes_poster_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_nav_links_order_idx" ON "landing_nav_links" USING btree ("_order");
  CREATE INDEX "landing_nav_links_parent_id_idx" ON "landing_nav_links" USING btree ("_parent_id");
  CREATE INDEX "landing_hero_checks_order_idx" ON "landing_hero_checks" USING btree ("_order");
  CREATE INDEX "landing_hero_checks_parent_id_idx" ON "landing_hero_checks" USING btree ("_parent_id");
  CREATE INDEX "landing_hero_glance_order_idx" ON "landing_hero_glance" USING btree ("_order");
  CREATE INDEX "landing_hero_glance_parent_id_idx" ON "landing_hero_glance" USING btree ("_parent_id");
  CREATE INDEX "landing_proof_stats_order_idx" ON "landing_proof_stats" USING btree ("_order");
  CREATE INDEX "landing_proof_stats_parent_id_idx" ON "landing_proof_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_problem_wall_order_idx" ON "landing_problem_wall" USING btree ("_order");
  CREATE INDEX "landing_problem_wall_parent_id_idx" ON "landing_problem_wall" USING btree ("_parent_id");
  CREATE INDEX "landing_video_testimonials_items_metrics_order_idx" ON "landing_video_testimonials_items_metrics" USING btree ("_order");
  CREATE INDEX "landing_video_testimonials_items_metrics_parent_id_idx" ON "landing_video_testimonials_items_metrics" USING btree ("_parent_id");
  CREATE INDEX "landing_video_testimonials_items_order_idx" ON "landing_video_testimonials_items" USING btree ("_order");
  CREATE INDEX "landing_video_testimonials_items_parent_id_idx" ON "landing_video_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "landing_video_testimonials_items_poster_idx" ON "landing_video_testimonials_items" USING btree ("poster_id");
  CREATE INDEX "landing_case_studies_items_metrics_order_idx" ON "landing_case_studies_items_metrics" USING btree ("_order");
  CREATE INDEX "landing_case_studies_items_metrics_parent_id_idx" ON "landing_case_studies_items_metrics" USING btree ("_parent_id");
  CREATE INDEX "landing_case_studies_items_order_idx" ON "landing_case_studies_items" USING btree ("_order");
  CREATE INDEX "landing_case_studies_items_parent_id_idx" ON "landing_case_studies_items" USING btree ("_parent_id");
  CREATE INDEX "landing_engine_pillars_order_idx" ON "landing_engine_pillars" USING btree ("_order");
  CREATE INDEX "landing_engine_pillars_parent_id_idx" ON "landing_engine_pillars" USING btree ("_parent_id");
  CREATE INDEX "landing_tracks_items_points_order_idx" ON "landing_tracks_items_points" USING btree ("_order");
  CREATE INDEX "landing_tracks_items_points_parent_id_idx" ON "landing_tracks_items_points" USING btree ("_parent_id");
  CREATE INDEX "landing_tracks_items_order_idx" ON "landing_tracks_items" USING btree ("_order");
  CREATE INDEX "landing_tracks_items_parent_id_idx" ON "landing_tracks_items" USING btree ("_parent_id");
  CREATE INDEX "landing_fit_yes_points_order_idx" ON "landing_fit_yes_points" USING btree ("_order");
  CREATE INDEX "landing_fit_yes_points_parent_id_idx" ON "landing_fit_yes_points" USING btree ("_parent_id");
  CREATE INDEX "landing_fit_no_points_order_idx" ON "landing_fit_no_points" USING btree ("_order");
  CREATE INDEX "landing_fit_no_points_parent_id_idx" ON "landing_fit_no_points" USING btree ("_parent_id");
  CREATE INDEX "landing_offer_includes_order_idx" ON "landing_offer_includes" USING btree ("_order");
  CREATE INDEX "landing_offer_includes_parent_id_idx" ON "landing_offer_includes" USING btree ("_parent_id");
  CREATE INDEX "landing_offer_value_stack_order_idx" ON "landing_offer_value_stack" USING btree ("_order");
  CREATE INDEX "landing_offer_value_stack_parent_id_idx" ON "landing_offer_value_stack" USING btree ("_parent_id");
  CREATE INDEX "landing_bonuses_items_order_idx" ON "landing_bonuses_items" USING btree ("_order");
  CREATE INDEX "landing_bonuses_items_parent_id_idx" ON "landing_bonuses_items" USING btree ("_parent_id");
  CREATE INDEX "landing_team_body_order_idx" ON "landing_team_body" USING btree ("_order");
  CREATE INDEX "landing_team_body_parent_id_idx" ON "landing_team_body" USING btree ("_parent_id");
  CREATE INDEX "landing_inaction_wait_points_order_idx" ON "landing_inaction_wait_points" USING btree ("_order");
  CREATE INDEX "landing_inaction_wait_points_parent_id_idx" ON "landing_inaction_wait_points" USING btree ("_parent_id");
  CREATE INDEX "landing_inaction_act_points_order_idx" ON "landing_inaction_act_points" USING btree ("_order");
  CREATE INDEX "landing_inaction_act_points_parent_id_idx" ON "landing_inaction_act_points" USING btree ("_parent_id");
  CREATE INDEX "landing_faq_items_order_idx" ON "landing_faq_items" USING btree ("_order");
  CREATE INDEX "landing_faq_items_parent_id_idx" ON "landing_faq_items" USING btree ("_parent_id");
  CREATE INDEX "landing_final_cta_trust_order_idx" ON "landing_final_cta_trust" USING btree ("_order");
  CREATE INDEX "landing_final_cta_trust_parent_id_idx" ON "landing_final_cta_trust" USING btree ("_parent_id");
  CREATE INDEX "landing_hero_credential_hero_credential_logo_idx" ON "landing" USING btree ("hero_credential_logo_id");
  CREATE INDEX "landing_team_team_photo_idx" ON "landing" USING btree ("team_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_nav_links" CASCADE;
  DROP TABLE "landing_hero_checks" CASCADE;
  DROP TABLE "landing_hero_glance" CASCADE;
  DROP TABLE "landing_proof_stats" CASCADE;
  DROP TABLE "landing_problem_wall" CASCADE;
  DROP TABLE "landing_video_testimonials_items_metrics" CASCADE;
  DROP TABLE "landing_video_testimonials_items" CASCADE;
  DROP TABLE "landing_case_studies_items_metrics" CASCADE;
  DROP TABLE "landing_case_studies_items" CASCADE;
  DROP TABLE "landing_engine_pillars" CASCADE;
  DROP TABLE "landing_tracks_items_points" CASCADE;
  DROP TABLE "landing_tracks_items" CASCADE;
  DROP TABLE "landing_fit_yes_points" CASCADE;
  DROP TABLE "landing_fit_no_points" CASCADE;
  DROP TABLE "landing_offer_includes" CASCADE;
  DROP TABLE "landing_offer_value_stack" CASCADE;
  DROP TABLE "landing_bonuses_items" CASCADE;
  DROP TABLE "landing_team_body" CASCADE;
  DROP TABLE "landing_inaction_wait_points" CASCADE;
  DROP TABLE "landing_inaction_act_points" CASCADE;
  DROP TABLE "landing_faq_items" CASCADE;
  DROP TABLE "landing_final_cta_trust" CASCADE;
  DROP TABLE "landing" CASCADE;`)
}
