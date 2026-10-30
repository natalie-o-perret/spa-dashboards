@external(javascript, "./interop_ffi.mjs", "readTheme")
pub fn read_theme() -> String

@external(javascript, "./interop_ffi.mjs", "systemDark")
pub fn system_dark() -> Bool

@external(javascript, "./interop_ffi.mjs", "watchSystemTheme")
pub fn watch_system_theme(on_change: fn(Bool) -> Nil) -> Nil

@external(javascript, "./tooltip_ffi.mjs", "setupTooltips")
pub fn setup_tooltips() -> Nil

@external(javascript, "./interop_ffi.mjs", "saveTheme")
pub fn save_theme(preference: String) -> Nil

@external(javascript, "./interop_ffi.mjs", "focusMenu")
pub fn focus_menu() -> Nil

@external(javascript, "./interop_ffi.mjs", "focusNavigation")
pub fn focus_navigation() -> Nil

@external(javascript, "./interop_ffi.mjs", "setupNavigation")
pub fn setup_navigation(on_desktop: fn() -> Nil) -> Nil

@external(javascript, "./interop_ffi.mjs", "downloadCsv")
pub fn download_csv(content: String) -> Nil

@external(javascript, "./interop_ffi.mjs", "formatBudget")
pub fn format_budget(value: Int) -> String

@external(javascript, "./interop_ffi.mjs", "formatDate")
pub fn format_date(value: String) -> String
