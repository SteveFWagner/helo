select id,username,profile_pic
from users
where username = $1 and password = $2