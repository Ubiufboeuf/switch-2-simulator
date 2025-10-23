export function title (title: string = '') {
  const baseTitle = 'Nintendo Switch 2'
  return title ? `${title} - ${baseTitle}` : baseTitle
}
