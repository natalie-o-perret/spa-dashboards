pub type Status {
  OnTrack
  AtRisk
  Blocked
  Complete
}

pub type Priority {
  Low
  Medium
  High
  Critical
}

pub type Project {
  Project(
    id: Int,
    name: String,
    owner: String,
    status: Status,
    priority: Priority,
    progress: Int,
    due: String,
    budget: Int,
  )
}

pub const statuses = [OnTrack, AtRisk, Blocked, Complete]

pub fn status_label(status: Status) -> String {
  case status {
    OnTrack -> "On track"
    AtRisk -> "At risk"
    Blocked -> "Blocked"
    Complete -> "Complete"
  }
}

pub fn priority_label(priority: Priority) -> String {
  case priority {
    Low -> "Low"
    Medium -> "Medium"
    High -> "High"
    Critical -> "Critical"
  }
}

pub const projects = [
  Project(
    1,
    "Aurora mobile refresh",
    "Maya Chen",
    OnTrack,
    High,
    82,
    "2026-09-24",
    48_000,
  ),
  Project(
    2,
    "Beacon research hub",
    "Theo Martin",
    AtRisk,
    High,
    61,
    "2026-09-28",
    36_000,
  ),
  Project(
    3,
    "Canvas design system",
    "Lena Ortiz",
    OnTrack,
    Medium,
    74,
    "2026-10-03",
    52_000,
  ),
  Project(
    4,
    "Delta billing clarity",
    "Jonah Reed",
    Blocked,
    Critical,
    39,
    "2026-09-22",
    29_000,
  ),
  Project(
    5,
    "Ember onboarding",
    "Ari Lewis",
    Complete,
    Medium,
    100,
    "2026-09-18",
    41_000,
  ),
  Project(
    6,
    "Fieldnote analytics",
    "Mina Khan",
    OnTrack,
    High,
    67,
    "2026-10-08",
    63_000,
  ),
  Project(
    7,
    "Grove partner portal",
    "Nora Singh",
    AtRisk,
    Medium,
    53,
    "2026-10-12",
    44_000,
  ),
  Project(
    8,
    "Harbor accessibility",
    "Sam Jones",
    OnTrack,
    Critical,
    88,
    "2026-09-26",
    27_000,
  ),
  Project(
    9,
    "Iris content migration",
    "Priya Shah",
    OnTrack,
    Low,
    71,
    "2026-10-15",
    33_000,
  ),
  Project(
    10,
    "Juniper automation",
    "Owen Brown",
    Complete,
    Medium,
    100,
    "2026-09-16",
    38_000,
  ),
  Project(
    11,
    "Kite support centre",
    "Eva Muller",
    OnTrack,
    Medium,
    58,
    "2026-10-20",
    47_000,
  ),
  Project(
    12,
    "Loom reporting suite",
    "Luca Rossi",
    AtRisk,
    High,
    46,
    "2026-10-05",
    56_000,
  ),
  Project(
    13,
    "Meadow localisation",
    "Amara King",
    OnTrack,
    Low,
    64,
    "2026-10-24",
    31_000,
  ),
  Project(
    14,
    "Northstar permissions",
    "Ben Adams",
    Blocked,
    High,
    32,
    "2026-09-30",
    42_000,
  ),
  Project(
    15,
    "Orbit notifications",
    "Zoe Lee",
    OnTrack,
    Medium,
    79,
    "2026-10-02",
    35_000,
  ),
  Project(
    16,
    "Patch account recovery",
    "Omar Ali",
    Complete,
    Critical,
    100,
    "2026-09-14",
    24_000,
  ),
  Project(
    17,
    "Quartz search relevance",
    "Mae Wilson",
    AtRisk,
    High,
    49,
    "2026-10-18",
    58_000,
  ),
  Project(
    18,
    "Relay API catalogue",
    "Felix Grant",
    OnTrack,
    Low,
    76,
    "2026-10-11",
    39_000,
  ),
]
