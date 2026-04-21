-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone default now(),
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Public profiles are viewable by everyone.'
  ) then
    create policy "Public profiles are viewable by everyone." on public.profiles
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can insert their own profile.'
  ) then
    create policy "Users can insert their own profile." on public.profiles
      for insert with check ((select auth.uid()) = id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can update own profile.'
  ) then
    create policy "Users can update own profile." on public.profiles
      for update using ((select auth.uid()) = id);
  end if;
end
$$;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();