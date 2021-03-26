SELECT UNIX_TIMESTAMP(visited_on) as 'visited_on_timestamp', duration, location_x, location_y
FROM visited_locations
WHERE username = ? AND visited_on <= ?