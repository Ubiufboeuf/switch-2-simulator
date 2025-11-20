export type Dimensions = {
  left: string
  top: string
  height: string
  width: string
}

export type TimeFormat = '12 hrs' | '24 hrs'
export type TimeSystem = 'AM' | 'PM' | null

export type ParsedTimestamp = {
  time: string,
  format: TimeFormat
  timeSystem: TimeSystem
}

export type ParseTimestampOptions = {
  format: TimeFormat
  output: Output
}

export type Output =
  'h:mm'
| 'hh:mm'
