use anchor_lang::prelude::*;

use crate::{
    errors::TicketRegistryError,
    events::EventCreated,
    state::{Event, EVENT_SEED, MAX_DESCRIPTION_LEN, MAX_NAME_LEN},
};

pub fn _initialize(
    ctx: Context<Initialize>,
    name: String,
    description: String,
    ticket_price: u64,
    available_ticket: u64,
    start_date: i64,
) -> Result<()> {
    let event_organizer = &mut ctx.accounts.event_organizer;
    let event = &mut ctx.accounts.event;
    let event_bump = ctx.bumps.event;

    require!(name.len() <= MAX_NAME_LEN, TicketRegistryError::NameTooLong);
    event.name = name;

    require!(
        description.len() <= MAX_DESCRIPTION_LEN,
        TicketRegistryError::DescriptionTooLong
    );
    event.description = description;

    require!(
        start_date > Clock::get()?.unix_timestamp,
        TicketRegistryError::StartDateInThePast
    );
    event.start_date = start_date;

    require!(
        available_ticket > 0,
        TicketRegistryError::AvailableTicketsTooLow
    );
    event.available_tickets = available_ticket;

    event.ticket_price = ticket_price;
    event.event_organizer = event_organizer.key();
    event.bump = event_bump;

    emit!(EventCreated {
        event: event.key(),
        event_organizer: event_organizer.key()
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub event_organizer: Signer<'info>,

    #[account(
        init,
        payer = event_organizer,
        space = 8 + Event::INIT_SPACE,
        seeds = [EVENT_SEED.as_bytes(), name.as_bytes(), event_organizer.key().as_ref()],
        bump
    )]
    pub event: Account<'info, Event>,
    
    pub system_program: Program<'info, System>,
}
