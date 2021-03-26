SELECT location_x, location_y FROM visited_locations
LEFT JOIN infection_reports
ON infection_reports.username = visited_locations.username AND infection_reports.infected_on >= DATE_SUB(NOW(), INTERVAL ? WEEK)
WHERE visited_locations.visited_on >= DATE_SUB(NOW(), INTERVAL ? WEEK);
