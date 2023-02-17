export default function DaysFormat(day, onSetUpdateModal) {
    
    let dayClass
    
    switch (day.type) {
        case 'open':
            dayClass = 'red'
            break;
        case 'noon':
            dayClass = 'green'
            break;
        case 'evening':
            dayClass = 'blue'
            break;
        default:
            dayClass = 'grey'
            break;
    }
    
    return <li className={dayClass} key={day.id}><button onClick={() => onSetUpdateModal('days', day.id)}>{day.value}</button></li>
}
