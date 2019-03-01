select posts.id, posts.title, posts.img, posts.content, users.id as user_id, users.username,users.profile_pic
from posts
join users on posts.author_id=users.id
where users.id != $1