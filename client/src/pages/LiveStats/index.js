import {Stack} from '@mui/material';
import StatsCard from "../../components/StatsCard";

const prepareStats = (data) => {
    return [
        {title: "Current Output", value: data.currentPower, unit: 'kW'},
        {title: "Today's Output", value: data.dayEnergy, unit: 'kWh'},
        {title: `Year ${data.year}'s Output `, value: data.yearEnergy, unit: 'kWh'}
    ]
};

const LiveStats = (props) => {
    const stats = prepareStats(props.data);
    return (
        <Stack spacing={2}>
            {stats.map(stat => <StatsCard key={stat.title} {...stat} />)}
        </Stack>
    );
}

export default LiveStats;
