const DAY_STATS_INSERT_QUERY = `
    INSERT INTO solar_day_stats (day, units_produced, created_at, updated_at)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT
        (day)
    DO
    UPDATE SET units_produced = EXCLUDED.units_produced, updated_at = $4
        RETURNING *;`;

const YEAR_STATS_INSERT_QUERY = `
    INSERT INTO solar_year_stats (year, units_produced, created_at, updated_at)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT
        (year)
    DO
    UPDATE SET units_produced = EXCLUDED.units_produced, updated_at = $4
        RETURNING *;`;

const FETCH_DAY_STATS_QUERY = (day, year) => {
    const SELECT = `SELECT *
                    FROM solar_day_stats`;
    const DAY_CLAUSE = ` day < $1`;
    const YEAR_CLAUSE = ` day BETWEEN '${year}-01-01 00:00:00' AND '${year}-12-31 23:59:59'`
    const ORDER_LIMIT = ` ORDER BY day DESC LIMIT 20`;

    if (day && year)
        return `${SELECT} WHERE ${DAY_CLAUSE} AND ${YEAR_CLAUSE} ${ORDER_LIMIT}`;
    else if (day) {
        return `${SELECT} WHERE ${DAY_CLAUSE} ${ORDER_LIMIT}`;
    } else if (year) {
        return `${SELECT} WHERE ${YEAR_CLAUSE} ${ORDER_LIMIT}`;
    } else {
        return `${SELECT} ${ORDER_LIMIT}`;
    }
}


const FETCH_YEAR_STATS_QUERY = `SELECT * FROM solar_year_stats ORDER BY YEAR DESC`;

module.exports = {
    DAY_STATS_INSERT_QUERY,
    YEAR_STATS_INSERT_QUERY,
    FETCH_DAY_STATS_QUERY,
    FETCH_YEAR_STATS_QUERY
}
