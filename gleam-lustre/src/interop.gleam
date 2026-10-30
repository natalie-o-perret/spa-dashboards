@external(javascript, "./interop_ffi.mjs", "downloadCsv")
pub fn download_csv(content: String) -> Nil

@external(javascript, "./interop_ffi.mjs", "formatBudget")
pub fn format_budget(value: Int) -> String

@external(javascript, "./interop_ffi.mjs", "formatDate")
pub fn format_date(value: String) -> String
