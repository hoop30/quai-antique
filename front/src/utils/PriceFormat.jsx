export function FormatPrice(price) {
    
    const priceToSplit = price.toString()
    const splitPrice = priceToSplit.split('.')
    
    if (splitPrice[1] === undefined) {
        splitPrice.push('00')
    } else if (splitPrice[1].length === 1) {
        splitPrice[1] = splitPrice[1] + '0'
    }
    
    return <p>{splitPrice[0]}€<sup>{splitPrice[1]}</sup></p>
}