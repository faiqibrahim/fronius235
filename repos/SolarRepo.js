const pool = require('../db/pg');
const {
    DAY_STATS_INSERT_QUERY,
    YEAR_STATS_INSERT_QUERY,
    FETCH_DAY_STATS_QUERY,
    FETCH_YEAR_STATS_QUERY
} = require('./queries');
const moment = require('moment');

const querySuccessful = (rs) => rs && rs.rows && rs.rows.length;

module.exports = class SolarRepo {

    static saveDayStats = async (stats) => {
        const params = [stats.day, stats.dayEnergy, stats.created_at, stats.updated_at];
        const connection = await pool.connect();

        try {
            const rs = await connection.query(DAY_STATS_INSERT_QUERY, params);
            if (!querySuccessful(rs))
                throw new Error("Could not insert day stats data.");

            return rs.rows[0];
        } finally {
            await connection.release();
        }
    }

    static saveYearStats = async (stats) => {
        const params = [stats.year, stats.yearEnergy, stats.created_at, stats.updated_at];
        const connection = await pool.connect();

        try {
            const rs = await connection.query(YEAR_STATS_INSERT_QUERY, params);

            if (!querySuccessful(rs))
                throw new Error("Could not insert year stats data.");

            return rs.rows[0];
        } finally {
            await connection.release();
        }
    }

    static findDayStats = async (year = null, lastDay = null) => {
        const params = lastDay ? [moment(lastDay).toDate()] : [];
        const query = FETCH_DAY_STATS_QUERY(lastDay, year);

        const connection = await pool.connect();
        try {
            const rs = await connection.query(query, params);
            return rs.rows;
        } finally {
            await connection.release();
        }
    };

    static findYearStats = async () => {
        const connection = await pool.connect();
        try {
            const rs = await connection.query(FETCH_YEAR_STATS_QUERY);
            return rs.rows;
        } finally {
            await connection.release();
        }
    };
}
