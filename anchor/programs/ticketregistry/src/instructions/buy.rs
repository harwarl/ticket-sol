use anchor_lang::{prelude::*, system_program};

use crate::{
    errors::TicketRegistryError,
    events::TicketPurchased,
    state::{Event, Ticket, TICKET_SEED},
};

pub fn _buy(ctx: Context<Buy>) -> Result<()> {
    let buyer = &mut ctx.accounts.buyer;
    let event = &mut ctx.accounts.event;
    let ticket = &mut ctx.accounts.ticket;
    let system_program = &mut ctx.accounts.system_program;

    require!(
        event.start_date > Clock::get()?.unix_timestamp,
        TicketRegistryError::StartDateInThePast
    );
    require!(
        event.available_tickets > 0,
        TicketRegistryError::AllTicketsSoldOut
    );

    event.available_tickets = event.available_tickets.checked_sub(1).unwrap();

    let cpi_context = CpiContext::new(
        system_program.to_account_info(),
        system_program::Transfer {
            from: buyer.to_account_info(),
            to: event.to_account_info(),
        },
    );

    system_program::transfer(cpi_context, event.ticket_price)?;

    ticket.event = event.key();
    ticket.buyer = buyer.key();
    ticket.price = event.ticket_price;

    emit!(TicketPurchased {
        event: event.key(),
        ticket: ticket.key(),
        buyer: buyer.key()
    });

    Ok(())
}

#[derive(Accounts)]
pub struct Buy<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        init,
        payer = buyer,
        space = 8 + Ticket::INIT_SPACE,
        seeds = [TICKET_SEED.as_bytes(), event.key().as_ref()],
        bump
    )]
    pub ticket: Account<'info, Ticket>,
    #[account(mut)]
    pub event: Account<'info, Event>,

    pub system_program: Program<'info, System>,
}
