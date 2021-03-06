CREATE TABLE client (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(80) NOT NULL
);

CREATE TABLE goal (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(40) NOT NULL,
    dedicated_time DECIMAL NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    goal_owner INTEGER REFERENCES client(id) NOT NULL
    is_complete BOOLEAN;
);