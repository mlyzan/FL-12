export default function isDraw() {
    const cellElements = document.querySelectorAll('.cell');

    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}