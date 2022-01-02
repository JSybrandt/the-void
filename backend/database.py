import sqlite3
import time
import threading

_DB_LOCK = threading.Lock()

DB_PATH="void.sqlite.db"

_CON = sqlite3.connect(DB_PATH, check_same_thread=False)

# Create tables
_CON.execute("""
CREATE TABLE IF NOT EXISTS Posts(
  post_ns INTEGER PRIMARY KEY,
  content TEXT
);""")

_CON.execute("""
CREATE TABLE IF NOT EXISTS Archive(
  post_ns INTEGER PRIMARY KEY,
  content TEXT
);
""")

_INITIAL_POSTS = [
  "The only reason that we set up a Red Base here, is because they have a Blue"
  " Base over there.",
  "Always look on the bright side of life!",
  "Some things in life are bad, others may make you mad.",
  "The art of war is over rated.",
  "Learning typescript for this website might not have been worth it so far.",
  "And the only reason they have a Blue Base over there, is"
  " because we have a Red Base here.",
  "Omicron sucks. I said it.",
  "I hope you're having a great day!",
  "I'm having a fine day, its a little rainy atm.",
  "Lets see what happens!",
  "A Walmart rose by any other name would still barely smell like anything",
  "A rosé by another name would still taste as sweet.",
  "Hot take, quarantine sucks.",
  "I mean, we all get this is a website right...",
  "Getting houseplants has been an unexpected boon for me.",
  "Sometimes its hard to just get out of bed.",
  "This would be a terrible ARG",
]

with _DB_LOCK:
  current_posts = _CON.execute("SELECT COUNT(*) FROM Posts").fetchone()[0]
  print(current_posts)
  if current_posts == 0:
    with _CON:
      for post in _INITIAL_POSTS:
        _CON.execute("INSERT INTO Posts(post_ns, content) VALUES (?, ?)", (time.time_ns(), post))
        _CON.execute("INSERT INTO Archive(post_ns, content) VALUES (?, ?)", (time.time_ns(), post))

def throw_in_the_void(new_content):
  try:
    with _DB_LOCK:
      with _CON:
        old_post = _CON.execute("SELECT post_ns, content FROM Posts ORDER BY post_ns ASC LIMIT 1;").fetchone()
        assert old_post is not None, "The Void does not contain any responses at this time... That's a first."
        old_post_ns, old_content = old_post
        _CON.execute("INSERT INTO Posts(post_ns, content) VALUES (?, ?)", (time.time_ns(), new_content))
        _CON.execute("INSERT INTO Archive(post_ns, content) VALUES (?, ?)", (time.time_ns(), new_content))
        deleted_rows = _CON.execute("DELETE FROM Posts WHERE post_ns=?", (old_post_ns,)).rowcount
        assert deleted_rows == 1, f"The Void lost track of what it was supposed to respond with... Oops."
  except sqlite3.DatabaseError as e:
    raise AssertionError("The Void suffered an internal agitation. Its infinite nothingness cannot account for what happened to the database...")
  return old_content

