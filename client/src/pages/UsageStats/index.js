import React from 'react';
import {Stack} from '@mui/material';
import UsageCard from "../../components/UsageCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import axios from 'axios';

class UsageStats extends React.Component {

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

            let url = '/usage-stats'
            if (stats && stats.length) {
                url += `?lastId=${stats[stats.length - 1].id}`
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
                {stats.map((stat, i) => <UsageCard key={stat.id} {...stat} />)}
                <LoadMoreButton hasData={stats.length} loading={loading} onClick={this.loadData}/>
            </Stack>
        );
    }
}

export default UsageStats;
