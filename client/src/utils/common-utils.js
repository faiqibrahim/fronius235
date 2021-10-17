import moment from "moment";

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const formatNumber = (val) => {
    if (!+val)
        return val;

    return formatter.format(+val);
}

export const formatDate = (date) => {
    return moment(date).format("dddd, MMMM Do YYYY")
}

