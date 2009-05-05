# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_scalaenvy_session',
  :secret      => 'c4c2e2e2ba0bf04793fca8be68671269b10a37ab18badef428c027e889dd8b712446b634260c040367352e833bfb2d951716d694c6f2b43299abd3292179f15f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
