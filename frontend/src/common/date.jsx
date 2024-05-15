let months = ["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = [
    "sunday",
    "monday",
    "tueday",
    "wednessday",
    "thursday",
    "friday",
    "saturday"
];


export const getDay = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]}`
}