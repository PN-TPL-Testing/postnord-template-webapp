-- Grant anon role (read-only by default; add RLS policies to restrict further)
create role if not exists anon nologin;
grant usage on schema public to anon;

-- Example table — replace with your own schema
create table if not exists items (
    id   uuid primary key default gen_random_uuid(),
    name text not null
);

grant select on items to anon;
