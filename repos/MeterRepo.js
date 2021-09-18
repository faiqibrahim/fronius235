const pool = require('../db/pg');
const {
    METER_READING_INSERT_QUERY, LAST_METER_READING_QUERY, USAGE_STATS_INSERT_QUERY,
    LAST_USAGE_STATS_READING_QUERY
} = require('./queries');
const _ = require('lodash');

const querySuccessful = (rs) => rs && rs.rows && rs.rows.length;

module.exports = class MeterRepo {

    static getLastMeterReading = async () => {
        const connection = await pool.connect();
        try {
            const rs = await connection.query(LAST_METER_READING_QUERY);
            return !_.isEmpty(rs.rows) ? rs.rows[0] : null;
        } finally {
            await connection.release();
        }
    }

    static getLastUsageStats = async () => {
        const connection = await pool.connect();
        try {
            const rs = await connection.query(LAST_USAGE_STATS_READING_QUERY);
            return !_.isEmpty(rs.rows) ? rs.rows[0] : null;
        } finally {
            await connection.release();
        }
    }

    static saveMeterReading = async (reading) => {
        const params = [reading.reading_date, reading.import_units, reading.export_units, reading.days_span, reading.import_per_day, reading.export_per_day, reading.created_at, reading.updated_at];
        const connection = await pool.connect();

        try {
            const rs = await connection.query(METER_READING_INSERT_QUERY, params);

            if (!querySuccessful(rs))
                throw new Error("Could not insert meter-reading data.");

            return rs.rows[0];
        } finally {
            await connection.release();
        }
    }

    static saveUsageStats = async (stats) => {
        const params = [stats.from_date, stats.to_date, stats.days_span,
            stats.production, stats.production_per_day, stats.consumed_units, stats.consumed_units_per_day,
            stats.net_export, stats.net_export_per_day, stats.grid_import_units, stats.grid_import_units_per_day,
            stats.direct_solar_units, stats.direct_solar_units_per_day];

        const connection = await pool.connect();
        try {
            const rs = await connection.query(USAGE_STATS_INSERT_QUERY, params);

            if (!querySuccessful(rs))
                throw new Error("Could not insert usage-stats data.");

            return rs.rows[0];
        } finally {
            await connection.release();
        }
    }

}
