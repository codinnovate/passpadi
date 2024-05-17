let months = ["Jan", "Feb", "Mar","Apr","May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = [
    "sunday",
    "monday",
    "tueday",
    "wednessday",
    "thursday",
    "friday",
    "saturday"
];

export const getFullDay = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}



export const getDay = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]}`
}