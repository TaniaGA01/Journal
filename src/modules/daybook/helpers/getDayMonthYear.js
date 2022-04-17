const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];
const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
];
const getDayMonthYear = (dateString) => {
    const date = new Date(dateString)
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        yearDay:`${date.getFullYear()}, ${days[date.getDay()]}`
    }

}
export default getDayMonthYear