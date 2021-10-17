import React from 'react';
import {Stack} from '@mui/material';
import StatsCard from "../../components/StatsCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import axios from 'axios';
import {formatDate} from "../../utils/common-utils";

class ProductionHistory extends React.Component {

    state = {
        loading: true,
        stats: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true}, () => {
            let {stats} = this.state;

            let url = '/day-stats'
            if (stats && stats.length) {
                url += `?lastDay=${stats[stats.length - 1].day}`
            }

            axios.get(url)
                .then(({data}) => {
                    if (data.stats && data.stats.length) {
                        stats = [...stats, ...data.stats];
                    }
                    this.setState({stats, loading: false});
                })
                .catch(console.error);
        })
    }

    render() {
        const {stats, loading} = this.state;

        return (
            <Stack spacing={2}>
                {stats.map(stat => (
                    <StatsCard key={stat.day} title={formatDate(stat.day)}
                               unit={'kWh'} value={stat.units_produced}/>
                ))}

                <LoadMoreButton hasData={stats.length} loading={loading} onClick={this.loadData}/>
            </Stack>
        );
    }
}

export default ProductionHistory;
