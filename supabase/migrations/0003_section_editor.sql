-- Additive and safe to rerun. Existing JSON and all other sections are retained.
begin;

create or replace function public.update_site_content_section(section_key text, section_content jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if section_key not in (
    'header', 'footer', 'contactDialog', 'hero', 'about', 'skills', 'projects', 'faq', 'contact',
    'aboutIntro', 'aboutServices', 'aboutTimeline', 'aboutContact', 'aboutSeo', 'projectsPage', 'projectDetail'
  ) or section_key is null then
    raise exception 'Unknown content section';
  end if;
  if jsonb_typeof(section_content) is distinct from 'object' then
    raise exception 'Section content must be an object';
  end if;

  -- PostgreSQL locks the row, so saves to distinct sections cannot overwrite each other.
  update public.site_settings
    set content = jsonb_set(coalesce(content, '{}'::jsonb), array[section_key], section_content, true)
    where id = true;
  if not found then
    raise exception 'Site settings are missing. Run migration 0001 first.';
  end if;
end;
$$;

revoke all on function public.update_site_content_section(text, jsonb) from public, anon, authenticated;
grant execute on function public.update_site_content_section(text, jsonb) to service_role;

commit;

-- Rollback (content remains intact):
-- drop function if exists public.update_site_content_section(text, jsonb);
