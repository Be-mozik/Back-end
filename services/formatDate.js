const formatEventDateTime = (dateheure) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const eventDate = new Date(dateheure);
    const formattedDate = eventDate.toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = eventDate.toLocaleTimeString('fr-FR', optionsTime);
    return {
        date: formattedDate,
        time: formattedTime
    };
};

module.exports = { formatEventDateTime };
