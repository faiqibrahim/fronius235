import React from 'react';
import {Stack} from '@mui/material';
import ReadingCard from "../../components/ReadingCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import axios from 'axios';

class MeterReadings extends React.Component {

    state = {
        loading: true,
        readings: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true}, () => {
            let {readings} = this.state;

            let url = '/meter-readings'
            if (readings && readings.length) {
                url += `?lastReadingDate=${readings[readings.length - 1].reading_date}`
            }

            axios.get(url)
                .then(({data}) => {
                    if (data.readings && data.readings.length) {
                        readings = [...readings, ...data.readings];
                    }
                    this.setState({readings, loading: false});
                })
                .catch(console.error);
        })
    }

    render() {
        const {readings, loading} = this.state;

        return (
            <Stack spacing={2}>
                {readings.map((reading, i) => <ReadingCard key={reading.reading_date} {...reading} lastReading={readings[i+1]}/>)}
                <LoadMoreButton hasData={readings.length} loading={loading} onClick={this.loadData}/>
            </Stack>
        );
    }
}

export default MeterReadings;
