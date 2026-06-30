-- Guided by Grace — unsubscribe support
--
-- Adds subscription status, an unsubscribe timestamp, and a per-subscriber
-- token used to build one-click unsubscribe links. Rows are never deleted on
-- unsubscribe — only marked.
-- ---------------------------------------------------------------------------

alter table public.email_subscribers
  add column if not exists status text not null default 'active',
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

-- One unguessable token per subscriber (also backfilled for existing rows by
-- the volatile default above).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'email_subscribers_unsubscribe_token_key'
  ) then
    alter table public.email_subscribers
      add constraint email_subscribers_unsubscribe_token_key unique (unsubscribe_token);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RLS stays locked down: anon may INSERT only (policy from 0001).
--
-- We intentionally add NO anonymous UPDATE policy. The frontend never updates
-- rows. Both transitions on an existing subscriber —
--   * unsubscribe  (status -> 'unsubscribed')
--   * reactivation (status -> 'active', unsubscribed_at -> null)
-- are performed exclusively by Supabase Edge Functions using the service-role
-- key, never from the browser. Emails also remain unreadable with the anon key
-- (no SELECT policy exists).
-- ---------------------------------------------------------------------------
