from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import database
from better_profanity import profanity

app = Flask(__name__)
cors = CORS(app)

MAX_LENGTH = 200

def validate_content(content):
  content = content.strip()
  if not content:
    raise ValueError("The Void expects actual messages, not just whitespace.")
  if profanity.contains_profanity(content):
    raise ValueError(f"The Void is an arbitrary prude, and does not appreciate your message:  \"{profanity.censor(content)}\"")
  if len(content) > MAX_LENGTH:
    raise ValueError(f"The Void cannot echo messages longer than {MAX_LENGTH} characters")
  return content

@app.errorhandler(ValueError)
def value_error(e):
  return jsonify(error=str(e)), 422

@app.errorhandler(AssertionError)
def value_error(e):
  return jsonify(error=str(e)), 500

@app.route("/throw-in-the-void", methods=["POST"])
def throw_in_the_void():
  if not request.is_json:
    raise ValueError("The Void expects json-encoded messages.")
  request_json = request.get_json()
  if "content" not in request_json:
    raise ValueError("The Void expects a message with 'content'.")
  content = validate_content(request_json["content"])
  response_content = database.throw_in_the_void(content)
  return jsonify(content=response_content)



if __name__ == "__main__":
  app.run(threaded=True)
