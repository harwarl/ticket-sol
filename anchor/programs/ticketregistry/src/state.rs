use anchor_lang::prelude::*;

pub const EVENT_SEED: &str = "event";
pub const TICKET_SEED: &str = "ticket";
pub const MAX_NAME_LEN: usize = 30;
pub const MAX_DESCRIPTION_LEN: usize = 300;

#[account]
#[derive(InitSpace)]
pub struct Event {
    #[max_len(30)]
    pub name: String,
    #[max_len(300)]
    pub description: String,
    pub ticket_price: u64,
    pub available_tickets: u64,
    pub event_organizer: Pubkey,
    pub start_date: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Ticket {
    pub buyer: Pubkey,
    pub event: Pubkey,
    pub price: u64,
}
