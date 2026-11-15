create extension if not exists pgcrypto;

create type public.content_status as enum ('draft', 'published');
create type public.timeline_entry_type as enum ('education', 'experience');
create type public.contact_message_status as enum ('unread', 'read', 'archived');

create table public.site_settings (
  id boolean primary key default true check (id),
  site_name text not null,
  short_name text not null,
  handle text not null,
  role text not null,
  business_role text,
  email text not null,
  phone text,
  whatsapp_url text,
  location text,
  origin text,
  bio text,
  profile_image_key text,
  social_links jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug = lower(slug)),
  short_description text not null,
  content jsonb not null default '{}'::jsonb,
  project_type text not null,
  technologies text[] not null default '{}',
  cover_key text,
  live_url text,
  repository_url text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  icon_key text,
  sort_order integer not null default 0 check (sort_order >= 0),
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.timeline_entries (
  id uuid primary key default gen_random_uuid(),
  entry_type public.timeline_entry_type not null,
  title text not null,
  organization text,
  description text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_key text not null unique,
  public_url text not null,
  alt_text text,
  mime_type text not null,
  file_size integer not null check (file_size >= 0),
  width integer check (width > 0),
  height integer check (height > 0),
  created_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_email text not null,
  message text not null,
  status public.contact_message_status not null default 'unread',
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_public_index
  on public.projects (status, featured desc, sort_order, published_at desc);
create index skills_visible_index on public.skills (visible, category, sort_order);
create index services_visible_index on public.services (visible, sort_order);
create index timeline_entries_visible_index
  on public.timeline_entries (visible, entry_type, sort_order);
create index faqs_visible_index on public.faqs (visible, sort_order);
create index contact_messages_status_index
  on public.contact_messages (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger skills_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

create trigger services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create trigger timeline_entries_updated_at
before update on public.timeline_entries
for each row execute function public.set_updated_at();

create trigger faqs_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

create trigger contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.services enable row level security;
alter table public.timeline_entries enable row level security;
alter table public.faqs enable row level security;
alter table public.media_assets enable row level security;
alter table public.contact_messages enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

insert into public.site_settings (
  site_name,
  short_name,
  handle,
  role,
  business_role,
  email,
  phone,
  whatsapp_url,
  location,
  origin,
  bio,
  social_links,
  seo
) values (
  'Habib Arifin Makhtum',
  'Habib Arifin',
  'Habib Arifin Makhtum',
  'Full-Stack Developer & IT Solver',
  'Co-Founder & Technology Director at PT Enova Cakra Digital',
  'habibarifin@enova.id',
  '+201507049289',
  'https://wa.me/201507049289',
  'Kairo, Mesir',
  'Bandung, Jawa Barat, Indonesia',
  'Full-Stack Developer dan IT Solver yang membangun aplikasi web, ERP, integrasi API, dan sistem digital dari purwarupa hingga production.',
  '{
    "github": "https://github.com/aarefenam",
    "linkedin": "https://www.linkedin.com/in/habib-arifin-makhtum",
    "instagram": "https://www.instagram.com/sowlyy_/"
  }'::jsonb,
  '{
    "title": "Habib Arifin Makhtum | Full-Stack Developer & IT Solver",
    "description": "Aplikasi web, ERP, integrasi API, dan sistem digital dari purwarupa hingga production."
  }'::jsonb
)
on conflict (id) do nothing;
