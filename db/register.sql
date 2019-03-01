insert into users (username, password, profile_pic)
values ($1,$2, 'https://robohash.org/qwe')
returning id, username, profile_pic
