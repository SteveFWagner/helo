create table users(
    id serial primary key,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic text
)

create table posts(
    id serial primary key,
    title VARCHAR(45),
    img text,
    content text,
    author_id int references users (id)
)




