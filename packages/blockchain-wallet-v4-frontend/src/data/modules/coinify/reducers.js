import * as AT from './actionTypes'
import { assoc, assocPath, mergeAll } from 'ramda'
import { Remote } from 'blockchain-wallet-v4/src'

const INITIAL_STATE = {
  checkoutBusy: false,
  checkoutError: false,
  coinifyBusy: Remote.NotAsked,
  step: null,
  checkoutStep: 'checkout',
  signupComplete: null,
  payment: Remote.NotAsked,
  showRecurringModal: false,
  subscription: false,
  subscriptionData: { frequency: 'weekly', endTime: null },
  disableRecurringCheckbox: false
}

const coinify = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.COINIFY_NEXT_STEP: {
      return assoc('signupStep', payload, state)
    }
    case AT.COINIFY_SET_CHECKOUT_STEP: {
      return assoc('checkoutStep', payload, state)
    }
    case AT.COINIFY_SIGNUP_FAILURE: {
      return assoc('signupError', payload, state)
    }
    case AT.COINIFY_CLEAR_SIGNUP_ERROR: {
      return assoc('signupError', null, state)
    }
    case AT.COINIFY_SAVE_QUOTE: {
      return assoc('quote', payload, state)
    }
    case AT.COINIFY_SAVE_MEDIUM_SUCCESS: {
      return assoc('medium', payload, state)
    }
    case AT.COINIFY_CHECKOUT_BUSY_ON: {
      return assoc('checkoutBusy', true, state)
    }
    case AT.COINIFY_CHECKOUT_BUSY_OFF: {
      return assoc('checkoutBusy', false, state)
    }
    case AT.COINIFY_SET_CHECKOUT_ERROR: {
      return assoc('checkoutError', payload, state)
    }
    case AT.COINIFY_CLEAR_CHECKOUT_ERROR: {
      return assoc('checkoutError', false, state)
    }
    case AT.COINIFY_NOT_ASKED: {
      return assoc('coinifyBusy', Remote.NotAsked, state)
    }
    case AT.COINIFY_LOADING: {
      return assoc('coinifyBusy', Remote.Loading, state)
    }
    case AT.COINIFY_SUCCESS: {
      return assoc('coinifyBusy', Remote.Success(payload), state)
    }
    case AT.COINIFY_FAILURE: {
      return assoc('coinifyBusy', Remote.Failure(payload), state)
    }
    case AT.SET_CANCEL_TRADE_ID: {
      return assoc('cancelTradeId', payload, state)
    }
    case AT.COINIFY_SIGNUP_COMPLETE: {
      return assoc('signupComplete', true, state)
    }
    case AT.COINIFY_SELL_BTC_PAYMENT_UPDATED_SUCCESS: {
      return assoc('payment', Remote.Success(payload), state)
    }
    case AT.COINIFY_SELL_BTC_PAYMENT_UPDATED_LOADING: {
      return assoc('payment', Remote.Loading, state)
    }
    case AT.COINIFY_SELL_BTC_PAYMENT_UPDATED_FAILURE: {
      return assoc('payment', Remote.Failure(payload), state)
    }
    case AT.COINIFY_SHOW_RECURRING_MODAL: {
      return assoc('showRecurringModal', payload, state)
    }
    case AT.COINIFY_IS_RECURRING_TRADE: {
      return assoc('subscription', payload, state)
    }
    case AT.COINIFY_SET_RECURRING_TRADE_FREQUENCY: {
      return assocPath(['subscriptionData', 'frequency'], payload, state)
    }
    case AT.COINIFY_SET_RECURRING_TRADE_END_TIME: {
      return assocPath(['subscriptionData', 'endTime'], payload, state)
    }
    case AT.COINIFY_RESET_RECURRING_BUY: {
      return mergeAll([
        state,
        { showRecurringModal: INITIAL_STATE.showRecurringModal },
        { subscription: INITIAL_STATE.subscription },
        { subscriptionData: INITIAL_STATE.subscriptionData }
      ])
    }
    case AT.DISABLE_RECURRING_CHECKBOX: {
      return assoc('disableRecurringCheckbox', payload, state)
    }
    default:
      return state
  }
}

export default coinify
