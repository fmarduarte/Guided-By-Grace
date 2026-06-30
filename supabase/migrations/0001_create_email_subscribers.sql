-- Guided by Grace — email subscribers
--
-- A simple subscriber list (NOT authentication). Stores an email plus where
-- it was collected and which journey it relates to. No accounts, no passwords.
--
-- Run this in the Supabase SQL editor, or via the Supabase CLI:
--   supabase db push
-- ---------------------------------------------------------------------------

create table if not exists public.email_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,
  journey     text,
  created_at  timestamptz not null default now()
);

-- One row per email address.
alter table public.email_subscribers
  add constraint email_subscribers_email_key unique (email);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Enable RLS and allow ONLY anonymous inserts. We intentionally do NOT add a
-- SELECT policy, so collected emails are never publicly readable with the
-- anon key — they can only be read from the Supabase dashboard or with the
-- service-role key on a trusted server.
-- ---------------------------------------------------------------------------
alter table public.email_subscribers enable row level security;

drop policy if exists "Allow anonymous email signups" on public.email_subscribers;
create policy "Allow anonymous email signups"
  on public.email_subscribers
  for insert
  to anon
  with check (true);
