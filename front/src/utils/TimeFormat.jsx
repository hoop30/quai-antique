export default function TimeFormat(time) {
  return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
