use anchor_lang::error_code;

#[error_code]
pub enum TicketRegistryError {
    #[msg("Name too long")]
    NameTooLong,
    #[msg("Description too long")]
    DescriptionTooLong,
    #[msg("Start Date is in the past")]
    StartDateInThePast,
    #[msg("Available tickets too low")]
    AvailableTicketsTooLow,
    #[msg("All tickets sold out")]
    AllTicketsSoldOut,
}
