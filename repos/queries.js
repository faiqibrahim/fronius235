const DAY_STATS_INSERT_QUERY = `
    INSERT INTO solar_day_stats (day, units_produced, created_at, updated_at)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT
        (day)
    DO
    UPDATE SET units_produced = EXCLUDED.units_produced, updated_at = EXCLUDED.updated_at
        RETURNING *;`;

const METER_READING_INSERT_QUERY = `
    INSERT INTO meter_readings (reading_date, import_units, export_units, days_span, import_per_day, export_per_day, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`;

const LAST_METER_READING_QUERY = 'SELECT * from meter_readings ORDER BY reading_date DESC LIMIT 1';

const LAST_USAGE_STATS_READING_QUERY = 'SELECT * from usage_stats ORDER BY id DESC LIMIT 1';


const USAGE_STATS_INSERT_QUERY = `
    INSERT INTO usage_stats (from_date, to_date, days_span,
                             production, production_per_day, consumed_units, consumed_units_per_day,
                             net_export, net_export_per_day, grid_import_units, grid_import_units_per_day,
                            direct_solar_units, direct_solar_units_per_day)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;`;

const YEAR_TOTAL_UNITS_QUERY = (year) => `
    SELECT ROUND(SUM(units_produced), 2) FROM solar_day_stats where day BETWEEN '${year}-01-01 00:00:00' AND '${year}-12-31 23:59:59'
`;

const YEAR_STATS_INSERT_QUERY = (year) =>  `
    INSERT INTO solar_year_stats (year, units_produced, created_at, updated_at)
    VALUES ($1, (${YEAR_TOTAL_UNITS_QUERY(year)}), $2, $3)
    ON CONFLICT
        (year)
    DO
    UPDATE SET units_produced = EXCLUDED.units_produced, updated_at = EXCLUDED.updated_at
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

const FETCH_STATS_OF_DAY_QUERY = `SELECT SUM(units_produced) as total_production FROM solar_day_stats where day <= $1`;

module.exports = {
    DAY_STATS_INSERT_QUERY,
    YEAR_STATS_INSERT_QUERY,
    FETCH_DAY_STATS_QUERY,
    FETCH_YEAR_STATS_QUERY,
    METER_READING_INSERT_QUERY,
    LAST_METER_READING_QUERY,
    USAGE_STATS_INSERT_QUERY,
    FETCH_STATS_OF_DAY_QUERY,
    LAST_USAGE_STATS_READING_QUERY
}
