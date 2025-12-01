use anchor_lang::prelude::*;

#[event]
pub struct EventCreated {
    pub event: Pubkey,
    pub event_organizer: Pubkey,
}

#[event]
pub struct TicketPurchased {
    pub event: Pubkey,
    pub ticket: Pubkey,
    pub buyer: Pubkey,
}
