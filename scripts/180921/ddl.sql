DROP TABLE IF EXISTS solar_day_stats;
CREATE TABLE solar_day_stats(
    day DATE PRIMARY KEY,
    units_produced NUMERIC NOT NULL,
    created_at timestamp NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS solar_year_stats;
CREATE TABLE solar_year_stats(
    year INT PRIMARY KEY,
    units_produced NUMERIC NOT NULL,
    created_at timestamp NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS meter_readings;
CREATE TABLE meter_readings (
    reading_date DATE NOT NULL PRIMARY KEY,
    import_units NUMERIC NOT NULL,
    export_units NUMERIC NOT NULL,
    days_span INT NOT NULL,
    import_per_day NUMERIC NOT NULL,
    export_per_day NUMERIC NOT NULL,
    created_at timestamp NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS usage_stats;
CREATE TABLE usage_stats(
    id SERIAL NOT NULL PRIMARY KEY,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,

    days_span INT NOT NULL,

    production NUMERIC NOT NULL,
    production_per_day NUMERIC NOT NULL,

    consumed_units NUMERIC NOT NULL,
    consumed_units_per_day NUMERIC NOT NULL,

    net_export NUMERIC NOT NULL,
    net_export_per_day NUMERIC NOT NULL,

    grid_import_units NUMERIC NOT NULL,
    grid_import_units_per_day NUMERIC NOT NULL,

    direct_solar_units NUMERIC NOT NULL,
    direct_solar_units_per_day NUMERIC NOT NULL
);
