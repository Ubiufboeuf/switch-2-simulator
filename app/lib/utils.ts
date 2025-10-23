export function title (title: string = '') {
  const baseTitle = 'Nintendo Switch 2 UI'
  return title ? `${title} - ${baseTitle}` : baseTitle
}
