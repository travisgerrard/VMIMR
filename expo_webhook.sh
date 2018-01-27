function localtunnel {
  lt -s travisgerrard --port 5000
}
until localtunnel; do
  echo "localtunnel server crashed"
  sleep Z
done
