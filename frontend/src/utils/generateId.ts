let uniqueIndex = 0;
export default function generateId() {
    return (uniqueIndex++) + '';
}
