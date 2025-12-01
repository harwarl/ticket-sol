use anchor_lang::prelude::*;

use crate::state::Event;

pub fn _withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let event_organizer = &mut ctx.accounts.event_organizer;
    let event = &mut ctx.accounts.event;

    event.sub_lamports(amount);
    event_organizer.add_lamports(amount);

    Ok(())
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    event_organizer: Signer<'info>,

    #[account(mut)]
    pub event: Account<'info, Event>,
}
