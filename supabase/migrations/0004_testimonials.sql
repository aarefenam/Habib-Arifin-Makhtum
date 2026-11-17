-- Client ratings submitted from the public /rate page.
-- New rows stay hidden until the admin approves them. Additive and safe to rerun.
begin;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  project_name text,
  rating smallint not null check (rating between 1 and 5),
  message text not null,
  visible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_visible_index
  on public.testimonials (visible, sort_order, created_at desc);

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;
revoke all on public.testimonials from anon, authenticated;
grant all on public.testimonials to service_role;

commit;

-- Rollback (deletes all ratings):
-- drop table if exists public.testimonials;
