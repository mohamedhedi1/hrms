export class Holiday {
  name   !:  String
  date   !:  String
  duration  !: String
  shift  !:   Shift
}

enum Shift {
  DAY_ONLY,
  NIGHT_ONLY,
  BOTH_SHIFTS
}