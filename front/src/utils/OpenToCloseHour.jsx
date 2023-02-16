import TimeFormat from "./TimeFormat";

export default function OpenToCloseHour(openHours) {

    let openToClose = {
        noon: [],
        evening: []
    }

    function hourSelect(e) {
        const hours = document.querySelectorAll('.hour')

        hours.forEach(el => {
            if (el.classList.contains('selected')) {
                el.classList.remove('selected')
            }
        });

        if (!e.target.classList.contains('selected')) {
            e.target.classList.add('selected')
        }
    }

    openHours.forEach(hour => {
        const opentimeStamp = new Date(hour.open).getTime()
        const closetimeStamp = new Date(hour.close).getTime()

        for (let i = opentimeStamp; i <= closetimeStamp; i = i + 900000) {
            switch (hour.type) {
                case 'noon':
                    openToClose.noon.push(<div className="hour" onClick={hourSelect}>{TimeFormat(new Date(i))}</div>)
                    break;
                case 'evening':
                    openToClose.evening.push(<div className="hour" onClick={hourSelect}>{TimeFormat(new Date(i))}</div>)
                    break;
                default:
                    break;
            }
        }
    });

    return openToClose
}
