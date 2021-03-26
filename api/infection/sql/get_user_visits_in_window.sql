SELECT location_x, location_y FROM visited_locations
WHERE username = ? AND visited_on >= DATE_SUB(NOW(), INTERVAL ? WEEK);
