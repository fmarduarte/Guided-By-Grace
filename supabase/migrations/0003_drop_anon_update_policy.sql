-- Guided by Grace — keep RLS secure (no public UPDATE)
--
-- Earlier iterations briefly added an anonymous UPDATE policy to allow
-- re-subscribing from the browser. We've removed that approach: no public
-- UPDATE policy should exist. Unsubscribe and reactivation are handled only by
-- Edge Functions with the service-role key.
--
-- This migration is safe to run even if the policy was never created.
-- ---------------------------------------------------------------------------

drop policy if exists "Allow anonymous reactivation" on public.email_subscribers;
