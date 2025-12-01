mod errors;
mod events;
mod instructions;
mod state;
use anchor_lang::prelude::*;

use instructions::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod ticketregistry {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        name: String,
        description: String,
        ticket_price: u64,
        available_ticket: u64,
        start_date: i64,
    ) -> Result<()> {
        _initialize(
            ctx,
            name,
            description,
            ticket_price,
            available_ticket,
            start_date,
        )
    }

    pub fn buy(ctx: Context<Buy>) -> Result<()> {
        _buy(ctx)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        _withdraw(ctx, amount)
    }
}
