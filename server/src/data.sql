CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE question (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text VARCHAR NOT NULL,
  quiz_id INTEGER NOT NULL REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE option (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    text text NOT NULL,
    is_correct boolean NOT NULL,
    question_id uuid NOT NULL,
    option_index int NOT NULL,
    CONSTRAINT fk_option_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE participant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR NOT NULL,
    hash_password VARCHAR NOT NULL,
    salt VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_attempt (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES participant (id),
  quiz_id INT REFERENCES quiz (id),
  score INT NOT NULL
);
