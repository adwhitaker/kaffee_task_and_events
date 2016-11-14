-- table contained application user id and googleID
CREATE TABLE task_users (
	id SERIAL PRIMARY KEY,
	googleid varchar(100) NOT NULL,
	accesstoken varchar(200),
	refreshtoken varchar(200)
);

-- table containing tasks
CREATE TABLE task_items (
	id SERIAL PRIMARY KEY,
	item varchar(150),
	complete boolean,
	item_creater int REFERENCES task_users,
	start_date date,
	end_date date
);

-- table containing tasks to be completed every day
CREATE TABLE task_daily (
	id SERIAL PRIMARY KEY,
	item1 varchar(50),
	amount int,
	item2 archer(50),
	item_creator int REFERENCES task_users,
	complete boolean
);
